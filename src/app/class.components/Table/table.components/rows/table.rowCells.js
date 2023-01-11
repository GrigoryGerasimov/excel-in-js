import "@framework/object.native.extentions";

export const createTableRowCell = rowCellContent => rowCellContent.__tag("div", { clas: "app-tablebody__cell" });
