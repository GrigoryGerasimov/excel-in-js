import { INITIAL_TOOLBAR_STATE } from "./toolbar.constants/initialToolbarState";
import { ComponentFactory } from "@framework/utils/factories/ComponentFactory";
import { createToolbarBody } from "./toolbar.components/toolbar.body";
import { ExcelStateComponent } from "@core/ExcelStateComponent.js";

const ToolbarTemplate = createToolbarBody(INITIAL_TOOLBAR_STATE);

export const Toolbar = new ComponentFactory(ExcelStateComponent, "app-toolbar", ToolbarTemplate, "Toolbar", ["click"]);

const initSubscriptionInherited = Toolbar.prototype.initSubscription;
const endSubscriptionInherited = Toolbar.prototype.endSubscription;

Toolbar.prototype.prepareBeforeInit = function() {
    this.setInitialState(INITIAL_TOOLBAR_STATE);
};

Toolbar.prototype.setTemplate = function() {
    return createToolbarBody(this.state);
};

Toolbar.prototype.initSubscription = function() {
    initSubscriptionInherited.apply(this, arguments);

    this.unsubscribers.push(Toolbar.emitter.subscribe("toolbarEventHandler/input", params => this.setUpdatedState(...params)));
};

Toolbar.prototype.endSubscription = function() {
    endSubscriptionInherited.apply(this, arguments);
};
