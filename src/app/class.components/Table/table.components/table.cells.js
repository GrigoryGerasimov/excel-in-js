import "@framework/object.native.extentions";

export const createTableCell = cellContent => cellContent.__tag("div", { clas: "app-tablebody__col", attr: "contenteditable" });
