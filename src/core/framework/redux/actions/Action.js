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
export const captureTableFocus = payload => new Action(actionTypes.TABLE_FOCUS_CAPTURE, payload);
export const changeSheetName = payload => new Action(actionTypes.SHEET_NAME_CHANGE, payload);
