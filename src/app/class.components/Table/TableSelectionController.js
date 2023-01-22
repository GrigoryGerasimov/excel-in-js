import { ControllerDOM } from "@framework/ControllerDOM";
import { $ } from "@framework/CoreDOM";

export class TableSelectionController extends ControllerDOM {
    constructor(target) {
        super(target);
    }

    select() {
        if (this._target.dataset.colcode || this._target.dataset.rowcode) {
            $(this._target).addClass(`${this._target.className}_selected`).setFocus();
        }
        return this;
    }

    selectGroup() {}

    clear() {
        $(this._target).findEvery("div").forEach(block => {
            const selModifier = block.className.split(" ").find(clas => clas.endsWith("selected"));
            if (selModifier) $(block).removeClass(selModifier);
        });
        return this;
    }
}
