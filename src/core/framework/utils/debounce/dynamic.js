const setToDynamic = (interv, fn, args) => {
    clearInterval(interv);
    return fn(...args);
};

export const dynamic = fn => {
    let interv;
    return (...args) => {
        if (interv) clearInterval(interv);
        return setInterval(setToDynamic.bind(null, interv, fn, args), 1000);
    };
};
