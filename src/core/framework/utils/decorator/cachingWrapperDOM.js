export const cachingWrapperDOM = (fn, ...fnArgs) => {
    const cache = new Map();

    return function(...args) {
        if (cache.has(fn)) return cache.get(fn);

        const fnRes = fn(...fnArgs, ...args);

        cache.set(fn, fnRes);

        return fnRes;
    };
};
