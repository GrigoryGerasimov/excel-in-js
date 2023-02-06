import { getEventMethodName } from "@framework/utils/namings/getEventMethodName";
import { DEBOUNCE_MS } from "@/app/utils/constants/app.constants";
import { debounce } from "@framework/utils/debounce/debounce";

export class EventHandler {
    #handlerName;
    static _self;
    static _store;

    constructor(evtListener, context, emitter, store) {
        this.#handlerName = getEventMethodName(evtListener);
        EventHandler._self = context || null;
        EventHandler._emitter = emitter || {};
        EventHandler._store = store || {};
        this.handleEvent = debounce(this.handleEvent.bind(this), DEBOUNCE_MS);
    }

    static get self() {
        return EventHandler._self;
    }

    static get emitter() {
        return EventHandler._emitter;
    }

    static get store() {
        return EventHandler._store;
    }

    handleEvent(evt) {
        this[this.#handlerName](evt);
    }
}
