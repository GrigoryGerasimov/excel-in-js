import { getEventMethodName } from "@framework/utils/namings/getEventMethodName";

export class EventHandler {
    #handlerName;

    constructor(evtListener, context, emitter, store, excelId, processor) {
        this.#handlerName = getEventMethodName(evtListener);
        EventHandler._self = context || null;
        EventHandler._emitter = emitter || {};
        EventHandler._store = store || {};
        EventHandler._excelId = excelId;
        EventHandler._processor = processor;
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

    static get processor() {
        return EventHandler._processor;
    }

    handleEvent(evt) {
        this[this.#handlerName](evt);
    }
}
