import { isInStorage, getFromStorage } from "@framework/services/localStorageService";
import { createTableBody } from "@/app/class.components/Table/table.components";
import { ComponentFactory } from "@framework/utils/factories/ComponentFactory";
import { INITIAL_CELL_SELECTOR } from "./table.constants/InitialCellSelector";
import { localStorageKeys } from "./table.constants/localStorageKeys";
import { TableSelectionController } from "./TableSelectionController";
import { ExcelComponent } from "@core/ExcelComponent";
import { $ } from "@framework/CoreDOM";

const TableTemplate = createTableBody();

export const Table = new ComponentFactory(ExcelComponent, "app-tablebody", TableTemplate, "Table", ["mousedown", "click", "keydown", "input"]);

const initSubscriptionInherited = Table.prototype.initSubscription;
const endSubscriptionInherited = Table.prototype.endSubscription;

Table.prototype.initSubscription = function() {
    initSubscriptionInherited.apply(this, arguments);

    if (isInStorage(localStorageKeys.EXCEL_COLS)) {
        const { colSize } = getFromStorage(localStorageKeys.EXCEL_COLS);
        const colCodes = Object.keys(colSize);
        for (const colCode of colCodes) {
            this.$rootElem.findSome(`[data-colcode="${colCode}"]`).forEach(col => $(col).css({ width: colSize[colCode] }));
        }
    }

    TableSelectionController.currentTarget = this.$rootElem.findOne(INITIAL_CELL_SELECTOR);

    new TableSelectionController(TableSelectionController.currentTarget).select();

    this.unsubscribers.push(Table.emitter.subscribe("formulabar/input", text => {
        $(TableSelectionController.currentTarget).pText = text;
    }));

    this.unsubscribers.push(Table.emitter.subscribe("formulabar/focus", () => {
        $(TableSelectionController.currentTarget).setFocus();
    }));
};

Table.prototype.endSubscription = function() {
    endSubscriptionInherited.apply(this, arguments);
};
