import { isInStorage, getFromStorage } from "@framework/services/localStorageService";
import { getTimestampFormat } from "@framework/utils/timestamps/getTimestampFormat";
import { localStorageKeys } from "@/localStorageKeys";
import { setTableMeta } from "./dashboard.tablemeta";

export const CreatedSheet = id => {
    const sheetName = isInStorage(localStorageKeys(id).EXCEL_TABLE_STATE) ? getFromStorage(localStorageKeys(id).EXCEL_TABLE_STATE).sheetName : `Sheet ID ${id}`;
    const lastOpened = isInStorage(localStorageKeys(id).EXCEL_TABLE_STATE) ? getFromStorage(localStorageKeys(id).EXCEL_TABLE_STATE).lastOpened : Number(id);
    const row = [sheetName, getTimestampFormat(Number(id)), getTimestampFormat(lastOpened)];

    return `
        <a href="#excel/${id}" class="dashboard-tablebody__row" data-uid="${id}">
        ${row.map(setTableMeta("dashboard-tablebody__cell")).join("")}
        </a>
    `;
};
