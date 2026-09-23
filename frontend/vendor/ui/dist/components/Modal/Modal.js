"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { X } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "../ThemeProvider";
const sizeClass = {
    sm: "inv-modal-sm",
    md: "inv-modal-md",
    lg: "inv-modal-lg",
};
export const Modal = ({ title, open, onOpenChange, size = "md", children, }) => {
    const { portalThemeClassName } = useTheme();
    const contentRef = useRef(null);
    const handleClose = useCallback(() => onOpenChange(false), [onOpenChange]);
    // Escape key
    useEffect(() => {
        if (!open)
            return;
        const onKey = (e) => {
            if (e.key === "Escape")
                handleClose();
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open, handleClose]);
    // Focus trap — focus the content on open
    useEffect(() => {
        if (open && contentRef.current) {
            contentRef.current.focus();
        }
    }, [open]);
    if (!open)
        return null;
    return createPortal(_jsxs("div", { className: clsx("inv-modal-root", portalThemeClassName), children: [_jsx("div", { className: "inv-modal-overlay", onClick: handleClose }), _jsxs("div", { ref: contentRef, className: clsx("inv-modal-content", sizeClass[size]), role: "dialog", "aria-modal": "true", "aria-labelledby": "inv-modal-title", tabIndex: -1, children: [_jsxs("div", { className: "inv-modal-header", children: [_jsx("h2", { id: "inv-modal-title", className: "inv-modal-title", children: title }), _jsx("button", { className: "inv-modal-close", "aria-label": "Close", onClick: handleClose, children: _jsx(X, { size: 18 }) })] }), _jsx("div", { className: "inv-modal-body", children: children })] })] }), document.body);
};
//# sourceMappingURL=Modal.js.map