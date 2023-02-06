import "@framework/object.native.extentions";

export const createTableCell = (cellContent, colCode, rowCode) => cellContent.__tag("div", { clas: "app-tablebody__col", attr: ["contenteditable", true], data: [["colCode", colCode], ["uid", `[${colCode}::${rowCode}]`], ["value", ""]] });
