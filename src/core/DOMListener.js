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
            this.$rootElem.on(listener, new ComponentsEventHandlers[this.name](listener));
        }
    }

    unsubscribe() {}
}
