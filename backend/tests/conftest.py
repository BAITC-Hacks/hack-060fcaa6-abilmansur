import json
import subprocess
import sys
from pathlib import Path

import pytest

BACKEND = Path(__file__).resolve().parents[1]


@pytest.fixture(scope="session")
def env(tmp_path_factory):
    data_dir = tmp_path_factory.mktemp("data")
    synth = data_dir / "synthetic"
    subprocess.run([sys.executable, "scripts/generate_synthetic.py", "--out", str(synth), "--tx", "20000",
                    "--individuals", "1500", "--companies", "120"], cwd=BACKEND, check=True, capture_output=True)
    mp = pytest.MonkeyPatch()
    mp.setenv("DATA_DIR", str(data_dir))
    from app.config import get_settings
    get_settings.cache_clear()
    from app import datasets, db
    db.init_db()
    ds = datasets.ingest(synth / "transactions.parquet", "synthetic-test")
    truth = json.loads((synth / "ground_truth.json").read_text())
    yield {"dataset": ds, "truth": truth, "data_dir": data_dir}
    mp.undo()
    get_settings.cache_clear()
