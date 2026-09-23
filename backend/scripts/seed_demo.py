"""Seed a DEMO investigation board for frontend development - no LLM involved.

Uses the synthetic ground truth and goes through the same MCP tool handlers (and therefore the
same verification) the agent uses, so the UI gets realistic, internally consistent data.

    uv run python scripts/seed_demo.py data/synthetic
"""

import asyncio
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app import datasets, db, duck  # noqa: E402
from app.agent.tools import RunContext, build_tools
from app.config import get_settings


def main() -> None:
    synth = Path(sys.argv[1] if len(sys.argv) > 1 else "data/synthetic")
    truth = json.loads((synth / "ground_truth.json").read_text())
    db.init_db()
    ds = db.fetch_one("SELECT * FROM datasets WHERE name = 'synthetic' ORDER BY created_at DESC")
    if ds is None:
        ds = datasets.ingest(synth / "transactions.parquet", "synthetic")
    inv_id = db.new_id("inv")
    workspace = get_settings().runs_dir / inv_id / "workspace"
    (workspace / "scripts").mkdir(parents=True)
    db.insert("investigations", {"id": inv_id, "dataset_id": ds["id"], "title": "Демо: схема сбора и транзита",
                                 "brief": "Демо-доска для интерфейса (заполнена скриптом, без агента).",
                                 "workspace": str(workspace), "created_at": db.now(), "updated_at": db.now()})
    run_id = db.new_id("run")
    db.insert("runs", {"id": run_id, "investigation_id": inv_id, "kind": "investigate", "prompt": "demo seed",
                       "status": "running", "created_at": db.now(), "started_at": db.now()})
    db.add_event(run_id, inv_id, "run_started", {"kind": "investigate", "prompt": "demo seed", "stage": "data_study"})
    tools = build_tools(RunContext(inv_id, run_id, "investigate", ds["path"], workspace))
    con = duck.connect(ds["path"])

    # Tool steps are logged like the runner does, so the UI activity timeline has something to show.
    def step(name: str, args: dict, output: str, is_error: bool = False) -> None:
        tool_use_id = db.new_id("toolu")
        db.add_event(run_id, inv_id, "tool_call", {"id": tool_use_id, "name": name, "input": args})
        db.add_event(run_id, inv_id, "tool_result", {"tool_use_id": tool_use_id, "is_error": is_error,
                                                      "preview": output[:1500]})

    def call(name: str, **args):
        t = next(t for t in tools if t.name == name)
        tool_use_id = db.new_id("toolu")
        db.add_event(run_id, inv_id, "tool_call", {"id": tool_use_id, "name": f"mcp__inv__{name}", "input": args})
        res = asyncio.run(t.handler(args))
        text = res["content"][0]["text"]
        db.add_event(run_id, inv_id, "tool_result", {"tool_use_id": tool_use_id, "is_error": bool(res.get("is_error")),
                                                      "preview": text[:1500]})
        out = json.loads(text)
        if res.get("is_error"):
            raise RuntimeError(f"{name}: {out}")
        return out

    def say(text: str) -> None:
        db.add_event(run_id, inv_id, "agent_text", {"text": text})

    def tx(sender: list[str], receiver: list[str]) -> list[tuple]:
        return con.execute(
            "SELECT tx_id, amount, ts FROM tx WHERE sender_id IN (SELECT unnest(?::VARCHAR[])) "
            "AND receiver_id IN (SELECT unnest(?::VARCHAR[])) AND currency = 'KZT' ORDER BY ts",
            [sender, receiver]).fetchall()

    members = truth["members"]
    by_role: dict[str, list[str]] = {}
    for acc, role in members.items():
        by_role.setdefault(role, []).append(acc)
    collectors = by_role["collector"]
    transit_p = [a for a in by_role["transit"] if a.startswith("P")]
    shells = [a for a in by_role["transit"] if a.startswith("C")]
    distributor = by_role["distributor"][0]
    finals = by_role["final_recipient"]
    sources = truth["sources"]

    say("Начинаю с данных: изучу поля и качество, затем всю сеть, и только потом отдельных кандидатов.")
    call("get_state")
    step("Glob", {"pattern": "**/*"}, "notes.md\nscripts/")
    step("Read", {"file_path": "app/analytics/toolkit.py"}, "def account_features(...)\ndef pattern_flags(...)\n…")
    q_overview = call("sql", query="SELECT count(*) AS n, min(ts), max(ts), count(DISTINCT currency) FROM tx",
                      purpose="Общий объём и период")["query_id"]

    # ---- data study
    say("Изучаю структуру данных: поля, период, валюты и полноту.")
    call("save_dataset_passport",
         fields=[{"name": "tx_id", "meaning": "идентификатор перевода"}, {"name": "ts", "meaning": "время операции"},
                 {"name": "sender_id / receiver_id", "meaning": "обезличенные счета"},
                 {"name": "amount / currency", "meaning": "сумма и валюта (KZT, USD)"},
                 {"name": "sender_type / receiver_type", "meaning": "физлицо или юрлицо"},
                 {"name": "purpose", "meaning": "назначение платежа, часто пустое"}],
         period="01.01.2025 – 29.06.2025", currencies=["KZT", "USD"], entity_types="физлица и юрлица",
         quality_issues=["6 переводов самому себе", "назначение платежа пусто в ~40% операций"],
         limitations=["нет остатков на счетах", "нет данных о снятии наличных", "нет связей владельцев"])
    call("set_stage", stage="network_overview", note="Паспорт готов, перехожу к обзору всей сети")

    # ---- network overview
    say("Строю признаки по всем 6 226 счетам и сравниваю каждый с распределением по сети.")
    step("Write", {"file_path": "scripts/features.py",
                   "content": "from app.analytics import toolkit as tk\nf = tk.with_percentiles(tk.account_features())\n"
                              "print(tk.pattern_flags(f).head(20))"}, "File created successfully")
    step("Bash", {"command": "python scripts/features.py", "description": "Считаю признаки по всем счетам"},
         "108 accounts flagged (collection 41, distribution 23, transit 38, structuring 6)")
    step("Bash", {"command": "python -c 'import app.analytics.toolkit as tk; print(tk.repeated_routes(window_h=72))'"},
         "Traceback (most recent call last):\nTypeError: repeated_routes() got an unexpected keyword argument 'window_h'",
         is_error=True)
    step("Grep", {"pattern": "def repeated_routes", "path": "app/analytics"}, "app/analytics/toolkit.py:212")
    step("Bash", {"command": "python -c 'import app.analytics.toolkit as tk; print(tk.repeated_routes(window=72, min_days=5))'",
                  "description": "Ищу повторяющиеся маршруты"}, "30 stable routes; 12 via legal entities")
    step("Bash", {"command": "python -c 'import app.analytics.toolkit as tk; print(tk.community_profile(tk.communities()))'",
                  "description": "Ищу сообщества в графе переводов"}, "31 communities; max internal share 0.71 (median 0.08)")
    call("record_coverage", scope_kind="network", scope="все счета", method="account_features + перцентили",
         result="108 счетов с хотя бы одним флагом; большинство — магазины и работодатели")
    call("record_coverage", scope_kind="pattern_scan", scope="двухшаговые маршруты A→B→C",
         method="repeated_routes(window=72ч, min_days=5)", result="30 устойчивых маршрутов, 12 проходят через юрлица-посредники")
    call("record_coverage", scope_kind="network", scope="сообщества Louvain", method="community_profile",
         result="31 сообщество; одно с долей внутренних оборотов 0.71 при медиане 0.08")
    cand_main = call("add_candidate", label="Сборщики → транзит → два юрлица", accounts=collectors + transit_p[:2],
                     patterns=["collection", "transit", "structuring", "repeated_routes"],
                     discovered_by="pattern_flags + repeated_routes", priority=0.95)["candidate_id"]
    cand_dist = call("add_candidate", label="Юрлицо-распределитель с выплатами «дивидендов»", accounts=[distributor],
                     patterns=["distribution", "repeated_routes"], discovered_by="repeated_routes", priority=0.8)["candidate_id"]
    cand_merchant = call("add_candidate", label="Крупный магазин с тысячами отправителей", accounts=["C99692417"],
                         patterns=["collection"], discovered_by="pattern_flags", priority=0.4)["candidate_id"]
    cand_payroll = call("add_candidate", label="Работодатель с ежемесячными выплатами", accounts=["C44103265"],
                        patterns=["distribution"], discovered_by="pattern_flags", priority=0.35)["candidate_id"]
    call("set_stage", stage="candidate_review", note="Очередь сформирована: 4 кандидата")

    # ---- candidate review
    call("update_candidate", candidate_id=cand_merchant, status="dismissed",
         notes="Обычная розница: >1000 отправителей, суммы по логнормальному закону, нет быстрого вывода.")
    call("update_candidate", candidate_id=cand_payroll, status="dismissed",
         notes="Зарплата: стабильные суммы раз в месяц в одни и те же даты, назначение «Заработная плата».")
    call("update_candidate", candidate_id=cand_main, status="confirmed",
         notes="Сочетание сбора, быстрого транзита и дробления ниже 1 млн подтверждено на 16 эпизодах.")
    call("update_candidate", candidate_id=cand_dist, status="merged",
         notes="Получает средства от тех же юрлиц — объединён с основным кандидатом.")
    call("record_coverage", scope_kind="account_set", scope="окружение кандидатов (радиус 2)",
         method="ego + forward_chains", result="найдены 4 конечных получателя и возвраты средств сборщикам",
         accounts=collectors + shells + [distributor])
    call("set_stage", stage="structure_recovery", note="Восстанавливаю структуру")

    # ---- evidence
    def evidence(title, claim, pattern, feats, rows, accounts, lim, alt, version_id=None):
        ids = [r[0] for r in rows]
        total = round(sum(r[1] for r in rows), 2)
        return call("add_evidence", title=title, claim=claim, pattern=pattern, observed_features=feats, tx_ids=ids,
                    accounts=accounts, period_start="2025-01-01", period_end="2025-06-30", query_id=q_overview,
                    claimed={"tx_count": len(ids), "total_amount": total, "currency": "KZT"},
                    limitations=lim, alternatives=alt, **({"version_id": version_id} if version_id else {}))["evidence_id"]

    say("Версия 1: сборщики и транзитные счета. Проверяю каждого по отдельным эпизодам.")
    v1 = call("create_version", title="Версия 1 — сбор и транзит", confidence=0.55,
              summary="Три счёта собирают переводы от десятков физлиц и в течение нескольких часов пересылают их "
                      "транзитным счетам суммами чуть ниже 1 млн.", candidate_ids=[cand_main])["version_id"]
    ev: dict[str, str] = {}
    for c in collectors:
        rows = tx(sources, [c])
        ev[c] = evidence(f"Сбор средств на {c}", f"{c} получает переводы от множества физлиц в одни и те же дни.",
                         "collection", ["много отправителей", "эпизоды в одни дни", "суммы 80–450 тыс."], rows, [c],
                         "Нет назначения платежа у части переводов.", "Сбор на общую покупку или краудфандинг.", v1)
        call("set_member", version_id=v1, account_id=c, role="collector", confidence=0.8,
             inclusion_basis=f"В {len({r[2].date() for r in rows})} эпизодах получает переводы от разных физлиц и в тот же день пересылает почти всю сумму дальше.",
             alternative_explanation="Организатор совместных закупок.", missing_information="Назначения платежей, связь отправителей между собой.",
             evidence_ids=[ev[c]], status="included")
    for t in transit_p:
        rows = tx(collectors, [t]) + tx([t], shells)
        ev[t] = evidence(f"Транзит через {t}", f"{t} пересылает поступления юрлицам в течение нескольких часов.",
                         "transit", ["остаток < 3%", "вывод за 2–6 ч", "входящие ниже 1 млн"], rows, [t],
                         "Остаток на счёте до периода неизвестен.", "Оплата услуг по договору.", v1)
        call("set_member", version_id=v1, account_id=t, role="transit", confidence=0.75,
             inclusion_basis="Входящие от сборщиков суммами 900–990 тыс. и исходящие юрлицам с остатком меньше 3%.",
             alternative_explanation="Посредник по договору оказания услуг.", missing_information="Договоры, назначения входящих переводов.",
             evidence_ids=[ev[t]], status="included")
    for c in collectors:
        for t in transit_p:
            rows = tx([c], [t])
            if rows:
                call("add_link", version_id=v1, source=c, target=t, kind="transfer", tx_ids=[r[0] for r in rows],
                     rationale="Регулярные переводы суммами чуть ниже порога 1 млн.")
    o1 = call("add_objection", version_id=v1, target_kind="version", text="Версия не объясняет, куда уходят средства после транзитных счетов.")["objection_id"]
    call("resolve_objection", objection_id=o1, status="accepted", resolution="Принято: нужна ревизия с юрлицами и получателями.")

    say("Версия 2: добавляю юрлица, распределителя и конечных получателей.")
    v2 = call("create_version", title="Версия 2 — полная цепочка", parent_id=v1, confidence=0.78,
              summary="Средства собираются тремя сборщиками, дробятся через пять транзитных счетов, проходят через "
                      "два юрлица и распределителя и расходятся четырём конечным получателям. Часть средств "
                      "возвращается сборщикам.", candidate_ids=[cand_main, cand_dist])["version_id"]
    for s in shells:
        rows = tx(transit_p, [s]) + tx([s], [distributor])
        ev[s] = evidence(f"Юрлицо-посредник {s}", f"{s} получает от транзитных счетов и на следующий день перечисляет распределителю.",
                         "transit", ["назначение «Оплата по договору»", "перечисление через ~24 ч", "нет других оборотов"],
                         rows, [s], "Нет данных о реальной хозяйственной деятельности.", "Реальный подрядчик.", v2)
        call("set_member", version_id=v2, account_id=s, role="transit", confidence=0.8,
             inclusion_basis="Почти весь оборот — входящие от транзитных счетов и исходящие распределителю с формулировкой «Возврат займа».",
             alternative_explanation="Действующий подрядчик с узким кругом клиентов.", missing_information="Сведения о деятельности юрлица.",
             evidence_ids=[ev[s]], status="included")
    rows = tx(shells, [distributor]) + tx([distributor], finals)
    ev[distributor] = evidence("Распределение средств", f"{distributor} распределяет поступления четырём получателям.",
                               "distribution", ["вход от 2 юрлиц", "выход 4 физлицам", "назначение «Выплата дивидендов»"],
                               rows, [distributor], "Структура собственности неизвестна.", "Выплата дивидендов участникам ООО.", v2)
    call("set_member", version_id=v2, account_id=distributor, role="distributor", confidence=0.82,
         inclusion_basis="В 16 эпизодах получает от двух юрлиц и в течение суток распределяет 97% четырём физлицам.",
         alternative_explanation="Выплата дивидендов учредителям.", missing_information="Состав учредителей.",
         evidence_ids=[ev[distributor]], status="included")
    for f in finals:
        rows = tx([distributor], [f])
        ev[f] = evidence(f"Получатель {f}", f"{f} регулярно получает доли от распределителя.", "distribution",
                         ["16 поступлений", "доли меняются"], rows, [f], "Дальнейшее движение средств не видно.",
                         "Учредитель, получающий дивиденды.", v2)
        call("set_member", version_id=v2, account_id=f, role="final_recipient", confidence=0.7,
             inclusion_basis="Получает доли от распределителя после каждого эпизода сбора.",
             alternative_explanation="Законный получатель дивидендов.", missing_information="Что происходит со средствами дальше.",
             evidence_ids=[ev[f]], status="included")
    for a, b in [(t, s) for t in transit_p for s in shells] + [(s, distributor) for s in shells] + [(distributor, f) for f in finals] \
            + [(f, c) for f in finals for c in collectors]:
        rows = tx([a], [b])
        if rows:
            call("add_link", version_id=v2, source=a, target=b, kind="transfer", tx_ids=[r[0] for r in rows],
                 rationale="Возврат средств сборщику — замыкает цикл." if a in finals else "Повторяющиеся переводы по одной схеме.")
    call("add_link", version_id=v2, source=transit_p[0], target=transit_p[1], kind="coordination",
         tx_ids=[r[0] for r in tx(collectors, transit_p[:2])[:12]],
         rationale="Получают средства от одних и тех же сборщиков в одни и те же часы.")

    # trail for one episode
    first = tx([collectors[0]], transit_p)[0]
    t_acc = con.execute("SELECT receiver_id FROM tx WHERE tx_id = ?", [first[0]]).fetchone()[0]
    step2 = [r for r in tx([t_acc], shells) if r[2] >= first[2]][:1]
    s_acc = con.execute("SELECT receiver_id FROM tx WHERE tx_id = ?", [step2[0][0]]).fetchone()[0]
    step3 = [r for r in tx([s_acc], [distributor]) if r[2] >= step2[0][2]][:1]
    step4 = [r for r in tx([distributor], [finals[0]]) if r[2] >= step3[0][2]][:1]
    call("add_trail", version_id=v2, title="Эпизод: сбор → транзит → юрлицо → распределитель → получатель",
         description="Возможный маршрут одного эпизода.",
         steps=[{"from": collectors[0], "to": t_acc, "tx_ids": [first[0]]},
                {"from": t_acc, "to": s_acc, "tx_ids": [step2[0][0]]},
                {"from": s_acc, "to": distributor, "tx_ids": [step3[0][0]]},
                {"from": distributor, "to": finals[0], "tx_ids": [step4[0][0]]}])
    call("set_stage", stage="refutation", note="Пытаюсь опровергнуть версию 2")

    # ---- refutation
    say("Ищу обычные объяснения: зарплата, закупки, дивиденды.")
    o2 = call("add_objection", version_id=v2, target_kind="member", target_ref=distributor,
              text="Распределитель может выплачивать дивиденды учредителям.")["objection_id"]
    call("resolve_objection", objection_id=o2, status="refuted", evidence_ids=[ev[distributor]],
         resolution="Выплаты следуют за каждым эпизодом сбора в течение суток, а не по итогам периода; доли каждый раз разные.")
    o3 = call("add_objection", version_id=v2, target_kind="member", target_ref=collectors[0],
              text="Сборщик может организовывать совместные закупки.")["objection_id"]
    call("resolve_objection", objection_id=o3, status="refuted", evidence_ids=[ev[collectors[0]]],
         resolution="Нет ни одного платежа поставщикам: всё уходит транзитным счетам в течение часов.")
    call("add_open_question", version_id=v2, text="Есть ли у отправителей общие признаки (кампания, объявление)?")
    call("add_open_question", version_id=v2, text="Куда получатели переводят средства за пределами датасета?")
    call("update_version", version_id=v2, status="final", reason="Возражения рассмотрены")
    call("set_stage", stage="done", note="Расследование завершено")
    call("finish_run", summary="## Найдено\nГруппа из 15 счетов: 3 сборщика, 5 транзитных счетов, 2 юрлица-посредника, "
                               "распределитель и 4 конечных получателя. 16 повторяющихся эпизодов сбора и вывода.\n\n"
                               "## Изменено\nДве версии структуры (итоговая — вторая), доказательства с проверенными "
                               "транзакциями, возражения рассмотрены.\n\n"
                               "## Дальше\nПроверить, есть ли у отправителей общие признаки; маршруты остаются возможными, "
                               "а не доказанными путями тех же денег.")
    db.update("runs", {"id": run_id}, {"status": "completed", "finished_at": db.now(), "num_turns": 0})
    db.add_event(run_id, inv_id, "run_finished", {"status": "completed"})
    print(inv_id)


if __name__ == "__main__":
    main()
