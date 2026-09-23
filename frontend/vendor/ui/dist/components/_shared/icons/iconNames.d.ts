/**
 * Normalize PascalCase/camelCase input to kebab-case candidates for
 * `lucide-react/dynamicIconImports` map keys. Unlike kebab → Pascal, this
 * direction is ambiguous around digits (`ArrowUp10` is `arrow-up-1-0`
 * upstream, but `Axis3d` is `axis-3d`). Dimension-shaped names add another
 * ambiguity (`Grid2x2` is exported as both `grid-2x2` and `grid-2-x-2`), so
 * callers try each deterministic candidate in priority order.
 */
export declare const toKebabIconCandidates: (name: string) => string[];
//# sourceMappingURL=iconNames.d.ts.map