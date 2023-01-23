export const getRange = (start, end) => {
    if (start > end) [end, start] = [start, end];
    return new Array(end - start + 1).fill("").map((_, i) => start + i);
};
