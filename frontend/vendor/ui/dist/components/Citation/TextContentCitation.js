import { jsx as _jsx } from "react/jsx-runtime";
import { useCardSourceContext } from "../Sources/SourceContext";
import { Citation } from "./Citation";
export const TextContentCitation = ({ node, children, ...rest }) => {
    const sources = useCardSourceContext();
    const properties = node?.properties ?? {};
    const componentType = properties["data-component-type"];
    const indicesString = properties["data-citation-indices"];
    if (componentType !== "citation" || !indicesString) {
        return _jsx("span", { ...rest, children: children });
    }
    if (!sources.length) {
        return null;
    }
    const indices = indicesString.split(",").map(Number);
    const relevantSources = indices
        .map((idx) => sources[idx - 1])
        .filter((source) => source !== undefined)
        .filter((source) => source.sourceName &&
        source.title &&
        source.sourceName.trim() !== "" &&
        source.title.trim() !== "");
    if (relevantSources.length === 0) {
        return null;
    }
    return _jsx(Citation, { sources: relevantSources });
};
//# sourceMappingURL=TextContentCitation.js.map