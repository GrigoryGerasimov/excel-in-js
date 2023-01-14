import "@framework/object.native.extentions";

export const createTableCell = (cellContent, colCode) => cellContent.__tag("div", { clas: "app-tablebody__col", attr: ["contenteditable", true], data: ["colCode", colCode] });
