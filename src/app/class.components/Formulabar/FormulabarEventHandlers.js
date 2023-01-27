import { EventHandler } from "@framework/EventHandler";
import { DOMListener } from "@core/DOMListener";

export class FormulabarEventHandlers extends EventHandler {
    onInput(evt) {
        const formulaInput = evt.target.textContent.trim();
        DOMListener.emitter.emit("formulabar/input", formulaInput);
    }

    onKeydown(evt) {
        if (evt.key === "Enter") {
            evt.preventDefault();
            evt.target.blur();
            DOMListener.emitter.emit("formulabar/focus");
        }
    }
}
