import { changeCellValue } from "@framework/redux/actions/Action";
import { $ } from "@framework/CoreDOM";

export const captureCellValue = (store, target) => {
    const cellValue = {
        uid: $(target).uid({ isParseRequired: false }),
        value: target.dataset.value
    };
    store.dispatch(changeCellValue(cellValue));
};
