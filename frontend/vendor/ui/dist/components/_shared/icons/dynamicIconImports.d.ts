import type { LucideIcon } from "lucide-react";
type IconImport = () => Promise<{
    default: LucideIcon;
}>;
/**
 * CJS interop: this package ships both CJS and ESM builds. When the CJS
 * build loads the `.mjs` icon map, the import hands back a namespace object
 * (`{ __esModule, default: map }`) instead of the map itself, and bundler
 * interop helpers can stack a second `default` layer on top. Unwrap until we
 * reach the actual key → import-thunk map (`circle` is a stable lucide key),
 * else every icon silently resolves null for CJS consumers.
 */
export declare const unwrapModuleDefault: (mod: unknown) => Record<string, IconImport>;
export declare const dynamicIconImports: Record<string, IconImport>;
export declare const getIconImport: (iconName: string) => IconImport | null;
export {};
//# sourceMappingURL=dynamicIconImports.d.ts.map