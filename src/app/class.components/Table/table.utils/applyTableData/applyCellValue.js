import { $ } from "@framework/CoreDOM";

export const applyCellValue = (cell, value) => { $(cell).attr("data-value", value); };
