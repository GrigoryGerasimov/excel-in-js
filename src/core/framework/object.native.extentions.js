import { convertProps } from "@framework/utils/conversions/convertProps";

Object.prototype.__tag = function(tag, { id, clas, attr }) {
    const idName = convertProps(id);
    const className = convertProps(clas);
    const attributeName = convertProps(attr);

    return `<${tag} ${idName ? `id="${idName}"` : ""} ${className ? `class="${className}"` : ""} ${attributeName}>${this}</${tag}>`;
};
