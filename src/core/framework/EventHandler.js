import { getEventMethodName } from "@framework/utils/namings/getEventMethodName";

export class EventHandler {
    #handlerName;

    constructor(evtListener) {
        this.#handlerName = getEventMethodName(evtListener);
    }

    handleEvent(evt) {
        this[this.#handlerName](evt);
    }

    onInput() {}

    onClick() {}
}
