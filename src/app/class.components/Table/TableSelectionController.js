import { ErrorDOM } from "@framework/utils/errors/ErrorDOM";
import { ControllerDOM } from "@framework/ControllerDOM";
import { $ } from "@framework/CoreDOM";

export class TableSelectionController extends ControllerDOM {
    static isSelectableCell;

    constructor(target) {
        super(target);
        this.constructor.isSelectableCell = this._target.dataset.colcode || this._target.dataset.rowcode;
    }

    withModifier(trgt, modifier) {
        if (!trgt || !modifier) new ErrorDOM("Please provide the required target and modifier").throw();
        return trgt.className.split(" ").find(clas => clas.endsWith(modifier));
    }

    select() {
        if (TableSelectionController.isSelectableCell) {
            $(this._target).addClass(`${this._target.className}_selected`).setFocus();
        }
        return this;
    }

    selectGroup() {
        const selModifier = this.withModifier(this._target, "selected");
        selModifier ? this.remove(selModifier) : this.select();
        super.constructor._targetGroup.push(this._target);
        return this;
    }

    remove(clas) {
        if (TableSelectionController.isSelectableCell) {
            $(this._target).removeClass(clas);
        }
        return this;
    }

    clear() {
        $(this._target).findEvery("div").forEach(block => {
            const selModifier = this.withModifier(block, "selected");
            if (selModifier) $(block).removeClass(selModifier);
        });
        return this;
    }
}