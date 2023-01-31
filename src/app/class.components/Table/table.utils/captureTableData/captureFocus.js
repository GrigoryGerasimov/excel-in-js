import { captureTableFocus } from "@framework/redux/actions/Action";
import { $ } from "@framework/CoreDOM";

export const captureFocus = (store, target) => {
    const currentFocusTargetUid = { focusTargetUid: $(target).uid({ isParseRequired: false }) };
    store.dispatch(captureTableFocus(currentFocusTargetUid));
};
