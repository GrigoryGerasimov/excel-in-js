import { createTableColHeaders, createTableCell, createTableRow, colCodes } from ".";

export const createTableBody = (rowQuantity = 25) => {
    const cols = Array(colCodes.length).fill(createTableCell(""));
    const rows = [];

    rows.push(createTableRow("", createTableColHeaders()));

    for (let i = 0; i < rowQuantity; i++) rows.push(createTableRow(i + 1, cols.join("")));

    return rows.join("");
};
