import { getEventMethodName } from "@framework/utils/namings/getEventMethodName";
import { ErrorDOM } from "@framework/utils/errors/ErrorDOM";

export function initHandlers(handlers, context) {
    if (!handlers || !Array.isArray(handlers)) new ErrorDOM("Please provide an array of handlers").throw();
    if (!context) new ErrorDOM("Please provide a valid context for the event handler methods").throw();

    function inner(handlers) {
        for (const handler of handlers) document[`on${handler}`] = this[getEventMethodName(handler)];
    }

    return inner.bind(context)(handlers);
}
