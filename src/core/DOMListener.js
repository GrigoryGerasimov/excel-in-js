import { ComponentsEventHandlers } from "@/app/class.components/ComponentsEventHandlers";
import { ErrorDOM } from "@framework/utils/errors/ErrorDOM";

export class DOMListener {
    static emtr = null;
    static stor = null;

    constructor({ $root, emtr, store }, options) {
        if (!$root) new ErrorDOM("Please provide element value").throw();
        this.$rootElem = $root;
        DOMListener.emtr = emtr;
        DOMListener.stor = store;
        const { name, listeners } = options;
        Object.assign(this, { name, listeners });
    }

    static get emitter() {
        return DOMListener.emtr;
    }

    static get store() {
        return DOMListener.stor;
    }

    subscribe() {
        for (const listener of this.listeners) {
            const componentEventHandler = new ComponentsEventHandlers[this.name](listener, this);
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
