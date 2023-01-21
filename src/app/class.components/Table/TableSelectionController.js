import { ControllerDOM } from "@framework/ControllerDOM";
import { $ } from "@framework/CoreDOM";

export class TableSelectionController extends ControllerDOM {
    constructor(target) {
        super(target);
    }

    select() {
        this.clear();
        if (this._target.dataset.colcode || this._target.dataset.rowcode) {
            $(this._target).css({ outline: "3px solid rgba(117, 97, 192, .75)" });
        }
    }

    selectGroup() {}

    clear() {
        document.querySelectorAll("div").forEach(block => $(block).css({ outline: "none" }));
    }
}
