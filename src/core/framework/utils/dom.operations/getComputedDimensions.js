export const getComputedDimensions = elem => {
    const computedWidth = parseInt(window.getComputedStyle(elem).width);
    const computedHeight = parseInt(window.getComputedStyle(elem).height);
    const computedRightCoord = elem.getBoundingClientRect().right;
    const computedBottomCoord = elem.getBoundingClientRect().bottom;
    return { computedWidth, computedHeight, computedRightCoord, computedBottomCoord };
};
