import { createTableBody } from "@/app/class.components/Table/table.components";
import { ComponentFactory } from "@framework/utils/factories/ComponentFactory";
import { INITIAL_CELL_SELECTOR } from "./table.constants/InitialCellSelector";
import { TableSelectionController } from "./TableSelectionController";
import { ExcelComponent } from "@core/ExcelComponent.js";
import { ControllerDOM } from "@framework/ControllerDOM";

const TableTemplate = createTableBody();

export const Table = new ComponentFactory(ExcelComponent, "app-tablebody", TableTemplate, "Table", ["mousedown", "click", "keydown"]);

const initSubscriptionInherited = Table.prototype.initSubscription;

Table.prototype.initSubscription = function() {
    initSubscriptionInherited.apply(this, arguments);
    ControllerDOM.prototype.currentTarget = this.$rootElem.findOne(INITIAL_CELL_SELECTOR);
    new TableSelectionController(this.$rootElem.findOne(INITIAL_CELL_SELECTOR)).select();
};
