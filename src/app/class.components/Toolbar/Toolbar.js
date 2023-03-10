import { INITIAL_TOOLBAR_STATE } from "./toolbar.constants/initialToolbarState";
import { ComponentFactory } from "@framework/utils/factories/ComponentFactory";
import { createToolbarBody } from "./toolbar.components/toolbar.body";
import { ExcelStateComponent } from "@core/ExcelStateComponent.js";
import { localStorageConstants } from "@/localStorageKeys";

const ToolbarTemplate = createToolbarBody;

export const Toolbar = new ComponentFactory(ExcelStateComponent, "app-toolbar", ToolbarTemplate, "Toolbar", ["click"], ["currentStyles"]);

const initSubscriptionInherited = Toolbar.prototype.initSubscription;
const endSubscriptionInherited = Toolbar.prototype.endSubscription;

Toolbar.prototype.prepareBeforeInit = function() {
    this.setInitialState(Toolbar.processor.get(localStorageConstants.EXCEL_TABLE_STATE)?.currentStyles ?? INITIAL_TOOLBAR_STATE);
};

Toolbar.prototype.setTemplate = function() {
    return createToolbarBody(this.state);
};

Toolbar.prototype.initSubscription = function() {
    initSubscriptionInherited.apply(this, arguments);

    this.unsubscribers.push(Toolbar.emitter.subscribe("toolbar/input", params => this.setUpdatedState(...params)));
};

Toolbar.prototype.endSubscription = function() {
    endSubscriptionInherited.apply(this, arguments);
};

Toolbar.prototype.componentPropsUpdated = function({ currentStyles }) {
    this.setUpdatedState(currentStyles);
};
