from dataclasses import dataclass
from pathlib import Path

import numpy as np
import pandas as pd
from pandas.api.types import is_bool_dtype, is_integer_dtype, is_numeric_dtype


class DataError(ValueError):
    """Invalid or inconsistent input dataset."""


@dataclass
class Dataset:
    nodes: pd.DataFrame
    edges: pd.DataFrame
    transactions: pd.DataFrame

    @classmethod
    def load(cls, directory: Path) -> "Dataset":
        frames = {}
        schemas = {
            "nodes": ["gid", "depth", "is_seed"],
            "edges": ["src", "dst", "sum_kzt", "n_tx", "depth"],
            "transactions": ["src", "dst", "date", "sum_kzt"],
        }
        for name, columns in schemas.items():
            try:
                frame = pd.read_parquet(directory / f"{name}.parquet")
            except (OSError, ValueError) as exc:
                raise DataError(f"Не удалось прочитать {name}.parquet") from exc
            if not set(columns).issubset(frame.columns):
                raise DataError(f"{name}: обязательные поля: {columns}")
            frame = frame[columns].copy()
            if frame.isna().any().any():
                raise DataError(f"{name}: пустые значения недопустимы")
            for col in set(columns) & {"gid", "src", "dst", "depth", "n_tx"}:
                if not is_integer_dtype(frame[col]) or (frame[col] < 0).any():
                    raise DataError(f"{name}.{col}: требуется неотрицательное целое")
                if (frame[col] > np.iinfo(np.int64).max).any():
                    raise DataError(f"{name}.{col}: превышен int64")
            if "sum_kzt" in columns:
                amounts = frame.sum_kzt
                if (
                    not is_numeric_dtype(amounts)
                    or not np.isfinite(amounts).all()
                    or (amounts <= 0).any()
                ):
                    raise DataError(f"{name}: суммы должны быть конечными и положительными")
            frames[name] = frame
        data = cls(**frames)
        data.validate()
        data.nodes = data.nodes.sort_values("gid").reset_index(drop=True)
        data.edges = data.edges.sort_values(["src", "dst"]).reset_index(drop=True)
        data.transactions = data.transactions.sort_values(
            ["date", "src", "dst", "sum_kzt"]
        ).reset_index(drop=True)
        return data

    def validate(self) -> None:
        n, e, t = self.nodes, self.edges, self.transactions
        if n.empty or n.gid.duplicated().any():
            raise DataError("nodes: нужны уникальные gid и хотя бы один узел")
        if not is_bool_dtype(n.is_seed) or (n.is_seed != (n.depth == 0)).any():
            raise DataError("nodes: is_seed должен быть bool и соответствовать depth=0")
        if not n.depth.between(0, 4).all() or not e.depth.between(1, 4).all():
            raise DataError("depth должен соответствовать четырёхколенной выборке")
        if e.duplicated(["src", "dst"]).any() or (e.n_tx < 1).any():
            raise DataError("edges: пары должны быть уникальны, n_tx >= 1")
        ids = set(n.gid)
        for frame in (e, t):
            if not set(frame.src).union(frame.dst).issubset(ids):
                raise DataError("В переводах есть gid, отсутствующие в nodes")
        try:
            t["date"] = pd.to_datetime(t.date, errors="raise").dt.normalize()
        except (ValueError, TypeError) as exc:
            raise DataError("transactions: неверные даты") from exc
        if t.date.isna().any():
            raise DataError("transactions: неверные даты")
        aggregate = (
            t.groupby(["src", "dst"])
            .agg(sum_kzt=("sum_kzt", "sum"), n_tx=("sum_kzt", "size"))
            .reset_index()
        )
        joined = e.merge(aggregate, on=["src", "dst"], how="outer", suffixes=("_e", "_t"))
        if joined.isna().any().any() or (joined.n_tx_e != joined.n_tx_t).any():
            raise DataError("edges и transactions: пары или число транзакций не совпадают")
        if not np.allclose(joined.sum_kzt_e, joined.sum_kzt_t, rtol=0, atol=0.011):
            raise DataError("edges и transactions: суммы не совпадают")
