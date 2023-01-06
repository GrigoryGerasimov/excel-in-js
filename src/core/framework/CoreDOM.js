import { MixinDOM } from "@framework/utils/mixins/MixinDOM";
import { ErrorDOM } from "@framework/utils/errors/ErrorDOM";

class CoreDOM {
    constructor($sel) {
        if (!$sel) new ErrorDOM("Please provide selector value").throw();
        this.$elem = this.validateSelector($sel);
        this.$newElem = null;
    }

    get html() {
        return this.$elem;
    }

    set html(val) {
        this.$elem = this.validateSelector(val);
        return this;
    }

    create(nodeParams) {
        this.$newElem = this.createNode(nodeParams);
        return this;
    }

    insert({ parent = this.$elem, node = this.$newElem, shouldAppend, isElement, place }) {
        if (shouldAppend) !Element.prototype.append ? parent.appendChild(node) : parent.append(node);
        else isElement ? parent.insertAdjacentElement(place, node) : parent.insertAdjacentHTML(place, node);
        return this;
    }

    createAndInsert(nodeParams) {
        const $newNode = this.createNode(nodeParams);
        return this.insert({ node: $newNode, shouldAppend: true });
    }
}

export const $ = selector => new CoreDOM(selector);

Object.assign(CoreDOM.prototype, MixinDOM);
