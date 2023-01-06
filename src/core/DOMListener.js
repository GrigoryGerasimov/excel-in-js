import { ErrorDOM } from "@framework/utils/errors/ErrorDOM";

export class DOMListener {
    constructor($elem) {
        if (!$elem) new ErrorDOM("Please provide element value").throw();
        this.$elem = $elem;
    }
}
