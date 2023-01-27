import { createTableBody } from "@/app/class.components/Table/table.components";
import { ComponentFactory } from "@framework/utils/factories/ComponentFactory";
import { INITIAL_CELL_SELECTOR } from "./table.constants/InitialCellSelector";
import { TableSelectionController } from "./TableSelectionController";
import { ExcelComponent } from "@core/ExcelComponent";
import { $ } from "@framework/CoreDOM";

const TableTemplate = createTableBody();

export const Table = new ComponentFactory(ExcelComponent, "app-tablebody", TableTemplate, "Table", ["mousedown", "click", "keydown", "input"]);

const initSubscriptionInherited = Table.prototype.initSubscription;

Table.prototype.initSubscription = function() {
    initSubscriptionInherited.apply(this, arguments);

    TableSelectionController.currentTarget = this.$rootElem.findOne(INITIAL_CELL_SELECTOR);

    new TableSelectionController(TableSelectionController.currentTarget).select();

    this.unsubscribers.push(Table.emitter.subscribe("formulabar/input", text => {
        $(TableSelectionController.currentTarget).pText = text;
    }));

    this.unsubscribers.push(Table.emitter.subscribe("formulabar/focus", () => {
        $(TableSelectionController.currentTarget).setFocus();
    }));
};
