import { EventHandler } from "@framework/EventHandler";
import { $ } from "@framework/CoreDOM";

export class ToolbarEventHandlers extends EventHandler {
    onClick(evt) {
        if (evt.target.dataset.type === "btn-icon") {
            const params = evt.target.dataset.value ? JSON.parse(evt.target.dataset.value) : JSON.parse($(evt.target).ancestor("[data-value]").parent.dataset.value);
            for (const paramKey in params) {
                if (params.hasOwnProperty(paramKey)) {
                    ToolbarEventHandlers.emitter.emit("toolbarEventHandler/input", { [paramKey]: params[paramKey] });
                }
            }
        }
    }
}
