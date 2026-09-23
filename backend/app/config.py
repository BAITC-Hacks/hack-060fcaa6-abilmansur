from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    # Storage
    data_dir: Path = Path("./data")

    # Agent
    # Claude Code CLI the SDK launches. Empty = the copy bundled with claude-agent-sdk.
    claude_cli_path: str | None = None
    agent_model: str = "claude-opus-5"
    agent_effort: str = "high"
    agent_max_turns: int = 200
    agent_max_budget_usd: float | None = 20.0
    report_language: str = "ru"

    # Worker
    worker_concurrency: int = 2
    worker_poll_interval_s: float = 1.0

    # Analytics defaults
    # Reporting threshold used to detect structuring (amounts kept just below it).
    structuring_threshold: float = 1_000_000.0
    sql_max_rows: int = 500

    @property
    def db_path(self) -> Path:
        return self.data_dir / "investigator.sqlite3"

    @property
    def datasets_dir(self) -> Path:
        return self.data_dir / "datasets"

    @property
    def runs_dir(self) -> Path:
        return self.data_dir / "runs"

    @property
    def worker_heartbeat(self) -> Path:
        """Touched by every worker loop; the API reports whether an agent worker is alive."""
        return self.data_dir / "worker.heartbeat"

    def ensure_dirs(self) -> None:
        for d in (self.data_dir, self.datasets_dir, self.runs_dir):
            d.mkdir(parents=True, exist_ok=True)


@lru_cache
def get_settings() -> Settings:
    s = Settings()
    s.data_dir = s.data_dir.resolve()
    if s.claude_cli_path:
        s.claude_cli_path = str(Path(s.claude_cli_path).expanduser())
    s.ensure_dirs()
    return s
