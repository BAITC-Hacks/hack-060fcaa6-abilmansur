import type { GraphEdge, GraphNode } from "@/lib/api";

const ROLE_RANK: Record<string, number> = {
  source: 0, collector: 1, coordinated_account: 1, organizer: 2, unclear: 2, transit: 2, distributor: 3, final_recipient: 4,
};
const ROLE_ORDER = ["organizer", "source", "collector", "coordinated_account", "transit", "distributor", "final_recipient", "unclear"];

/** Left→right "money flow" layout: members are layered by longest path over asserted transfers
 *  (back edges of cycles ignored), context counterparties sit next to the member they touch. */
export function flowLayout(nodes: GraphNode[], edges: GraphEdge[]): Record<string, { x: number; y: number }> {
  const members = nodes.filter((n) => n.attributes.member).map((n) => n.key);
  const memberSet = new Set(members);
  const role = new Map(nodes.map((n) => [n.key, n.attributes.role]));
  const out = new Map<string, Set<string>>(members.map((m) => [m, new Set()]));
  for (const e of edges) {
    if (e.attributes.type !== "transfer" || !memberSet.has(e.source) || !memberSet.has(e.target) || e.source === e.target) continue;
    // Money returning to an earlier role (e.g. recipient → collector) closes a loop: draw it, but
    // don't let it push the earlier role to the right.
    if ((ROLE_RANK[role.get(e.target)!] ?? 2) < (ROLE_RANK[role.get(e.source)!] ?? 2)) continue;
    out.get(e.source)!.add(e.target);
  }

  // Drop back edges (cycles) with an iterative DFS started from lower-ranked roles first.
  const state = new Map<string, 0 | 1 | 2>();
  const dag = new Map<string, string[]>(members.map((m) => [m, []]));
  const starts = [...members].sort((a, b) => (ROLE_RANK[role.get(a)!] ?? 2) - (ROLE_RANK[role.get(b)!] ?? 2));
  for (const s of starts) {
    if (state.get(s)) continue;
    const stack: [string, string[]][] = [[s, [...out.get(s)!]]];
    state.set(s, 1);
    while (stack.length) {
      const top = stack[stack.length - 1];
      const next = top[1].pop();
      if (next === undefined) {
        state.set(top[0], 2);
        stack.pop();
        continue;
      }
      const st = state.get(next) ?? 0;
      if (st === 1) continue; // back edge
      dag.get(top[0])!.push(next);
      if (st === 0) {
        state.set(next, 1);
        stack.push([next, [...out.get(next)!]]);
      }
    }
  }

  // Longest-path layering (Kahn order).
  const indeg = new Map(members.map((m) => [m, 0]));
  for (const [, ts] of dag) for (const t of ts) indeg.set(t, indeg.get(t)! + 1);
  const rank = new Map<string, number>();
  const queue = members.filter((m) => indeg.get(m) === 0);
  for (const m of queue) rank.set(m, 0);
  while (queue.length) {
    const u = queue.shift()!;
    for (const v of dag.get(u)!) {
      rank.set(v, Math.max(rank.get(v) ?? 0, rank.get(u)! + 1));
      indeg.set(v, indeg.get(v)! - 1);
      if (indeg.get(v) === 0) queue.push(v);
    }
  }
  // Isolated members (no transfer links) fall back to their role's usual position.
  const connected = new Set([...dag].flatMap(([s, ts]) => (ts.length ? [s, ...ts] : [])));
  for (const m of members) if (!connected.has(m)) rank.set(m, ROLE_RANK[role.get(m)!] ?? 2);

  const X = 2.4;
  const Y = 1.9;
  const pos: Record<string, { x: number; y: number }> = {};
  const columns = new Map<number, string[]>();
  for (const m of members) columns.set(rank.get(m)!, [...(columns.get(rank.get(m)!) ?? []), m]);
  for (const [r, col] of columns) {
    col.sort((a, b) => ROLE_ORDER.indexOf(role.get(a)!) - ROLE_ORDER.indexOf(role.get(b)!) || a.localeCompare(b));
    col.forEach((m, i) => (pos[m] = { x: r * X, y: (i - (col.length - 1) / 2) * Y }));
  }

  // Context nodes: left of a member they send to, right of a member they receive from.
  const perAnchor = new Map<string, number>();
  for (const n of nodes) {
    if (n.attributes.member) continue;
    const e = edges.find((x) => (x.source === n.key && memberSet.has(x.target)) || (x.target === n.key && memberSet.has(x.source)));
    if (!e) {
      pos[n.key] = { x: -X, y: 0 };
      continue;
    }
    const sends = e.source === n.key;
    const anchor = sends ? e.target : e.source;
    const k = `${anchor}:${sends}`;
    const i = perAnchor.get(k) ?? 0;
    perAnchor.set(k, i + 1);
    const a = pos[anchor];
    const angle = (sends ? Math.PI : 0) + (i - 1.5) * 0.45;
    pos[n.key] = { x: a.x + Math.cos(angle) * 1.1, y: a.y + Math.sin(angle) * 1.1 };
  }
  return pos;
}
