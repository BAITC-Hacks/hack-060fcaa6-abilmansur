import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from "react";
const StartersContext = createContext({});
export const StartersProvider = ({ starters, starterVariant, children, }) => (_jsx(StartersContext.Provider, { value: { starters, starterVariant }, children: children }));
export const useStartersFromContext = () => useContext(StartersContext);
//# sourceMappingURL=startersContext.js.map