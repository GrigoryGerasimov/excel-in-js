import { isInStorage, getFromStorage } from "@framework/services/localStorageService";
import { INITIAL_TOOLBAR_STATE } from "./toolbar.constants/initialToolbarState";
import { ComponentFactory } from "@framework/utils/factories/ComponentFactory";
import { createToolbarBody } from "./toolbar.components/toolbar.body";
import { ExcelStateComponent } from "@core/ExcelStateComponent.js";
import { localStorageKeys } from "@/localStorageKeys";

const ToolbarTemplate = createToolbarBody;

export const Toolbar = new ComponentFactory(ExcelStateComponent, "app-toolbar", ToolbarTemplate, "Toolbar", ["click"], ["currentStyles"]);

const initSubscriptionInherited = Toolbar.prototype.initSubscription;
const endSubscriptionInherited = Toolbar.prototype.endSubscription;

Toolbar.prototype.prepareBeforeInit = function() {
    if (isInStorage(localStorageKeys(Toolbar.id).EXCEL_TABLE_STATE)) {
        const { currentStyles } = getFromStorage(localStorageKeys(Toolbar.id).EXCEL_TABLE_STATE);
        this.setInitialState(currentStyles);
    } else this.setInitialState(INITIAL_TOOLBAR_STATE);
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
