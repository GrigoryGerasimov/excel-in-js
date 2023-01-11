import { createTableColCell } from "../cols/table.colCells";
import { createTableRowCell } from "./table.rowCells";

export const createTableRow = (rowNumber, rowContent) => {
    return `
    <div class="app-tablebody__row">
        <div class="app-tablebody__row-head">${createTableRowCell(rowNumber)}</div>
        ${createTableColCell(rowContent)}
    </div>
    `;
};
