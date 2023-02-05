export const convertStyles = (trgt, initState) => Object.keys(initState).reduce((acc, val) => {
    !trgt.style[val] ? acc[val] = initState[val] : acc[val] = trgt.style[val];
    return acc;
}, {});
