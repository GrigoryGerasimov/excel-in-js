import { changeCellData } from "@framework/redux/actions/Action";
import { $ } from "@framework/CoreDOM";

export const captureCellData = (store, target) => {
    const cellData = {
        uid: $(target).uid({ isParseRequired: false }),
        input: $(target).pText
    };
    store.dispatch(changeCellData(cellData));
};
