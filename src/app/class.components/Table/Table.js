import { isInStorage, getFromStorage } from "@framework/services/localStorageService";
import { createTableBody } from "@/app/class.components/Table/table.components";
import { ComponentFactory } from "@framework/utils/factories/ComponentFactory";
import { captureCellData, captureFocus } from "./table.utils/captureTableData";
import { INITIAL_CELL_SELECTOR } from "./table.constants/InitialCellSelector";
import { localStorageKeys } from "./table.constants/localStorageKeys";
import { TableSelectionController } from "./TableSelectionController";
import { getStoredData } from "./table.utils/getStoredData";
import { ExcelComponent } from "@core/ExcelComponent";
import { $ } from "@framework/CoreDOM";

const TableTemplate = createTableBody();

export const Table = new ComponentFactory(ExcelComponent, "app-tablebody", TableTemplate, "Table", ["mousedown", "click", "keydown", "input"]);

const initSubscriptionInherited = Table.prototype.initSubscription;
const endSubscriptionInherited = Table.prototype.endSubscription;

Table.prototype.initSubscription = function() {
    initSubscriptionInherited.apply(this, arguments);

    let currentTargetUid;

    if (isInStorage(localStorageKeys.EXCEL_TABLE_STATE)) {
        const { colSize, rowSize, cellData, currentFocus } = getFromStorage(localStorageKeys.EXCEL_TABLE_STATE);
        getStoredData({ data: colSize, dataset: "colcode", coreElem: this.$rootElem });
        getStoredData({ data: rowSize, dataset: "rowcode", coreElem: this.$rootElem });
        getStoredData({ data: cellData, dataset: "uid", coreElem: this.$rootElem });
        currentTargetUid = currentFocus;
    }

    TableSelectionController.currentTarget = this.$rootElem.findOne(`[data-uid="${currentTargetUid}"]`) ?? this.$rootElem.findOne(INITIAL_CELL_SELECTOR);

    new TableSelectionController(TableSelectionController.currentTarget).select();

    captureFocus(Table.store, TableSelectionController.currentTarget);

    this.unsubscribers.push(Table.emitter.subscribe("formulabar/input", text => {
        $(TableSelectionController.currentTarget).pText = text;
        captureCellData(Table.store, TableSelectionController.currentTarget);
    }));

    this.unsubscribers.push(Table.emitter.subscribe("formulabar/focus", () => {
        $(TableSelectionController.currentTarget).setFocus();
    }));
};

Table.prototype.endSubscription = function() {
    endSubscriptionInherited.apply(this, arguments);
};
