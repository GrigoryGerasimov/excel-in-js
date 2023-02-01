import { EventHandler } from "@framework/EventHandler";

export class FormulabarEventHandlers extends EventHandler {
    onInput(evt) {
        const formulaInput = evt.target.textContent.trim();
        FormulabarEventHandlers.emitter.emit("formulabar/input", formulaInput);
    }

    onKeydown(evt) {
        if (evt.key === "Enter") {
            evt.preventDefault();
            evt.target.blur();
            FormulabarEventHandlers.emitter.emit("formulabar/focus");
        }
    }
}
