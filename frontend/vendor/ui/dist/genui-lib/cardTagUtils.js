import { jsx as _jsx } from "react/jsx-runtime";
import { Tag as InvTag } from "../components/Tag";
import { IconWrapper } from "../components/_shared/icons";
/** Renders a `Tag` element ref (as used inside card blocks) at the small size. */
export function renderCardTag(tag, key) {
    if (!tag)
        return null;
    const { text, variant, icon } = tag.props;
    return (_jsx(InvTag, { text: text, variant: variant ?? "neutral", size: "sm", icon: icon?.props?.name ? (_jsx(IconWrapper, { name: icon.props.name, category: icon.props.category })) : undefined }, key));
}
//# sourceMappingURL=cardTagUtils.js.map