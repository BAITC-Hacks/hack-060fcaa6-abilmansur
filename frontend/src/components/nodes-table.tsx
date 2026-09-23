"use client";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tag,
  TooltipWrapper,
} from "./primitives";
import { ArrowUpRight, Check, Plus } from "lucide-react";
import type { GraphNode } from "@/lib/types";
import { money } from "@/lib/api";
import { Priority, RoleTag } from "./ui";
export function NodesTable({
  nodes,
  onSelect,
  selected = [],
  onToggle,
  compact = false,
}: {
  nodes: GraphNode[];
  onSelect: (gid: string) => void;
  selected?: string[];
  onToggle?: (gid: string) => void;
  compact?: boolean;
}) {
  return (
    <Table containerClassName="node-table-wrap">
      <TableHeader>
        <TableRow>
          <TableHead>Участник</TableHead>
          <TableHead>Гипотеза роли</TableHead>
          <TableHead>Приоритет</TableHead>
          {!compact && (
            <>
              <TableHead align="right">Входящие, ₸</TableHead>
              <TableHead align="right">Связи</TableHead>
            </>
          )}
          <TableHead align="right">{onToggle ? "В проверку" : ""}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {nodes.map((n) => (
          <TableRow key={n.gid}>
            <TableCell>
              <button className="gid-button" onClick={() => onSelect(n.gid)}>
                {n.gid}
                <ArrowUpRight size={13} />
              </button>
              <div className="row-meta">
                Кластер {n.cluster_id + 1} ·{" "}
                {n.depth === 0 ? "Seed" : `${n.depth}-е колено`}
                {n.is_seed && <Tag size="sm" text="seed" />}
              </div>
            </TableCell>
            <TableCell>
              <RoleTag role={n.role} />
            </TableCell>
            <TableCell>
              <Priority score={n.priority_score} />
            </TableCell>
            {!compact && (
              <>
                <TableCell align="right" className="numeric">
                  {money(n.in_kzt)}
                </TableCell>
                <TableCell align="right">
                  <span className="numeric">
                    {n.in_degree} → {n.out_degree}
                  </span>
                </TableCell>
              </>
            )}
            <TableCell align="right">
              {onToggle ? (
                <TooltipWrapper
                  tooltipContent={
                    selected.includes(n.gid)
                      ? "Убрать из проверки"
                      : "Добавить к контексту ассистента"
                  }
                >
                  <Button
                    aria-label={`${selected.includes(n.gid) ? "Убрать" : "Добавить"} ${n.gid}`}
                    variant="tertiary"
                    size="extra-small"
                    disabled={
                      !selected.includes(n.gid) && selected.length >= 20
                    }
                    onClick={() => onToggle(n.gid)}
                  >
                    {selected.includes(n.gid) ? (
                      <Check size={15} />
                    ) : (
                      <Plus size={15} />
                    )}
                  </Button>
                </TooltipWrapper>
              ) : (
                <Button
                  variant="tertiary"
                  size="extra-small"
                  onClick={() => onSelect(n.gid)}
                  aria-label={`Открыть ${n.gid}`}
                >
                  <ArrowUpRight size={15} />
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
