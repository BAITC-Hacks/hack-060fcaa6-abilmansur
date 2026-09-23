"""Generate a synthetic transfer dataset with a hidden organised group, plus ground truth.

Ordinary activity deliberately includes look-alikes (payroll = distribution, merchants = collection,
family transfers, rent, loans) so that single signals are not enough.

    uv run python scripts/generate_synthetic.py --out data/synthetic --tx 200000
"""

import argparse
import json
import random
from datetime import datetime, timedelta
from pathlib import Path

import pandas as pd

START = datetime(2025, 1, 1)
DAYS = 180
THRESHOLD = 1_000_000


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default="data/synthetic")
    ap.add_argument("--tx", type=int, default=200_000, help="approximate ordinary transfers")
    ap.add_argument("--individuals", type=int, default=6000)
    ap.add_argument("--companies", type=int, default=400)
    ap.add_argument("--seed", type=int, default=42)
    args = ap.parse_args()
    rnd = random.Random(args.seed)

    ids = rnd.sample(range(10_000_000, 99_999_999), args.individuals + args.companies + 200)
    persons = [f"P{n}" for n in ids[: args.individuals]]
    companies = [f"C{n}" for n in ids[args.individuals: args.individuals + args.companies]]
    spare = [n for n in ids[args.individuals + args.companies:]]
    kind = {a: "individual" for a in persons} | {a: "legal" for a in companies}

    rows: list[dict] = []

    def tx(s: str, r: str, amount: float, ts: datetime, purpose: str, channel: str = "transfer", ccy: str = "KZT"):
        rows.append({"sender": s, "receiver": r, "amount": round(amount, 2), "currency": ccy, "timestamp": ts,
                     "sender_type": kind[s], "receiver_type": kind[r], "purpose": purpose, "channel": channel})

    def rand_ts(day: int | None = None, hour_lo: int = 8, hour_hi: int = 22) -> datetime:
        d = day if day is not None else rnd.randrange(DAYS)
        return START + timedelta(days=d, hours=rnd.randint(hour_lo, hour_hi - 1), minutes=rnd.randrange(60),
                                 seconds=rnd.randrange(60))

    # ------------------------------------------------------------ ordinary activity
    nc = len(companies)
    employers = rnd.sample(companies, max(5, nc * 15 // 100))
    staff = {c: rnd.sample(persons, rnd.randint(8, 80)) for c in employers}
    for c, emps in staff.items():  # payroll: distribution look-alike, but monthly and stable
        salary = {e: rnd.randint(250_000, 900_000) for e in emps}
        for month in range(6):
            day = month * 30 + rnd.choice([4, 5, 9, 10])
            for e in emps:
                tx(c, e, salary[e] * rnd.uniform(0.97, 1.03), rand_ts(day, 9, 12), "Заработная плата")
    merchants = rnd.sample([c for c in companies if c not in employers], max(5, nc * 20 // 100))
    for _ in range(int(args.tx * 0.45)):  # retail payments: collection look-alike
        tx(rnd.choice(persons), rnd.choice(merchants), rnd.lognormvariate(9.5, 1.0), rand_ts(), "Оплата товаров",
           "card")
    friends = {p: rnd.sample(persons, 6) for p in persons}
    for _ in range(int(args.tx * 0.3)):  # p2p between friends / family
        p = rnd.choice(persons)
        tx(p, rnd.choice(friends[p]), rnd.lognormvariate(10, 1.1), rand_ts(), rnd.choice(["", "Долг", "Подарок", ""]))
    landlords = rnd.sample(persons, max(10, len(persons) // 40))
    for p in rnd.sample(persons, len(persons) * 15 // 100):  # rent: monthly repeated route look-alike
        ll, amt = rnd.choice(landlords), rnd.randint(120_000, 400_000)
        for month in range(6):
            tx(p, ll, amt, rand_ts(month * 30 + rnd.randint(0, 3)), "Аренда квартиры")
    suppliers = rnd.sample(companies, max(5, nc * 30 // 100))
    for _ in range(int(args.tx * 0.08)):  # B2B
        a, b = rnd.sample(suppliers, 2)
        tx(a, b, rnd.lognormvariate(13, 1.2), rand_ts(day=None, hour_lo=9, hour_hi=18), "Оплата по договору", "wire")
    for _ in range(int(args.tx * 0.02)):  # some USD
        tx(rnd.choice(persons), rnd.choice(persons), rnd.lognormvariate(6, 1), rand_ts(), "", "transfer", "USD")

    # ------------------------------------------------------------ hidden group
    def new(prefix: str, k: str) -> str:
        acc = f"{prefix}{spare.pop()}"
        kind[acc] = k
        return acc

    victims = rnd.sample(persons, 70)                 # ordinary people sending into the scheme
    collectors = [new("P", "individual") for _ in range(3)]
    transit = [new("P", "individual") for _ in range(5)]
    shells = [new("C", "legal") for _ in range(2)]
    distributor = new("C", "legal")
    finals = [new("P", "individual") for _ in range(4)]
    for a in collectors + transit + finals:           # a little cover activity
        for _ in range(rnd.randint(3, 10)):
            tx(a, rnd.choice(merchants), rnd.lognormvariate(9, 0.8), rand_ts(), "Оплата товаров", "card")

    episodes = sorted(rnd.sample(range(20, DAYS - 5), 16))
    for day in episodes:
        base = START + timedelta(days=day, hours=rnd.randint(9, 13))
        collected = {c: 0.0 for c in collectors}
        for v in rnd.sample(victims, rnd.randint(12, 22)):             # collection
            c = rnd.choice(collectors)
            amt = rnd.randint(80, 450) * 1000
            tx(v, c, amt, base + timedelta(minutes=rnd.randint(0, 300)), rnd.choice(["", "Перевод", "Инвестиции"]))
            collected[c] += amt
        t0 = base + timedelta(hours=rnd.randint(6, 9))
        for c, amt in collected.items():                               # transit with structuring
            left = amt * rnd.uniform(0.95, 0.99)
            while left > 50_000:
                part = min(left, rnd.randint(900, 990) * 1000)
                tx(c, rnd.choice(transit), part, t0 + timedelta(minutes=rnd.randint(0, 90)), "")
                left -= part
        t1 = t0 + timedelta(hours=rnd.randint(2, 6))
        for m in transit:                                              # coordinated forwarding to shells
            inflow = sum(r["amount"] for r in rows if r["receiver"] == m and r["timestamp"] >= t0 - timedelta(hours=1)
                         and r["timestamp"] <= t0 + timedelta(hours=2))
            if inflow:
                tx(m, rnd.choice(shells), inflow * rnd.uniform(0.97, 0.995), t1 + timedelta(minutes=rnd.randint(0, 40)),
                   rnd.choice(["Оплата по договору", "Предоплата за услуги"]))
        t2 = t1 + timedelta(days=1, hours=rnd.randint(0, 5))
        for s in shells:
            got = sum(r["amount"] for r in rows if r["receiver"] == s and r["timestamp"] >= t1)
            if got:
                tx(s, distributor, got * rnd.uniform(0.96, 0.99), t2, "Возврат займа", "wire")
        t3 = t2 + timedelta(hours=rnd.randint(3, 20))
        got = sum(r["amount"] for r in rows if r["receiver"] == distributor and r["timestamp"] >= t2)
        shares = [rnd.random() for _ in finals]
        for f, sh in zip(finals, shares):                              # distribution
            tx(distributor, f, got * 0.97 * sh / sum(shares), t3 + timedelta(minutes=rnd.randint(0, 120)),
               "Выплата дивидендов")
        if rnd.random() < 0.4:                                         # loop back
            f, c = rnd.choice(finals), rnd.choice(collectors)
            tx(f, c, rnd.randint(200, 600) * 1000, t3 + timedelta(hours=rnd.randint(4, 30)), "")

    df = pd.DataFrame(rows).sort_values("timestamp").reset_index(drop=True)
    df.insert(0, "transaction_id", [f"T{i:08d}" for i in range(len(df))])
    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    df.to_parquet(out / "transactions.parquet", index=False)
    truth = {
        "members": {**{a: "collector" for a in collectors}, **{a: "transit" for a in transit},
                    **{a: "transit" for a in shells}, distributor: "distributor",
                    **{a: "final_recipient" for a in finals}},
        "sources": victims,
        "episodes": [str((START + timedelta(days=d)).date()) for d in episodes],
        "threshold": THRESHOLD,
    }
    (out / "ground_truth.json").write_text(json.dumps(truth, ensure_ascii=False, indent=2))
    print(f"{len(df)} transfers -> {out / 'transactions.parquet'}; ground truth: {len(truth['members'])} core members")


if __name__ == "__main__":
    main()
