export class EventHandler {
    #handlerName;

    constructor(evtListener) {
        this.#handlerName = `on${evtListener[0].toUpperCase()}${evtListener.slice(1)}`;
    }

    handleEvent(evt) {
        this[this.#handlerName](evt);
    }

    onInput() {}

    onClick() {}
}
