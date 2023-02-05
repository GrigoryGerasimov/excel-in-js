import { applyColWidth, applyRowHeight, applyCellData, applyCellStyles } from "./applyTableData";

export const getStoredData = ({ data, dataset, coreElem }) => {
    const dataKeys = Object.keys(data);

    for (const key of dataKeys) {
        coreElem.findSome(`[data-${dataset}="${key}"]`).forEach(elem => {
            switch (dataset) {
                case "colcode": return applyColWidth(elem, data[key]);
                case "rowcode": return applyRowHeight(elem, data[key]);
                case "uid": {
                    return typeof data[key] === "object" ? applyCellStyles(elem, data[key]) : applyCellData(elem, data[key]);
                }
            }
        });
    }
};
