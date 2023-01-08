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
        this.#child = this.createNode(nodeParams);
        return this;
    }

    append() {
        !Element.prototype.append ? this.#parent.appendChild(this.#child) : this.#parent.append(this.#child);
        return this;
    }

    insert({ isElement, place }) {
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
}

export const $ = selector => new CoreDOM(selector);

Object.assign(CoreDOM.prototype, MixinDOM);
