import { EventEmitter } from "@framework/EventEmitter";
import { $ } from "@framework/CoreDOM";

export class Excel {
    constructor(id, { components, store }) {
        this.$rootElem = document.querySelector(id);
        this.components = components;
        this.store = store;
        this.emitter = new EventEmitter();
    }

    render() {
        const $appNode = $(this.$rootElem).createAndAppend({ tag: "div", className: "app" }).makeParent();

        this.components = this.components.map(Component => {
            const $componentNode = $($appNode).createAndAppend({ tag: "div", className: Component.className }).makeParent();
            const componentInstance = new Component({ $root: $componentNode, emtr: this.emitter, store: this.store });
            $componentNode.pHTML = componentInstance.toHTML();
            return componentInstance;
        });

        for (const Component of this.components) Component.initSubscription();
    }

    unmount() {
        for (const Component of this.components) Component.endSubscription();
    }
}
