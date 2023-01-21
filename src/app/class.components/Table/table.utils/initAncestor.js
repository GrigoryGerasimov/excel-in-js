import { ErrorDOM } from "@framework/utils/errors/ErrorDOM";
import { $ } from "@framework/CoreDOM";

export const initAncestor = target => {
    if (!target) new ErrorDOM("Please provide a valid target to initiate the class ancestor").throw();

    return target.dataset.resize === "col" ? $(target).ancestor(`[data-colcode]`) : target.dataset.resize === "row" ? $(target).ancestor(`[data-type="row"]`) : null;
};
