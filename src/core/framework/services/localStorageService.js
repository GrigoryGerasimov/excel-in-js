import { ErrorDOM } from "@framework/utils/errors/ErrorDOM";

const setIntoStorage = (key, payload) => {
    if (!key || !payload) new ErrorDOM("Please provide the required key and payload to set into the localstorage").throw();
    localStorage.setItem(key, JSON.stringify(payload));
};

const getFromStorage = key => {
    if (!key) new ErrorDOM("Please provide the required key to read at from the localstorage").throw();
    return JSON.parse(localStorage.getItem(key));
};

const removeFromStorage = key => {
    if (!key) new ErrorDOM("Please provide the required key to remove at from the localstorage").throw();
    localStorage.removeItem(key);
};

const isInStorage = key => {
    if (!key) new ErrorDOM("Please provide the required key to check in the localstorage").throw();
    return !!localStorage[key];
};

const getLocalStorageKeys = () => {
    const localStorageKeys = [];
    for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key) && /^excel::/.test(key)) {
            localStorageKeys.push(key);
        }
    }
    return localStorageKeys;
};

export {
    setIntoStorage, getFromStorage, removeFromStorage, isInStorage, getLocalStorageKeys
};
