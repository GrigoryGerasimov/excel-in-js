import { ExcelComponent } from "@core/ExcelComponent";

export class ExcelStateComponent extends ExcelComponent {
    constructor(...args) {
        super(...args);
    }

    toHTML() {
        return this.setTemplate();
    }

    setTemplate() {
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
