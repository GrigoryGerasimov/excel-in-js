import { MixinDOM } from "@/utils/mixins/MixinDOM.js";

export class Excel {
    constructor(id, options) {
        this.$rootElem = document.querySelector(id);
        this.components = options.components;
    }

    render() {
        for (const Component of this.components) {
            this.$rootElem.insertAdjacentHTML("beforeend", new Component().toHTML());
        }
    }
}

Object.assign(Excel, MixinDOM);
