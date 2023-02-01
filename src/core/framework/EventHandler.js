import { getEventMethodName } from "@framework/utils/namings/getEventMethodName";

export class EventHandler {
    #handlerName;
    static _self;
    static _store;

    constructor(evtListener, context, emitter, store) {
        this.#handlerName = getEventMethodName(evtListener);
        EventHandler._self = context || null;
        EventHandler._emitter = emitter || {};
        EventHandler._store = store || {};
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
