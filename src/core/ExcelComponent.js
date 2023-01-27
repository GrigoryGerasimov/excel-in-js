import { DOMListener } from "@core/DOMListener";

export class ExcelComponent extends DOMListener {
    constructor($root, options) {
        super($root, options);
        this.prepareBeforeInit();
        this.unsubscribers = [];
    }

    toHTML() {
        return ``;
    }

    prepareBeforeInit() {}

    initSubscription() {
        this.subscribe();
    }

    endSubscription() {
        this.unsubscribe();
        if (this.unsubscribers.length) {
            this.unsubscribers.forEach(unsubscriber => unsubscriber());
        }
    }
}
