import { getEventMethodName } from "@framework/utils/namings/getEventMethodName";

export class EventHandler {
    #handlerName;
    static _self;
    static _store;

    constructor(evtListener, context, emitter, store, excelId) {
        this.#handlerName = getEventMethodName(evtListener);
        EventHandler._self = context || null;
        EventHandler._emitter = emitter || {};
        EventHandler._store = store || {};
        EventHandler._excelId = excelId;
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

    static get id() {
        return EventHandler._excelId;
    }

    handleEvent(evt) {
        this[this.#handlerName](evt);
    }
}
