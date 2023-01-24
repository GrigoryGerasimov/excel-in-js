import { $ } from "@framework/CoreDOM";

const findRelatedTarget = (ancestor, col, row) => ancestor.findOne(`[data-uid="[${col}::${row}]"]`);

export const getRelatedTargets = (trgt, ancestor) => {
    const { col, row } = $(trgt).uid({ isParseRequired: true });

    const relatedTargetLeft = findRelatedTarget(ancestor, col - 1, row);
    const relatedTargetRight = findRelatedTarget(ancestor, col + 1, row);
    const relatedTargetUpwards = findRelatedTarget(ancestor, col, row - 1);
    const relatedTargetDownwards = findRelatedTarget(ancestor, col, row + 1);

    return { relatedTargetLeft, relatedTargetRight, relatedTargetUpwards, relatedTargetDownwards };
};
