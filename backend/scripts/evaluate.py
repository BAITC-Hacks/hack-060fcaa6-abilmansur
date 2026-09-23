"""Score an investigation's versions against synthetic ground truth.

    uv run python scripts/evaluate.py <investigation_id> data/synthetic/ground_truth.json
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app import db  # noqa: E402


def main() -> None:
    inv_id, truth_path = sys.argv[1], sys.argv[2]
    truth = json.load(open(truth_path))
    core = truth["members"]
    for v in db.fetch_all("SELECT id, title, status FROM versions WHERE investigation_id = ? ORDER BY created_at", (inv_id,)):
        members = {m["account_id"]: m["role"] for m in
                   db.fetch_all("SELECT account_id, role FROM members WHERE version_id = ? AND status = 'included'", (v["id"],))}
        found = set(members)
        tp = found & set(core)
        precision = len(tp) / len(found) if found else 0.0
        recall = len(tp) / len(core)
        role_hits = sum(1 for a in tp if members[a] == core[a])
        sources_marked = len(found & set(truth["sources"]))
        print(f"{v['id']} [{v['status']}] {v['title']}")
        print(f"  members={len(found)} precision={precision:.2f} recall={recall:.2f} "
              f"role_match={role_hits}/{len(tp)} sources_included={sources_marked}")
        print(f"  missed: {sorted(set(core) - found)}")
        print(f"  extra:  {sorted(found - set(core) - set(truth['sources']))}")


if __name__ == "__main__":
    main()
