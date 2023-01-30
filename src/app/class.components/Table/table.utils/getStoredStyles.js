import { applyColWidth, applyRowHeight } from "./applyTableSize";

export const getStoredStyles = ({ styles, dataset, coreElem }) => {
    const stylesKeys = Object.keys(styles);

    for (const key of stylesKeys) {
        coreElem.findSome(`[data-${dataset}="${key}"]`).forEach(elem => dataset === "colcode" ? applyColWidth(elem, styles[key]) : applyRowHeight(elem, styles[key]));
    }
};
