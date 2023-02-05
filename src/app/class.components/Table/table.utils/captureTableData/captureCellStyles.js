import { INITIAL_TOOLBAR_STATE } from "@/app/class.components/Toolbar/toolbar.constants/initialToolbarState";
import { convertStyles } from "@framework/utils/conversions/convertStyles";
import { changeCellStyles } from "@framework/redux/actions/Action";
import { $ } from "@framework/CoreDOM";

export const captureCellStyles = (store, target) => {
    const cellStyles = {
        uid: $(target).uid({ isParseRequired: false }),
        styles: convertStyles(target, INITIAL_TOOLBAR_STATE)
    };
    store.dispatch(changeCellStyles(cellStyles));
};
