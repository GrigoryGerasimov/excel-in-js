import { ComponentFactory } from "@framework/utils/factories/ComponentFactory";
import { localStorageConstants } from "@/localStorageKeys";
import { ExcelComponent } from "@core/ExcelComponent.js";
import { $ } from "@framework/CoreDOM";

const FormulabarTemplate = () => `
<div class="formulabar-wrapper">
    <span class="app-formulabar__formula-label">fx</span>
    <div class="app-formulabar__formula-text" contenteditable spellcheck="false" data-id="formula-text"></div>
</div>
`;

export const Formulabar = new ComponentFactory(ExcelComponent, "app-formulabar", FormulabarTemplate, "Formulabar", ["input", "keydown"], ["currentValue"]);

const initSubscriptionInherited = Formulabar.prototype.initSubscription;
const endSubscriptionInherited = Formulabar.prototype.endSubscription;

Formulabar.prototype.initSubscription = function() {
    initSubscriptionInherited.apply(this, arguments);

    const formulabarInputField = this.$rootElem.findOne(`[data-id="formula-text"]`);

    const currentValue = Formulabar.processor.get(localStorageConstants.EXCEL_TABLE_STATE)?.currentValue;
    if (currentValue) setFormulabarInputFieldText(currentValue);

    Formulabar.store.subscribe(setFormulabarInputFieldText.bind(Formulabar.store));

    function setFormulabarInputFieldText(value) {
        $(formulabarInputField).pText = value ?? this.getState().currentValue;
    }
};

Formulabar.prototype.endSubscription = function() {
    endSubscriptionInherited.apply(this, arguments);
};

Formulabar.prototype.componentPropsUpdated = function({ currentValue }) {
    $(this.$rootElem.findOne(`[data-id="formula-text"]`)).pText = currentValue;
};
