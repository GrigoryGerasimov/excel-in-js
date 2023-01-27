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

Formulabar.prototype.initSubscription = function() {
    initSubscriptionInherited.apply(this, arguments);

    this.unsubscribers.push(Formulabar.emitter.subscribe("tablecell/input", text => {
        $(this.$rootElem.findOne(`[data-id="formula-text"]`)).pText = text;
    }));
};
