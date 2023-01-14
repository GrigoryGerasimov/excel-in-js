import { convertProps } from "@framework/utils/conversions/convertProps";

Object.prototype.__tag = function(tag, { id, clas, attr, data }) {
    const idName = convertProps(id);
    const className = convertProps(clas);
    const innerContent = Array.isArray(this) ? this.join("") : this;

    return `<${tag} ${idName ? `id="${idName}"` : ""} ${className ? `class="${className}"` : ""} ${data ? `data-${data[0]}="${data[1]}"` : ""} ${attr ? `${attr[0]}="${attr[1]}"` : ""}>${innerContent}</${tag}>`;
};
