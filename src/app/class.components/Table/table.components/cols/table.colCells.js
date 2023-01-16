import "@framework/object.native.extentions";

export const createTableColCell = colCellContent => colCellContent.__tag("div", { clas: "app-tablebody__row-cell-cols", data: ["type", "col-row"] });
