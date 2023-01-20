import { $ } from "@framework/CoreDOM";

export const initAncestor = target => target.dataset.resize === "col" ? $(target).ancestor(`[data-colcode]`) : target.dataset.resize === "row" ? $(target).ancestor(`[data-type="row"]`) : null;
