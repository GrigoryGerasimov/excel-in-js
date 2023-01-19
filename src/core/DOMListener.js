import { ErrorDOM } from "@framework/utils/errors/ErrorDOM";
import { ComponentsEventHandlers } from "@/app/class.components/ComponentsEventHandlers";

export class DOMListener {
    constructor($root, options) {
        if (!$root) new ErrorDOM("Please provide element value").throw();
        this.$rootElem = $root;
        const { name, listeners } = options;
        Object.assign(this, { name, listeners });
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
