import { EventHandler } from "@framework/EventHandler";

export class ToolbarEventHandlers extends EventHandler {
    onClick(evt) {
        if (evt.target.dataset.type === "btn-icon" && evt.target.dataset.value) {
            const params = JSON.parse(evt.target.dataset.value);
            for (const paramKey in params) {
                if (params.hasOwnProperty(paramKey)) {
                    ToolbarEventHandlers.emitter.emit("toolbarEventHandler/input", { [paramKey]: params[paramKey] });
                }
            }
        }
    }
}
