import { resizeTable } from "@framework/redux/actions/Action";

export const captureRowHeight = (store, target, mouseCoord) => {
    const rowData = {
        rowCode: target.findOne("[data-rowcode]").dataset.rowcode,
        height: target.computeResizedParams(mouseCoord).resHeight
    };
    store.dispatch(resizeTable(rowData));
};
