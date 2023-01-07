import { ErrorDOM } from "@framework/utils/errors/ErrorDOM";

export class DOMListener {
    constructor($elem, listeners) {
        if (!$elem) new ErrorDOM("Please provide element value").throw();
        this.$elem = $elem;
        this.listeners = listeners;
    }

    subscribe() {
        console.log(this.listeners);
    }

    unsubscribe() {}
}
