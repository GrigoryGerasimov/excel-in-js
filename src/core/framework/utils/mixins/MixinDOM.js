import { ErrorDOM } from "@framework/utils/errors/ErrorDOM";
import { cachingWrapperDOM } from "@framework/utils/decorator/cachingWrapperDOM";

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
        const getResizerCollection = ($rAncestor, $selector, oValue) => { $rAncestor.querySelectorAll($selector).forEach(r => { r.style.opacity = oValue; }); };
        if (action === "show") return cachingWrapperDOM(getResizerCollection, resizeAncestor, `[data-resize=${resizeType}]`)("0.5");
        else if (action === "hide") return cachingWrapperDOM(getResizerCollection, document, "[data-resize]")("0");
    }
};
