import { resizeTable } from "@framework/redux/actions/Action";
import { $ } from "@framework/CoreDOM";

export const captureColWidth = (store, target, pointerCoord) => {
    const colData = {
        colCode: target.dataset.colcode,
        width: $(target).computeResizedParams(pointerCoord).resWidth
    };
    store.dispatch(resizeTable(colData));
};
