import { isInStorage, removeFromStorage } from "@framework/services/localStorageService";
import { changeSheetName } from "@framework/redux/actions/Action";
import { EventHandler } from "@framework/EventHandler";
import { localStorageKeys } from "@/localStorageKeys";

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
                    if (intentionCheckPassed && isInStorage(localStorageKeys(HeaderEventHandlers.id).EXCEL_TABLE_STATE)) {
                        removeFromStorage(localStorageKeys(HeaderEventHandlers.id).EXCEL_TABLE_STATE);
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
