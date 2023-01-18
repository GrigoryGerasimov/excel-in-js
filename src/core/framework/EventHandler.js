import { getEventMethodName } from "@framework/utils/namings/getEventMethodName";

export class EventHandler {
    #handlerName;
    static _self;

    constructor(evtListener, context) {
        this.#handlerName = getEventMethodName(evtListener);
        EventHandler._self = context || null;
    }

    static get self() {
        return EventHandler._self;
    }

    handleEvent(evt) {
        this[this.#handlerName](evt);
    }
}
