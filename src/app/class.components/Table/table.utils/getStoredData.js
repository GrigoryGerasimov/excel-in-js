import { applyColWidth, applyRowHeight, applyCellData, applyCellStyles, applyCellValue } from "./applyTableData";

export const getStoredData = ({ type, data, dataset, coreElem }) => {
    const dataKeys = Object.keys(data);

    for (const key of dataKeys) {
        coreElem.findSome(`[data-${dataset}="${key}"]`).forEach(elem => {
            switch (type) {
                case "colsize": return applyColWidth(elem, data[key]);
                case "rowsize": return applyRowHeight(elem, data[key]);
                case "celldata": return applyCellData(elem, data[key]);
                case "cellstyles": return applyCellStyles(elem, data[key]);
                case "cellvalue": return applyCellValue(elem, data[key]);
            }
        });
    }
};
