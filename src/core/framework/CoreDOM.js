import { MixinDOM } from "@framework/utils/mixins/MixinDOM";
import { ErrorDOM } from "@framework/utils/errors/ErrorDOM";
import { getComputedDimensions } from "@framework/utils/dom.operations/getComputedDimensions";

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

    css(styles) {
        if (!styles || !Object.keys(styles).length) {
            new ErrorDOM("Please provide a non-empty styles object to assign the required styles to the parent element").throw();
        }
        Object.keys(styles).forEach(styleKey => {
            if (styles[styleKey]) this.#parent.style[styleKey] = styles[styleKey];
        });
        return this;
    }
}

export const $ = selector => new CoreDOM(selector);

Object.assign(CoreDOM.prototype, MixinDOM);
