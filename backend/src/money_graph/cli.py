import argparse
import json
import os
import time
from pathlib import Path

from money_graph.analysis import analyze
from money_graph.data import DataError, Dataset
from money_graph.export import export

BACKEND = Path(__file__).resolve().parents[2]
DEFAULT_DATA = BACKEND.parent / "data"


def main() -> None:
    parser = argparse.ArgumentParser(description="Граф денег: локальный анализ транзакций")
    commands = parser.add_subparsers(dest="command", required=True)
    batch = commands.add_parser("analyze", help="Рассчитать роли и сохранить CSV")
    batch.add_argument("--data-dir", type=Path, default=DEFAULT_DATA)
    batch.add_argument("--output-dir", type=Path, default=BACKEND / "output")
    batch.add_argument("--top", type=int, default=50)
    serve = commands.add_parser("serve", help="Запустить HTTP API")
    serve.add_argument("--data-dir", type=Path, default=DEFAULT_DATA)
    serve.add_argument("--host", default="127.0.0.1")
    serve.add_argument("--port", type=int, default=8000)
    args = parser.parse_args()
    if args.command == "serve":
        import uvicorn

        os.environ["MONEY_GRAPH_DATA_DIR"] = str(args.data_dir.resolve())
        uvicorn.run("money_graph.api:create_app", factory=True, host=args.host, port=args.port)
        return
    if args.top < 20:
        parser.error("--top должен быть >= 20")
    start = time.perf_counter()
    try:
        result = analyze(Dataset.load(args.data_dir))
        export(result, args.output_dir, args.top)
    except DataError as exc:
        parser.exit(2, f"Ошибка данных: {exc}\n")
    print(
        json.dumps(
            dict(
                result.summary,
                elapsed_seconds=round(time.perf_counter() - start, 3),
                output_dir=str(args.output_dir.resolve()),
            ),
            ensure_ascii=False,
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
