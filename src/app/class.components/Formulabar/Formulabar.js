import { isInStorage, getFromStorage } from "@framework/services/localStorageService";
import { ComponentFactory } from "@framework/utils/factories/ComponentFactory";
import { localStorageKeys } from "../Table/table.constants/localStorageKeys";
import { ExcelComponent } from "@core/ExcelComponent.js";
import { $ } from "@framework/CoreDOM";

const FormulabarTemplate = `
<div class="formulabar-wrapper">
    <span class="app-formulabar__formula-label">fx</span>
    <div class="app-formulabar__formula-text" contenteditable spellcheck="false" data-id="formula-text"></div>
</div>
`;

export const Formulabar = new ComponentFactory(ExcelComponent, "app-formulabar", FormulabarTemplate, "Formulabar", ["input", "keydown"]);

const initSubscriptionInherited = Formulabar.prototype.initSubscription;
const endSubscriptionInherited = Formulabar.prototype.endSubscription;

Formulabar.prototype.initSubscription = function() {
    initSubscriptionInherited.apply(this, arguments);

    const formulabarInputField = this.$rootElem.findOne(`[data-id="formula-text"]`);

    if (isInStorage(localStorageKeys.EXCEL_TABLE_STATE)) {
        const { currentText } = getFromStorage(localStorageKeys.EXCEL_TABLE_STATE);
        setFormulabarInputFieldText(currentText);
    }

    Formulabar.store.subscribe(setFormulabarInputFieldText.bind(Formulabar.store));

    this.unsubscribers.push(Formulabar.emitter.subscribe("tablecell/input", text => {
        setFormulabarInputFieldText(text);
    }));

    this.unsubscribers.push(Formulabar.emitter.subscribe("tablecell/select", text => {
        setFormulabarInputFieldText(text);
    }));

    function setFormulabarInputFieldText(text) {
        $(formulabarInputField).pText = text ?? this.getState().currentText;
    }
};

Formulabar.prototype.endSubscription = function() {
    endSubscriptionInherited.apply(this, arguments);
};
