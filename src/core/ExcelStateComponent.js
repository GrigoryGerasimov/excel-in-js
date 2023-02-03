import { ErrorDOM } from "@framework/utils/errors/ErrorDOM";
import { ExcelComponent } from "@core/ExcelComponent";

export class ExcelStateComponent extends ExcelComponent {
    constructor(...args) {
        super(...args);
    }

    toHTML() {
        return this.setTemplate();
    }

    setTemplate() {
        new ErrorDOM("Please note that the method setTemplate in class ExcelStateComponent is an abstract one. Therefore, you are strongly requested to please override the same method in any child class!").throw();
        return JSON.stringify(this.state);
    }

    setInitialState(initialState = {}) {
        this.state = { ...initialState };
    }

    setUpdatedState(newState) {
        this.state = { ...this.state, ...newState };
        this.$rootElem.pHTML = this.setTemplate();
    }
}
