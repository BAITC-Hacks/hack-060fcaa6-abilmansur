"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { defineComponent } from "@inv/lang";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { z } from "zod/v4";
import { Carousel as InvCarousel, CarouselContent as InvCarouselContent, CarouselItem as InvCarouselItem, CarouselNext as InvCarouselNext, CarouselPrevious as InvCarouselPrevious, } from "../../components/Carousel";
import { ContentChildUnion } from "../unions";
/** Shared renderer — also used by the chat library's Carousel variant (wider content union). */
export const CarouselRenderer = ({ props, renderNode }) => {
    const items = props.children ?? [];
    return (_jsxs(InvCarousel, { showButtons: true, variant: props.variant, children: [_jsx(InvCarouselContent, { children: items.map((item, i) => (_jsx(InvCarouselItem, { children: renderNode(item) }, i))) }), _jsx(InvCarouselPrevious, { icon: _jsx(ChevronLeft, {}) }), _jsx(InvCarouselNext, { icon: _jsx(ChevronRight, {}) })] }));
};
export const Carousel = defineComponent({
    name: "Carousel",
    props: z.object({
        children: z.array(z.array(ContentChildUnion)),
        variant: z.enum(["card", "sunk"]).optional(),
    }),
    description: "Horizontal scrollable carousel",
    component: CarouselRenderer,
});
//# sourceMappingURL=index.js.map