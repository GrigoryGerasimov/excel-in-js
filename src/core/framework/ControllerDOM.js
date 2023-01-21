import { ErrorDOM } from "@framework/utils/errors/ErrorDOM";

export class ControllerDOM {
    constructor(target) {
        if (!target) new ErrorDOM("Please provide a valid target to initiate the controller root ancestor").throw();
        this._target = target;
    }
}
