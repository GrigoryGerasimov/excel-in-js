import "@framework/object.native.extentions";
import { colCodes } from "./table.colQuantity";
import { convertCodePoints } from "@framework/utils/conversions/convertCodePoints";
import { colResizeBlock } from "./table.pseudo.colResize";

export const createTableColHeaders = () => colCodes
    .map(convertCodePoints)
    .map(h => (h + colResizeBlock).__tag("div", { clas: "app-tablebody__col-head", attr: "contenteditable" }))
    .join("");
