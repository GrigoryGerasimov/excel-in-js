import { StoreSubscriber } from "@framework/StoreSubscriber";
import { EventEmitter } from "@framework/EventEmitter";
import { $ } from "@framework/CoreDOM";

export class Excel {
    constructor(id, { components, store, excelId }) {
        this.$rootElem = document.querySelector(id);
        this.components = components;
        this.store = store;
        this.excelId = excelId;
        this.emitter = new EventEmitter();
        this.storeSubscriber = new StoreSubscriber(this.store);
    }

    render() {
        const $appNode = $(this.$rootElem).createAndAppend({ tag: "div", className: "app" }).makeParent();

        this.components = this.components.map(Component => {
            const $componentNode = $($appNode).createAndAppend({ tag: "div", className: Component.className }).makeParent();
            const componentInstance = new Component({ $root: $componentNode, emtr: this.emitter, store: this.store, excelId: this.excelId });
            $componentNode.pHTML = componentInstance.toHTML();
            return componentInstance;
        });

        this.storeSubscriber.applySubscription(this.components);

        for (const Component of this.components) Component.initSubscription();
    }

    unmount() {
        this.storeSubscriber.cancelSubscription();

        for (const Component of this.components) Component.endSubscription();
    }
}
