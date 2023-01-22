import { DOMListener } from "@core/DOMListener";

export class ExcelComponent extends DOMListener {
    constructor($root, options) {
        super($root, options);
        this.prepareBeforeInit();
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
    }
}
