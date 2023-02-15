import { ComponentsEventHandlers } from "@/app/class.components/ComponentsEventHandlers";
import { ErrorDOM } from "@framework/utils/errors/ErrorDOM";

export class DOMListener {
    constructor({ $root, emitter, store, excelId, processor }, options) {
        if (!$root) new ErrorDOM("Please provide element value").throw();
        this.$rootElem = $root;
        DOMListener._emitter = emitter;
        DOMListener._store = store;
        DOMListener._excelId = excelId;
        DOMListener._processor = processor;
        const { name, listeners, subscribes } = options;
        Object.assign(this, { name, listeners, subscribes });
    }

    static get emitter() {
        return DOMListener._emitter;
    }

    static get store() {
        return DOMListener._store;
    }

    static get id() {
        return DOMListener._excelId;
    }

    static get processor() {
        return DOMListener._processor;
    }

    subscribe() {
        for (const listener of this.listeners) {
            const componentEventHandler = new ComponentsEventHandlers[this.name](
                listener,
                this,
                DOMListener.emitter,
                DOMListener.store,
                DOMListener.excelId,
                DOMListener.processor
            );
            if (!componentEventHandler) new ErrorDOM(`No corresponding method implemented for ${listener}`).throw();
            this.$rootElem.on(listener, componentEventHandler);
        }
    }

    unsubscribe() {
        this.listeners.forEach(listener => {
            const componentEventHandler = new ComponentsEventHandlers[this.name](listener);
            if (!componentEventHandler) new ErrorDOM(`No corresponding method implemented for ${listener}`).throw();
            this.$rootElem.off(listener, componentEventHandler);
        });
    }
}
