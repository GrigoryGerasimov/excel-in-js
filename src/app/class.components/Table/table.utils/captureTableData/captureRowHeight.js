import { resizeTable } from "@framework/redux/actions/Action";

export const captureRowHeight = (store, target, pointerCoord) => {
    const rowData = {
        rowCode: target.findOne("[data-rowcode]").dataset.rowcode,
        height: target.computeResizedParams(pointerCoord).resHeight
    };
    store.dispatch(resizeTable(rowData));
};
