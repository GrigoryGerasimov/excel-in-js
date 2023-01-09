import { DOMListener } from "@core/DOMListener";

export class ExcelComponent extends DOMListener {
    constructor($root, options) {
        super($root, options);
    }

    toHTML() {
        return ``;
    }

    initSubscription() {
        this.subscribe();
    }

    endSubscription() {
        this.unsubscribe();
    }
}
