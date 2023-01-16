import "@framework/object.native.extentions";

export const createTableRowCell = (rowCellContent, rowCode = parseInt(rowCellContent) || null) => rowCellContent.__tag("div", { clas: "app-tablebody__cell", data: ["rowCode", rowCode] });
