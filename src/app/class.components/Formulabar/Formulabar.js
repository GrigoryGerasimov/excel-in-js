import { ComponentFactory } from "@framework/utils/factories/ComponentFactory";
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

    this.unsubscribers.push(Formulabar.emitter.subscribe("tablecell/input", text => {
        $(formulabarInputField).pText = text;
    }));

    this.unsubscribers.push(Formulabar.emitter.subscribe("tablecell/select", text => {
        $(formulabarInputField).pText = text;
    }));
};

Formulabar.prototype.endSubscription = function() {
    endSubscriptionInherited.apply(this, arguments);
};
