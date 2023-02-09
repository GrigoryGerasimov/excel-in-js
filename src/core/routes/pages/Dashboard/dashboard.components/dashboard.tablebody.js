import { convertToArr } from "@framework/utils/conversions/convertToArr";
import { CreatedSheet } from "./dashboard.createdsheet";

export const DashboardTablebody = sheetIds => {
    let body;

    if (!sheetIds || !sheetIds.length) {
        body = `<span class="dashboard-tablebody__head-cell">You don't have any active sheets yet</span>`;
    } else {
        sheetIds = convertToArr(sheetIds);
        body = `
        <div class="dashboard-tablebody__row">
            <span class="dashboard-tablebody__head-cell">Document</span>
            <span class="dashboard-tablebody__head-cell">Created At</span>
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
