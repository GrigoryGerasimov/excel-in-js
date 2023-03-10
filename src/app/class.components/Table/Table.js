import { captureCellData, captureCellStyles, captureCellValue, captureCurrentStyles } from "./table.utils/captureTableData";
import { createTableBody } from "@/app/class.components/Table/table.components";
import { ComponentFactory } from "@framework/utils/factories/ComponentFactory";
import { INITIAL_CELL_SELECTOR } from "./table.constants/InitialCellSelector";
import { TableSelectionController } from "./TableSelectionController";
import { getStoredData } from "./table.utils/getStoredData";
import { localStorageConstants } from "@/localStorageKeys";
import { parseFormula } from "./table.utils/parseFormula";
import { ExcelComponent } from "@core/ExcelComponent";
import { $ } from "@framework/CoreDOM";

const TableTemplate = createTableBody;

export const Table = new ComponentFactory(ExcelComponent, "app-tablebody", TableTemplate, "Table", ["pointerdown", "click", "keydown", "input"], ["currentFocus"]);

const initSubscriptionInherited = Table.prototype.initSubscription;
const endSubscriptionInherited = Table.prototype.endSubscription;

Table.prototype.initSubscription = function() {
    initSubscriptionInherited.apply(this, arguments);

    if (Table.processor.get(localStorageConstants.EXCEL_TABLE_STATE)) {
        const { colSize, rowSize, cellData, cellValue, cellStyles } = Table.processor.get(localStorageConstants.EXCEL_TABLE_STATE);
        getStoredData({ type: "colsize", data: colSize, dataset: "colcode", coreElem: this.$rootElem });
        getStoredData({ type: "rowsize", data: rowSize, dataset: "rowcode", coreElem: this.$rootElem });
        getStoredData({ type: "celldata", data: cellData, dataset: "uid", coreElem: this.$rootElem });
        getStoredData({ type: "cellstyles", data: cellStyles, dataset: "uid", coreElem: this.$rootElem });
        getStoredData({ type: "cellvalue", data: cellValue, dataset: "uid", coreElem: this.$rootElem });
    }

    TableSelectionController.currentTarget = this.$rootElem.findOne(`[data-uid="${Table.processor.get(localStorageConstants.EXCEL_TABLE_STATE)?.currentFocus}"]`) ?? this.$rootElem.findOne(INITIAL_CELL_SELECTOR);

    new TableSelectionController(TableSelectionController.currentTarget).select();

    this.unsubscribers.push(Table.emitter.subscribe("formulabar/input", text => {
        $(TableSelectionController.currentTarget).attr("data-value", text).pText = parseFormula(text);
        captureCellData(Table.store, TableSelectionController.currentTarget);
        captureCellValue(Table.store, TableSelectionController.currentTarget);
    }));

    this.unsubscribers.push(Table.emitter.subscribe("formulabar/focus", () => {
        $(TableSelectionController.currentTarget).setFocus();
    }));

    this.unsubscribers.push(Table.emitter.subscribe("toolbar/input", params => {
        this.$rootElem.findSome(`[class$="selected"]`).forEach(elem => {
            $(elem).css(...params);
            captureCellStyles(Table.store, elem);
            if (elem.children) {
                setChildrenStyles(elem, "[data-rowcode]");
                setChildrenStyles(elem, "[data-colcode]");
            }
        });
        captureCurrentStyles(Table.store, TableSelectionController.currentTarget);

        function setChildrenStyles(target, selector) {
            $(target).findSome(selector).forEach(child => {
                $(child).css(...params);
                captureCellStyles(Table.store, child);
            });
        }
    }));

    this.unsubscribers.push(Table.emitter.subscribe("toolbar/undo", () => {
        $(TableSelectionController.currentTarget).pText = "";
    }));

    this.unsubscribers.push(Table.emitter.subscribe("toolbar/redo", () => {
        const redoValue = TableSelectionController.currentTarget.dataset?.state ? TableSelectionController.currentTarget.dataset.state : "";
        $(TableSelectionController.currentTarget).pText = redoValue;
    }));
};

Table.prototype.endSubscription = function() {
    endSubscriptionInherited.apply(this, arguments);
};

Table.prototype.componentPropsUpdated = function({ currentFocus }) {
    $(this.$rootElem.findOne(`[data-uid="${currentFocus}"]`)).setFocus();
};
