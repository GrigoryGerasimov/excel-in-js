import { actionTypes } from "./actionTypes";

class Action {
    constructor(type, payload) {
        this.type = type;
        this.payload = payload;
    }
}

export const init = new Action(actionTypes.INIT);
