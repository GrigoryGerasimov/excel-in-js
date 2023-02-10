import { actionTypes } from "./actionTypes";

class Action {
    constructor(type, payload) {
        this.type = type;
        this.payload = payload;
    }
}

export const init = new Action(actionTypes.INIT);
export const resizeTable = payload => new Action(actionTypes.TABLE_RESIZE, payload);
export const changeCellData = payload => new Action(actionTypes.CELL_DATA_CHANGE, payload);
export const changeCellStyles = payload => new Action(actionTypes.CELL_STYLES_CHANGE, payload);
export const changeCellValue = payload => new Action(actionTypes.CELL_VALUE_CHANGE, payload);
export const changeCurrentStyles = payload => new Action(actionTypes.CELL_CURRENT_STYLES_CHANGE, payload);
export const captureTableFocus = payload => new Action(actionTypes.TABLE_FOCUS_CAPTURE, payload);
export const captureTimestamp = payload => new Action(actionTypes.TIMESTAMP_CAPTURE, payload);
export const changeSheetName = payload => new Action(actionTypes.SHEET_NAME_CHANGE, payload);
