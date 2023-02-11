import { INITIAL_TOOLBAR_STATE } from "./toolbar.constants/initialToolbarState";
import { EventHandler } from "@framework/EventHandler";
import { $ } from "@framework/CoreDOM";

export class ToolbarEventHandlers extends EventHandler {
    onClick(evt) {
        const targetId = evt.target.dataset.id || evt.target.querySelector("[data-id]")?.dataset.id;

        switch (evt.target.dataset.type) {
            case "btn-icon": {
                if (targetId === "clear") {
                    ToolbarEventHandlers.emitter.emit("toolbar/input", INITIAL_TOOLBAR_STATE);
                } else {
                    const params = evt.target.dataset.value ? JSON.parse(evt.target.dataset.value) : JSON.parse($(evt.target).ancestor("[data-value]").parent.dataset.value);
                    for (const paramKey in params) {
                        if (params.hasOwnProperty(paramKey)) {
                            ToolbarEventHandlers.emitter.emit("toolbar/input", { [paramKey]: params[paramKey] });
                        }
                    }
                }
                break;
            }
            case "a-icon": {
                window.location.href = `mailto:""?subject=${window.location.hash}&body=${window.location.origin}/${window.location.hash}`;
                break;
            }
            case "key-icon": {
                if (targetId === "back") {
                    ToolbarEventHandlers.emitter.emit("toolbar/undo");
                } else if (targetId === "forth") {
                    ToolbarEventHandlers.emitter.emit("toolbar/redo");
                }
                break;
            }
        }
    }
}
