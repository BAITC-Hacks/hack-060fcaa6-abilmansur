import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { createContext, useContext } from "react";
const StepNumberContext = createContext(0);
export const Steps = ({ children }) => {
    return (_jsx("div", { className: `inv-steps-container`, children: _jsx("div", { className: "inv-steps", children: React.Children.map(children, (child, index) => (_jsx(StepNumberContext.Provider, { value: index + 1, children: child }))) }) }));
};
export const StepsItem = ({ title, details, number }) => {
    const stepNumber = useContext(StepNumberContext);
    return (_jsxs("div", { className: "inv-step-item", children: [_jsxs("div", { className: "inv-step-connector", children: [_jsx("div", { className: "inv-step-number", children: _jsx("div", { className: "inv-step-number-inner", children: Number.isInteger(number) ? number : stepNumber }) }), _jsx("div", { className: "inv-connector-line" })] }), _jsxs("div", { className: "inv-step-content", children: [_jsx("span", { className: "inv-step-title", children: title }), _jsx("div", { className: "inv-step-details", children: details })] })] }));
};
//# sourceMappingURL=Steps.js.map