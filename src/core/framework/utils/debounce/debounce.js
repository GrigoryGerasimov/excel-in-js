const debounced = (timeout, fn, args) => {
    clearTimeout(timeout);
    return fn(...args);
};

export const debounce = (fn, wait) => {
    let timeout;
    return (...args) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(debounced.bind(null, timeout, fn, args), wait);
    };
};
