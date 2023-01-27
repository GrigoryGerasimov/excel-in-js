import { ErrorDOM } from "@framework/utils/errors/ErrorDOM";

export class EventEmitter {
    constructor() {
        this.listeners = {};
    }

    emit(event, ...args) {
        if (!event) new ErrorDOM("Please provide a name of the event to emit at").throw();
        if (!Array.isArray(this.listeners[event])) new ErrorDOM("Please note that there is no listeners array at the provided event name").throw();
        this.listeners[event].forEach(listener => listener(args));
    }

    subscribe(event, fn) {
        if (!event || !fn) new ErrorDOM("Please provide an event name and function to subscribe").throw();
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(fn);
        return () => {
            this.listeners[event] = this.listeners[event].filter(listener => listener !== fn);
        };
    }
}
