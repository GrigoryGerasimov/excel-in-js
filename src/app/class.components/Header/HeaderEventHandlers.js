import { changeSheetName } from "@framework/redux/actions/Action";
import { localStorageConstants } from "@/localStorageKeys";
import { EventHandler } from "@framework/EventHandler";

export class HeaderEventHandlers extends EventHandler {
    onInput(evt) {
        const currentSheetName = { sheetName: evt.target.value };
        HeaderEventHandlers.store.dispatch(changeSheetName(currentSheetName));
    }

    onClick(evt) {
        if (Object.keys(evt.target.dataset).length) {
            switch (evt.target.dataset.id) {
                case "delete": {
                    const intentionCheckPassed = confirm("Are you sure you want to remove the current Excel sheet? Please note that once you delete it, all the data will be lost. Should we proceed?");
                    if (intentionCheckPassed) {
                        HeaderEventHandlers.processor.remove(localStorageConstants.EXCEL_TABLE_STATE);
                    }
                    // falls through
                }
                case "close": {
                    window.location.href = "#dashboard";
                    break;
                }
                default: return false;
            }
        }
    }
}
