import { INITIAL_TOOLBAR_STATE } from "../Toolbar/toolbar.constants/initialToolbarState";
import { STANDARD_ROW_QUANTITY } from "../Table/table.constants/standardRowQuantity";
import { captureTimestamp } from "@framework/redux/actions/Action";
import { ActionRouter } from "@core/routes/routers/ActionRouter";
import { StoreSubscriber } from "@framework/StoreSubscriber";
import { localStorageConstants } from "@/localStorageKeys";
import { EventEmitter } from "@framework/EventEmitter";
import { $ } from "@framework/CoreDOM";

export class Excel {
    constructor(id, { components, store, excelId, processor }) {
        this.$rootElem = document.querySelector(id);
        this.components = components;
        this.store = store;
        this.excelId = excelId;
        this.processor = processor;
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
            const componentInstance = new Component({
                $root: $componentNode,
                emitter: this.emitter,
                store: this.store,
                excelId: this.excelId,
                processor: this.processor
            });

            switch (componentInstance.name) {
                case "Table": {
                    $componentNode.pHTML = componentInstance.toHTML(/r\d+/g.test(ActionRouter.param) ? ActionRouter.param.slice(ActionRouter.param.lastIndexOf("r") + 1) : STANDARD_ROW_QUANTITY);
                    break;
                }
                case "Toolbar": {
                    $componentNode.pHTML = componentInstance.toHTML(this.processor.get(localStorageConstants.EXCEL_TABLE_STATE)?.currentStyles ?? INITIAL_TOOLBAR_STATE);
                    break;
                }
                default: {
                    $componentNode.pHTML = componentInstance.toHTML();
                    break;
                }
            }
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
