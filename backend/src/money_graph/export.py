import json
import os
import tempfile
from pathlib import Path

import pandas as pd

from money_graph.analysis import Analysis

EXPORTS = {
    "nodes_roles.csv": ["gid", "role", "role_score", "cluster_id", "priority_score", "evidence"],
    "clusters.csv": [
        "cluster_id",
        "n_nodes",
        "n_seed",
        "sum_kzt_internal",
        "top_gids",
        "hypothesis",
    ],
    "top_nodes.csv": ["rank", "gid", "role", "priority_score", "why"],
}


def csv_content(analysis: Analysis, filename: str, top_n: int = 50) -> str:
    if filename not in EXPORTS:
        raise KeyError(filename)
    if filename == "nodes_roles.csv":
        rows = analysis.nodes
    elif filename == "clusters.csv":
        rows = [dict(c, top_gids=";".join(map(str, c["top_gids"]))) for c in analysis.clusters]
    else:
        rows = analysis.top(top_n)
    return pd.DataFrame(rows, columns=EXPORTS[filename]).to_csv(index=False)


def export(analysis: Analysis, directory: Path, top_n: int = 50) -> None:
    directory.mkdir(parents=True, exist_ok=True)
    contents = {name: csv_content(analysis, name, top_n) for name in EXPORTS}
    contents["summary.json"] = json.dumps(analysis.summary, ensure_ascii=False, indent=2)
    # Finish serialization before touching previous results; replace each file atomically.
    for name, content in contents.items():
        fd, path = tempfile.mkstemp(dir=directory, prefix=".export-")
        try:
            with os.fdopen(fd, "w", encoding="utf-8", newline="") as handle:
                handle.write(content)
            os.replace(path, directory / name)
        finally:
            if os.path.exists(path):
                os.unlink(path)
