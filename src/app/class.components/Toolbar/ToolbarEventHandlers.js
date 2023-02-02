import { EventHandler } from "@framework/EventHandler";

export class ToolbarEventHandlers extends EventHandler {
    onClick(evt) {
        console.log(evt.target.dataset.type);
    }
}
