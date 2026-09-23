"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { defineComponent, useIsQueryLoading } from "@inv/lang";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { z } from "zod/v4";
import { IconButton } from "../../components/IconButton";
import { TableSkeleton } from "../../components/Skeleton";
import { ScrollableTable as InvTable, TableBody as InvTableBody, TableCell as InvTableCell, TableHead as InvTableHead, TableHeader as InvTableHeader, TableRow as InvTableRow, } from "../../components/Table";
import { asArray } from "../helpers";
import { ColSchema } from "./schema";
export { ColSchema } from "./schema";
const DEFAULT_PAGE_SIZE = 10;
export const Col = defineComponent({
    name: "Col",
    props: ColSchema,
    description: "Column definition — holds label + data array",
    component: () => null,
});
export const Table = defineComponent({
    name: "Table",
    props: z.object({
        columns: z.array(Col.ref),
    }),
    description: "Data table — column-oriented. Each Col holds its own data array.",
    component: ({ props, renderNode }) => {
        const isQueryLoading = useIsQueryLoading();
        const effectivePageSize = DEFAULT_PAGE_SIZE;
        const [currentPage, setCurrentPage] = React.useState(0);
        const columns = props.columns ?? [];
        const colDefs = columns
            .filter((c) => c != null && c.props)
            .map((c) => ({
            label: c.props?.label ?? "",
            data: asArray(c.props?.data ?? []),
        }));
        const rowCount = colDefs.length > 0 ? Math.max(...colDefs.map((c) => c.data.length), 0) : 0;
        if (isQueryLoading && rowCount === 0) {
            const skeletonCols = Math.max(colDefs.length || columns.length, 3);
            return _jsx(TableSkeleton, { rows: 5, columns: skeletonCols });
        }
        if (!colDefs.length)
            return null;
        const totalPages = Math.ceil(rowCount / effectivePageSize);
        const safePage = Math.min(currentPage, Math.max(0, totalPages - 1));
        const startRow = safePage * effectivePageSize;
        const endRow = Math.min(startRow + effectivePageSize, rowCount);
        const visibleRowCount = endRow - startRow;
        return (_jsxs("div", { children: [_jsxs(InvTable, { children: [_jsx(InvTableHeader, { children: _jsx(InvTableRow, { children: colDefs.map((c, i) => (_jsx(InvTableHead, { children: c.label }, i))) }) }), _jsx(InvTableBody, { children: Array.from({ length: visibleRowCount }, (_, i) => {
                                const ri = startRow + i;
                                return (_jsx(InvTableRow, { children: colDefs.map((col, ci) => {
                                        const cell = col.data[ri];
                                        return (_jsx(InvTableCell, { children: typeof cell === "object" && cell !== null
                                                ? renderNode(cell)
                                                : String(cell ?? "") }, ci));
                                    }) }, ri));
                            }) })] }), totalPages > 1 && (_jsxs("div", { style: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        gap: "8px",
                        paddingTop: "8px",
                    }, children: [_jsx(IconButton, { "aria-label": "Previous page", size: "small", variant: "secondary", icon: _jsx(ChevronLeft, { size: 16 }), disabled: safePage === 0, onClick: () => setCurrentPage((p) => Math.max(0, p - 1)) }), _jsxs("span", { style: { fontSize: "13px", color: "#6b7280" }, children: [safePage + 1, " / ", totalPages] }), _jsx(IconButton, { "aria-label": "Next page", size: "small", variant: "secondary", icon: _jsx(ChevronRight, { size: 16 }), disabled: safePage >= totalPages - 1, onClick: () => setCurrentPage((p) => Math.min(totalPages - 1, p + 1)) })] }))] }));
    },
});
//# sourceMappingURL=index.js.map