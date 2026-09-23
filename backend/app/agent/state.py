"""Compact, persistent investigation state handed to every run (independent of chat history)."""

from app import db

STAGES = ["data_study", "network_overview", "candidate_review", "structure_recovery", "refutation", "done"]


def state_brief(investigation_id: str) -> str:
    inv = db.fetch_one("SELECT * FROM investigations WHERE id = ?", (investigation_id,))
    lines = [f"# Investigation {inv['id']}: {inv['title']}", f"Stage: {inv['stage']}"]

    lines.append("\n## Dataset passport")
    lines.append(db.dumps(inv["passport"]) if inv["passport"] else "(not written yet)")

    coverage = db.fetch_all(
        "SELECT scope_kind, scope, method, result FROM coverage WHERE investigation_id = ? ORDER BY created_at",
        (investigation_id,))
    lines.append(f"\n## Explored coverage ({len(coverage)})")
    lines += [f"- [{c['scope_kind']}] {c['scope']} | {c['method']} -> {c['result'][:300]}" for c in coverage] or ["(none)"]

    cands = db.fetch_all(
        "SELECT id, label, status, priority, patterns, accounts, notes FROM candidates WHERE investigation_id = ? "
        "ORDER BY CASE status WHEN 'in_progress' THEN 0 WHEN 'queued' THEN 1 ELSE 2 END, priority DESC",
        (investigation_id,))
    lines.append(f"\n## Candidate queue ({len(cands)})")
    for c in cands:
        accts = c["accounts"]
        lines.append(f"- {c['id']} [{c['status']}, p={c['priority']:.2f}] {c['label']} patterns={c['patterns']} "
                     f"accounts={accts[:12]}{'…' if len(accts) > 12 else ''}"
                     + (f" | notes: {c['notes'][:300]}" if c["notes"] else ""))
    if not cands:
        lines.append("(empty)")

    versions = db.fetch_all("SELECT * FROM versions WHERE investigation_id = ? ORDER BY created_at", (investigation_id,))
    lines.append(f"\n## Versions ({len(versions)})")
    for v in versions:
        members = db.fetch_all("SELECT account_id, role, confidence, status FROM members WHERE version_id = ?", (v["id"],))
        links = db.fetch_one("SELECT count(*) AS n FROM links WHERE version_id = ? AND status = 'active'", (v["id"],))["n"]
        trails = db.fetch_one("SELECT count(*) AS n FROM trails WHERE version_id = ?", (v["id"],))["n"]
        objections = db.fetch_all("SELECT id, status, text FROM objections WHERE version_id = ?", (v["id"],))
        lines.append(f"### {v['id']} [{v['status']}, conf={v['confidence']}] {v['title']}"
                     + (f" (revises {v['parent_id']})" if v["parent_id"] else ""))
        lines.append(f"{v['summary'][:600]}")
        lines.append(f"members: {[(m['account_id'], m['role'], m['status']) for m in members]}")
        lines.append(f"active links: {links}, trails: {trails}")
        for o in objections:
            lines.append(f"- objection {o['id']} [{o['status']}]: {o['text'][:200]}")

    n_ev = db.fetch_one("SELECT count(*) AS n FROM evidence WHERE investigation_id = ?", (investigation_id,))["n"]
    lines.append(f"\n## Evidence items: {n_ev}")
    return "\n".join(lines)
