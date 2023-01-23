import { getRange } from "./getRange";
import { $ } from "@framework/CoreDOM";

export const generateSelectableGroup = (currentTarget, relatedTarget, ancestor) => {
    const current = $(currentTarget).uid({ isParseRequired: true });
    const related = $(relatedTarget).uid({ isParseRequired: true });

    const colRange = getRange(current.col, related.col);
    const rowRange = getRange(current.row, related.row);

    const uids = colRange.reduce((acc, col) => {
        rowRange.forEach(row => acc.push(`[${col}::${row}]`));
        return acc;
    }, []);

    return uids.map(uid => ancestor.findOne(`[data-uid="${uid}"]`));
};
