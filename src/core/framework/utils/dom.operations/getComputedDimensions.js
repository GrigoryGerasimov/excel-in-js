export const getComputedDimensions = elem => {
    const computedWidth = parseInt(window.getComputedStyle(elem).width);
    const computedHeight = parseInt(window.getComputedStyle(elem).height);
    return { computedWidth, computedHeight };
};
