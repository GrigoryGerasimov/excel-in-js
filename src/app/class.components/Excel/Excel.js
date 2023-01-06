import { MixinDOM } from "@/utils/mixins/MixinDOM.js";

export class Excel {
    constructor(id, options) {
        this.$rootElem = document.querySelector(id);
        this.components = options.components;
    }

    render() {
        const $appNode = this.createNode({ tag: "div", className: "app" });
        this.$rootElem.appendChild($appNode);

        for (const Component of this.components) {
            const $componentNode = this.createNode({ tag: "div", className: Component.className });
            $componentNode.insertAdjacentHTML("afterbegin", new Component($componentNode).toHTML());
            $appNode.appendChild($componentNode);
        }
    }
}

Object.assign(Excel.prototype, MixinDOM);
