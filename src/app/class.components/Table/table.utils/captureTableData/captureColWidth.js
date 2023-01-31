import { resizeTable } from "@framework/redux/actions/Action";
import { $ } from "@framework/CoreDOM";

export const captureColWidth = (store, target, mouseCoord) => {
    const colData = {
        colCode: target.dataset.colcode,
        width: $(target).computeResizedParams(mouseCoord).resWidth
    };
    store.dispatch(resizeTable(colData));
};
