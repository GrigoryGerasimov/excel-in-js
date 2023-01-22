import { createTableBody } from "@/app/class.components/Table/table.components";
import { ComponentFactory } from "@framework/utils/factories/ComponentFactory";
import { TableSelectionController } from "./TableSelectionController";
import { ExcelComponent } from "@core/ExcelComponent.js";

const TableTemplate = createTableBody();

export const Table = new ComponentFactory(ExcelComponent, "app-tablebody", TableTemplate, "Table", ["mousedown", "click", "keydown"]);

const initSubscriptionInherited = Table.prototype.initSubscription;

Table.prototype.initSubscription = function() {
    initSubscriptionInherited.apply(this, arguments);
    new TableSelectionController(this.$rootElem.findOne(`[data-uid="[65::1]"]`)).select();
};
