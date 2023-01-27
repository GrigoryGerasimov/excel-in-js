import { ErrorDOM } from "@framework/utils/errors/ErrorDOM";
import { ControllerDOM } from "@framework/ControllerDOM";
import { $ } from "@framework/CoreDOM";

export class TableSelectionController extends ControllerDOM {
    static unsubscribers = [];

    constructor(target) {
        super(target);
    }

    static get currentTarget() {
        return ControllerDOM.prototype.currentTarget;
    }

    static set currentTarget(trgt) {
        ControllerDOM.prototype.currentTarget = trgt;
    }

    get target() {
        return this._target;
    }

    withModifier(trgt, modifier) {
        if (!trgt || !modifier) new ErrorDOM("Please provide the required target and modifier").throw();
        return trgt.className.split(" ").find(clas => clas.endsWith(modifier));
    }

    select() {
        $(this._target).addClass(`${this._target.className}_selected`).setFocus();
        TableSelectionController.currentTarget = this._target;
        return this;
    }

    selectGroup(elemGroup = []) {
        elemGroup.forEach(elem => {
            const selModifier = this.withModifier(elem, "selected");
            if (!selModifier) $(elem).addClass(`${elem.className}_selected`);
        });
    }

    selectSeveral() {
        const selModifier = this.withModifier(this._target, "selected");
        selModifier ? this.remove(selModifier) : this.select();
        super.constructor._targetGroup.push(this._target);
        return this;
    }

    remove(clas) {
        $(this._target).removeClass(clas);
        return this;
    }

    clear() {
        $(this._target).findEvery("div").forEach(block => {
            const selModifier = this.withModifier(block, "selected");
            if (selModifier) $(block).removeClass(selModifier);
        });
        if (TableSelectionController.unsubscribers.length) {
            TableSelectionController.unsubscribers.forEach(unsubscriber => unsubscriber());
        }
        return this;
    }
}
