import { INITIAL_TOOLBAR_STATE } from "@/app/class.components/Toolbar/toolbar.constants/initialToolbarState";
import { convertStyles } from "@framework/utils/conversions/convertStyles";
import { changeCurrentStyles } from "@framework/redux/actions/Action";

export const captureCurrentStyles = (store, target) => {
    const currentStyles = convertStyles(target, INITIAL_TOOLBAR_STATE);
    store.dispatch(changeCurrentStyles({ currentStyles }));
};
