"""Agent worker: a separate process that claims queued runs from SQLite and executes them.

Run with ``python -m app.worker``. Several workers may run at once; claiming is atomic.
"""

import asyncio
import logging
import signal

from app import db
from app.agent.runner import execute_run
from app.config import get_settings

log = logging.getLogger("worker")


def recover_orphans() -> None:
    """Runs left 'running' by a crashed worker are marked failed so the queue keeps moving."""
    for run in db.fetch_all("SELECT id, investigation_id FROM runs WHERE status IN ('running', 'cancelling')"):
        db.update("runs", {"id": run["id"]}, {"status": "failed", "error": "worker restarted", "finished_at": db.now()})
        db.add_event(run["id"], run["investigation_id"], "run_finished", {"status": "failed", "error": "worker restarted"})


async def main() -> None:
    settings = get_settings()
    db.init_db()
    recover_orphans()
    stop = asyncio.Event()
    loop = asyncio.get_running_loop()
    for sig in (signal.SIGINT, signal.SIGTERM):
        loop.add_signal_handler(sig, stop.set)

    slots = asyncio.Semaphore(settings.worker_concurrency)
    tasks: set[asyncio.Task] = set()
    log.info("worker started (model=%s, cli=%s, concurrency=%d)", settings.agent_model,
             settings.claude_cli_path or "bundled", settings.worker_concurrency)

    async def run_one(run: dict) -> None:
        try:
            log.info("run %s started (%s)", run["id"], run["kind"])
            await execute_run(run)
            log.info("run %s finished", run["id"])
        finally:
            slots.release()

    async def heartbeat() -> None:
        # Separate task: the claim loop can block on a full semaphore for the whole length of a run.
        while not stop.is_set():
            settings.worker_heartbeat.touch()
            try:
                await asyncio.wait_for(stop.wait(), timeout=5)
            except TimeoutError:
                pass

    beat = asyncio.create_task(heartbeat())
    while not stop.is_set():
        await slots.acquire()
        run = db.claim_next_run()
        if run is None:
            slots.release()
            try:
                await asyncio.wait_for(stop.wait(), timeout=settings.worker_poll_interval_s)
            except TimeoutError:
                pass
            continue
        task = asyncio.create_task(run_one(run))
        tasks.add(task)
        task.add_done_callback(tasks.discard)

    beat.cancel()
    settings.worker_heartbeat.unlink(missing_ok=True)
    log.info("stopping; waiting for %d running tasks", len(tasks))
    for t in tasks:
        t.cancel()
    await asyncio.gather(*tasks, return_exceptions=True)


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")
    asyncio.run(main())
