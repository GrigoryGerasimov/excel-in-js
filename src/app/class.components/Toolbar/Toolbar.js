import { ComponentFactory } from "@framework/utils/factories/ComponentFactory";
import { createToolbarBody } from "./toolbar.components/toolbar.body";
import { ExcelStateComponent } from "@core/ExcelStateComponent.js";

const ToolbarTemplate = createToolbarBody();

export const Toolbar = new ComponentFactory(ExcelStateComponent, "app-toolbar", ToolbarTemplate, "Toolbar", ["click"]);

const initSubscriptionInherited = Toolbar.prototype.initSubscription;
const endSubscriptionInherited = Toolbar.prototype.endSubscription;

Toolbar.prototype.prepareBeforeInit = function() {
    const initialState = {
        fontWeight: "normal",
        fontStyle: "normal",
        textDecoration: "none",
        textAlign: "initial"
    };
    this.setInitialState(initialState);
};

Toolbar.prototype.setTemplate = function() {
    return createToolbarBody(this.state);
};

Toolbar.prototype.toHTML = function() {
    return Toolbar.prototype.setTemplate();
};

Toolbar.prototype.initSubscription = function() {
    initSubscriptionInherited.apply(this, arguments);

    this.unsubscribers.push(Toolbar.emitter.subscribe("toolbarEventHandler/input", params => this.setUpdatedState(...params)));
};

Toolbar.prototype.endSubscription = function() {
    endSubscriptionInherited.apply(this, arguments);
};
