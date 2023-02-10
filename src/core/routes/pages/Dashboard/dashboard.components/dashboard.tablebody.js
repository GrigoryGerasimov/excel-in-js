import { convertToArr } from "@framework/utils/conversions/convertToArr";
import { CreatedSheet } from "./dashboard.createdsheet";
import { setTableMeta } from "./dashboard.tablemeta";

export const DashboardTablebody = sheetIds => {
    const rowTitles = ["Document", "Created At", "Last Opened"];
    let body;

    if (!sheetIds || !sheetIds.length) {
        body = `<span class="dashboard-tablebody__head-cell">You don't have any active sheets yet</span>`;
    } else {
        sheetIds = convertToArr(sheetIds);
        body = `
        <div class="dashboard-tablebody__row">
        ${rowTitles.map(setTableMeta("dashboard-tablebody__head-cell")).join("")}
        </div>
        ${sheetIds.map(CreatedSheet).join("")}
        `;
    }

    return `
    <div class="dashboard-tablebody">
        <div class="tablebody-wrapper">
            ${body}
        </div>
    </div>
    `;
};
