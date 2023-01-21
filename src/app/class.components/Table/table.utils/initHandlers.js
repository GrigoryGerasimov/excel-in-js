import { getEventMethodName } from "@framework/utils/namings/getEventMethodName";
import { ErrorDOM } from "@framework/utils/errors/ErrorDOM";

export function initHandlers(context = null, handlers) {
    if (!handlers || !Array.isArray(handlers)) new ErrorDOM("Please provide an array of handlers").throw();

    function inner(handlers) {
        for (const handler of handlers) document[`on${handler}`] = this[getEventMethodName(handler)];
    }

    return inner.bind(context)(handlers);
}
