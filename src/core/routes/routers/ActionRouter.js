export class ActionRouter {
    constructor() {}

    static get path() {
        return window.location.hash.slice(1);
    }
}
