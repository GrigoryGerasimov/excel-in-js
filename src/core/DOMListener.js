import { ErrorDOM } from "@framework/utils/errors/ErrorDOM";
// import { getEventMethodName } from "@framework/utils/namings/getEventMethodName";
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
            const componentEventHandler = new ComponentsEventHandlers[this.name](listener);
            if (!componentEventHandler) new ErrorDOM(`No corresponding method implemented for ${listener}`).throw();
            this.$rootElem.on(listener, componentEventHandler);
        }
    }

    unsubscribe() {
        // практическое задание

        // реализация по собственному коду
        this.listeners.forEach(listener => {
            const componentEventHandler = new ComponentsEventHandlers[this.name](listener);
            if (!componentEventHandler) new ErrorDOM(`No corresponding method implemented for ${listener}`).throw();
            this.$rootElem.off(listener, componentEventHandler);
        });

        // реализация по коду Владилена
        // this.listeners.forEach(listener => {
        //     const method = getEventMethodName(listener);
        //     if (!this[method]) throw new Error(`No method ${method} implemented for ${this.name}`);
        //     this.$rootElem.off(listener, this[method].bind(this));
        // });
    }
}
