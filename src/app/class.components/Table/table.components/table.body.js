import { createTableColHeaders, createTableCell, createTableRow, colCodes, rowResizeBlock } from ".";
import { colResizeBlock } from "./cols/table.pseudo.colResize";

export const createTableBody = (rowQuantity = 25) => {
    const cols = rowCode => colCodes.map(colCode => createTableCell("", colCode, rowCode));
    const rows = [];

    rows.push(createTableRow("", createTableColHeaders(["", colResizeBlock, rowResizeBlock])));

    for (let i = 0; i < rowQuantity; i++) rows.push(createTableRow((i + 1) + rowResizeBlock, cols(i + 1).join("")));

    return rows.join("");
};
