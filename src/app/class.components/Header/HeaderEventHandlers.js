import { changeSheetName } from "@framework/redux/actions/Action";
import { EventHandler } from "@framework/EventHandler";

export class HeaderEventHandlers extends EventHandler {
    onInput(evt) {
        const currentSheetName = { sheetName: evt.target.value };
        HeaderEventHandlers.store.dispatch(changeSheetName(currentSheetName));
    }
}
