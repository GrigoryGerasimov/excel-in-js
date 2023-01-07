import { DOMListener } from "@core/DOMListener";

export class ExcelComponent extends DOMListener {
    constructor($root, options) {
        super($root, options.listeners);
    }

    toHTML() {
        return ``;
    }

    initSubscription() {
        this.subscribe();
    }
}
