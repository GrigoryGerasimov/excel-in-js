import { isInStorage, getFromStorage } from "@framework/services/localStorageService";
import { ComponentFactory } from "@framework/utils/factories/ComponentFactory";
import { ExcelComponent } from "@core/ExcelComponent.js";
import { localStorageKeys } from "@/localStorageKeys";
import { $ } from "@framework/CoreDOM";

const FormulabarTemplate = `
<div class="formulabar-wrapper">
    <span class="app-formulabar__formula-label">fx</span>
    <div class="app-formulabar__formula-text" contenteditable spellcheck="false" data-id="formula-text"></div>
</div>
`;

export const Formulabar = new ComponentFactory(ExcelComponent, "app-formulabar", FormulabarTemplate, "Formulabar", ["input", "keydown"], ["currentText"]);

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

    function setFormulabarInputFieldText(text) {
        $(formulabarInputField).pText = text ?? this.getState().currentText;
    }
};

Formulabar.prototype.endSubscription = function() {
    endSubscriptionInherited.apply(this, arguments);
};

Formulabar.prototype.componentPropsUpdated = function({ currentText }) {
    $(this.$rootElem.findOne(`[data-id="formula-text"]`)).pText = currentText;
};
