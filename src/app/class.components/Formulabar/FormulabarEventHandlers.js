import { EventHandler } from "@framework/EventHandler";

export class FormulabarEventHandlers extends EventHandler {
    onInput(evt) {
        console.log(evt.target.textContent.trim());
    }

    onClick(evt) {
        console.log("Click done. Here is the triggered click event: ", evt);
    }
}
