import { convertProps } from "@framework/utils/conversions/convertProps";

Object.prototype.__tag = function(tag, { id, clas, attr, data }) {
    const idName = convertProps(id);
    const className = convertProps(clas);
    const innerContent = Array.isArray(this) ? this.join("") : this;
    if (data) data = [...new Set(data.map(unit => Array.isArray(unit) ? `data-${unit[0]}="${unit[1]}"` : `data-${data[0]}="${data[1]}"`))];
    if (attr) attr = [...new Set(attr.map(unit => Array.isArray(unit) ? `${unit[0]}="${unit[1]}"` : `${attr[0]}="${attr[1]}"`))];

    return `<${tag} ${idName ? `id="${idName}"` : ""} ${className ? `class="${className}"` : ""} ${data ? data.join("") : ""} ${attr ? attr.join("") : ""}>${innerContent}</${tag}>`;
};
