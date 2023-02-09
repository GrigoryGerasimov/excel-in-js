import { getEventMethodName } from "@framework/utils/namings/getEventMethodName";
import { DEBOUNCE_TIMELAPSE_LARGER } from "@/app/utils/constants/app.constants";
import { debounce } from "@framework/utils/debounce/debounce";

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
        this[this.#handlerName] = this.#handlerName === "onInput" ? debounce(this[this.#handlerName].bind(this), DEBOUNCE_TIMELAPSE_LARGER) : this[this.#handlerName].bind(this);
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
