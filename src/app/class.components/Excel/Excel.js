import { captureTimestamp } from "@framework/redux/actions/Action";
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
        this.forbidDefaultBehaviorHandler = this.forbidDefaultBehaviorHandler.bind(this);
    }

    render() {
        const lastOpenedTimestamp = { lastOpened: Date.now() };
        this.store.dispatch(captureTimestamp(lastOpenedTimestamp));

        if (process.env.NODE_ENV === "production") {
            document.addEventListener("contextmenu", this.forbidDefaultBehaviorHandler, true);
        }

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
        if (process.env.NODE_ENV === "production") {
            document.removeEventListener("contextmenu", this.forbidDefaultBehaviorHandler, true);
        }

        this.storeSubscriber.cancelSubscription();

        for (const Component of this.components) Component.endSubscription();
    }

    forbidDefaultBehaviorHandler(evt) {
        evt.preventDefault();
    }
}
