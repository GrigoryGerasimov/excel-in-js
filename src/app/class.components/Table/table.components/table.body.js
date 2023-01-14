import { createTableColHeaders, createTableCell, createTableRow, colCodes, rowResizeBlock } from ".";
import { colResizeBlock } from "./cols/table.pseudo.colResize";

export const createTableBody = (rowQuantity = 25) => {
    const cols = colCodes.map(code => createTableCell(["<br/>", colResizeBlock, rowResizeBlock], code));
    const rows = [];

    rows.push(createTableRow("", createTableColHeaders(["<br/>", colResizeBlock, rowResizeBlock])));

    for (let i = 0; i < rowQuantity; i++) rows.push(createTableRow((i + 1) + rowResizeBlock, cols.join("")));

    return rows.join("");
};
