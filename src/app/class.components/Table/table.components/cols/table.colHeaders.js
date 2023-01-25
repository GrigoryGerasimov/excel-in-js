import "@framework/object.native.extentions";
import { colCodes } from "./table.colQuantity";
import { convertFromCodePoints } from "@framework/utils/conversions/convertFromCodePoints";

export const createTableColHeaders = colHeadersAddtionalContent => colCodes
    .map(hcode => [convertFromCodePoints(hcode), ...colHeadersAddtionalContent].__tag("div", { clas: "app-tablebody__col-head", data: ["colCode", hcode] }))
    .join("");
