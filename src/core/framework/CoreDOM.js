import { getComputedDimensions } from "@framework/utils/dom.operations/getComputedDimensions";
import { cachingWrapperDOM } from "@framework/utils/decorator/cachingWrapperDOM";
import { MixinDOM } from "@framework/utils/mixins/MixinDOM";
import { ErrorDOM } from "@framework/utils/errors/ErrorDOM";

class CoreDOM {
    #parent;
    #child;

    constructor($sel) {
        if (!$sel) new ErrorDOM("Please provide selector value").throw();
        this.#parent = this.validateSelector($sel, CoreDOM);
        this.#child = null;
    }

    get parent() {
        return this.#parent;
    }

    get child() {
        return this.#child;
    }

    get pHTML() {
        return this.#parent.outerHTML;
    }

    set pHTML(val) {
        this.#parent.innerHTML = val;
        return this;
    }

    get cHTML() {
        return this.#child.outerHTML;
    }

    set cHTML(val) {
        this.#child.innerHTML = val;
        return this;
    }

    clearParent() {
        this.#parent.innerHTML = "";
        return this;
    }

    clearChild() {
        this.#child.innerHTML = "";
        return this;
    }

    clearBoth() {
        this.clearParent();
        this.clearChild();
        return this;
    }

    makeParent() {
        this.#parent = this.#child;
        this.#child = null;
        return this;
    }

    makeChild(node) {
        if (!node || !(node instanceof Element) || !node.nodeType) {
            new ErrorDOM("Please provide any existing DOM element to be set as child").throw();
        }
        this.#child = node;
        return this;
    }

    create(nodeParams) {
        if (!nodeParams) new ErrorDOM("Please provide parameters to create a new node with").throw();
        this.#child = this.createNode(nodeParams);
        return this;
    }

    append() {
        !Element.prototype.append ? this.#parent.appendChild(this.#child) : this.#parent.append(this.#child);
        return this;
    }

    insert({ isElement, place }) {
        if (!place) new ErrorDOM("Please provide a place to insert the parent node").throw();
        isElement ? this.#parent.insertAdjacentElement(place, this.#child) : this.#parent.insertAdjacentHTML(place, this.cHTML);
        return this;
    }

    createAndAppend(nodeParams) {
        this.create(nodeParams);
        return this.append();
    }

    createAndInsert(nodeParams, options) {
        this.create(nodeParams);
        return this.insert(options);
    }

    on(eventType, eventHandler) {
        this.#parent.addEventListener(eventType, eventHandler);
    }

    off(eventType, eventHandler) {
        this.#parent.removeEventListener(eventType, eventHandler);
    }

    ancestor(selector) {
        if (!selector) new ErrorDOM("Please provide selector value").throw();
        return $(this.#parent.closest(selector));
    }

    coords() {
        return getComputedDimensions(this.#parent);
    }

    computePointerDelta(initCoord) {
        if (!initCoord) {
            new ErrorDOM("Please provide the initial pointer coords for the resized params to be computed").throw();
        }
        const pointerDifferX = Math.trunc(initCoord - this.coords().computedRightCoord);
        const pointerDifferY = Math.trunc(initCoord - this.coords().computedBottomCoord);
        return { pointerDifferX, pointerDifferY };
    }

    computeResizedParams(pointerInitCoord) {
        const resWidth = Math.trunc(this.coords().computedWidth + this.computePointerDelta(pointerInitCoord).pointerDifferX) + "px";
        const resHeight = Math.trunc(this.coords().computedHeight + this.computePointerDelta(pointerInitCoord).pointerDifferY) + "px";
        return { resWidth, resHeight };
    }

    defineResizers({ resizeAncestor = this.parent, resizeType, resizeStyles, action = "hide" }) {
        const getResizerCollection = ($rAncestor, $selector, styles) => { $($rAncestor).findSome($selector).forEach(r => { $(r).css(styles); }); };
        if (action === "show") return cachingWrapperDOM(getResizerCollection, resizeAncestor, `[data-resize=${resizeType}]`)(resizeStyles);
        else if (action === "hide") return cachingWrapperDOM(getResizerCollection, resizeAncestor, "[data-resize]")(resizeStyles);
    }

    css(styles) {
        if (!styles || !Object.keys(styles).length) {
            new ErrorDOM("Please provide a non-empty styles object to assign the required styles to the parent element").throw();
        }
        Object.keys(styles).forEach(styleKey => {
            if (styles[styleKey]) this.#parent.style[styleKey] = styles[styleKey];
        });
        return this;
    }

    findOne(selector) {
        if (!selector) new ErrorDOM("Please provide selector value").throw();
        return this.#parent.querySelector(selector);
    }

    findSome(selector) {
        if (!selector) new ErrorDOM("Please provide selector value").throw();
        return this.#parent.querySelectorAll(selector);
    }

    findEvery(selector) {
        if (!selector) new ErrorDOM("Please provide selector value").throw();
        return document.querySelectorAll(selector);
    }

    addClass(className) {
        if (!className) new ErrorDOM("Please provide the name of the class to be added").throw();
        if (!this.hasClass(className)) this.#parent.classList.add(className);
        return this;
    }

    hasClass(className) {
        if (!className) new ErrorDOM("Please provide the name of the class to check").throw();
        return this.#parent.classList.contains(className);
    }

    toggleClass(className) {
        if (!className) new ErrorDOM("Please provide the name of the class to be toggled").throw();
        this.#parent.classList.toggle(className);
        return this;
    }

    removeClass(className) {
        if (!className) new ErrorDOM("Please provide the name of the class to be removed").throw();
        this.#parent.classList.remove(className);
        return this;
    }

    setFocus() {
        this.#parent.focus({ focusVisible: true });
        return this;
    }

    uid(options = {}) {
        const { isParseRequired } = options;
        if (isParseRequired) {
            const parsedUid = this.uid().match(/\d{1,}/gi).map(Number);
            return {
                col: parsedUid[0],
                row: parsedUid[1]
            };
        }
        return this.#parent.dataset.uid;
    }

    get pText() {
        return this.#parent.tagName.toLowerCase() === "input" ? this.#parent.value.trim() : this.#parent.textContent.trim();
    }

    set pText(text) {
        this.#parent.tagName.toLowerCase() === "input" ? this.#parent.value = text : this.#parent.textContent = text;
        return this;
    }

    get cText() {
        return this.#child.tagName.toLowerCase() === "input" ? this.#child.value.trim() : this.#child.textContent.trim();
    }

    set cText(text) {
        this.#child.tagName.toLowerCase() === "input" ? this.#child.value = text : this.#child.textContent = text;
        return this;
    }

    attr(attribute, value, isParent = true) {
        if (!attribute) new ErrorDOM("Please provide an attribute").throw();
        const elem = isParent ? this.#parent : this.child;
        if (!value) return elem.getAttribute(attribute);
        elem.setAttribute(attribute, value);
        return this;
    }
}

export const $ = selector => new CoreDOM(selector);

Object.assign(CoreDOM.prototype, MixinDOM);
