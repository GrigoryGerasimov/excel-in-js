import { EventHandler } from "@framework/EventHandler";

export class FormulabarEventHandlers extends EventHandler {
    onInput(evt) {
        console.log(evt.target.textContent.trim());
    }
}
