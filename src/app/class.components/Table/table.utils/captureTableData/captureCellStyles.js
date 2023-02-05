import { INITIAL_TOOLBAR_STATE } from "@/app/class.components/Toolbar/toolbar.constants/initialToolbarState";
import { changeCellStyles } from "@framework/redux/actions/Action";

export const captureCellStyles = (store, target) => {
    const cellStyles = Object.keys(INITIAL_TOOLBAR_STATE).reduce((acc, val) => {
        !target.style[val] ? acc[val] = INITIAL_TOOLBAR_STATE[val] : acc[val] = target.style[val];
        return acc;
    }, {});
    store.dispatch(changeCellStyles({ cellStyles }));
};
