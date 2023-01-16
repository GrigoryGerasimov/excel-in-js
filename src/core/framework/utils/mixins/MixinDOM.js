import { ErrorDOM } from "@framework/utils/errors/ErrorDOM";

export const MixinDOM = {
    createNode({ tag, className, content }) {
        const node = document.createElement(tag);
        if (className) node.classList.add(className);
        if (content) node.innerHTML = content;
        return node;
    },
    validateSelector(payload, ancestor) {
        if (!payload) new ErrorDOM("Please provide selector for validation").throw();
        return typeof payload === "string" ? document.querySelector(payload) : payload instanceof ancestor ? payload.parent : (payload instanceof Element && payload.nodeType === Node.ELEMENT_NODE) ? payload : new ErrorDOM("Selector validation failed: no valid selector provided. Please try with another selector").throw();
    },
    defineResizers({ resizeAncestor = this.parent, resizeType, action = "hide" }) {
        if (action === "show") resizeAncestor.querySelectorAll(`[data-resize=${resizeType}]`).forEach(r => { r.style.opacity = "0.5"; });
        else if (action === "hide") document.querySelectorAll("[data-resize]").forEach(r => { r.style.opacity = "0"; });
    }
};
