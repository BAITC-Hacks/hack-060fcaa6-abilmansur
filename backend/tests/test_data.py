from pathlib import Path

import pandas as pd
import pytest

from money_graph.data import DataError, Dataset

DATA = Path(__file__).resolve().parents[2] / "data"


def test_supplied_data_reconciles():
    data = Dataset.load(DATA)
    assert len(data.nodes) == 2248
    assert len(data.transactions) == 4840
    assert data.nodes.gid.max() > 2**53


def test_rejects_bad_aggregate(tmp_path):
    for name in ("nodes", "edges", "transactions"):
        df = pd.read_parquet(DATA / f"{name}.parquet")
        if name == "edges":
            df.loc[0, "sum_kzt"] += 100
        df.to_parquet(tmp_path / f"{name}.parquet")
    with pytest.raises(DataError, match="суммы"):
        Dataset.load(tmp_path)


@pytest.mark.parametrize("kind", ["float_id", "unknown_node", "nan_amount", "duplicate_node"])
def test_rejects_corrupt_inputs(tmp_path, kind):
    frames = {
        name: pd.read_parquet(DATA / f"{name}.parquet")
        for name in ("nodes", "edges", "transactions")
    }
    if kind == "float_id":
        frames["nodes"]["gid"] = frames["nodes"].gid.astype(float)
    elif kind == "unknown_node":
        frames["edges"].loc[0, "src"] = 42
    elif kind == "nan_amount":
        frames["transactions"].loc[0, "sum_kzt"] = float("nan")
    else:
        frames["nodes"] = pd.concat([frames["nodes"], frames["nodes"].iloc[:1]])
    for name, frame in frames.items():
        frame.to_parquet(tmp_path / f"{name}.parquet")
    with pytest.raises(DataError):
        Dataset.load(tmp_path)
