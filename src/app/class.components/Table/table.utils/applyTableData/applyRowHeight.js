import { $ } from "@framework/CoreDOM";

export const applyRowHeight = (row, height) => $(row).ancestor(`[data-type="row"]`).css({ height });
