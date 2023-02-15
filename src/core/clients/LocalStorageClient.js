import { setIntoStorage, getFromStorage, removeFromStorage } from "@framework/services/localStorageService";
import { ErrorDOM } from "@framework/utils/errors/ErrorDOM";
import { localStorageKeys } from "@/localStorageKeys";

export class LocalStorageClient {
    constructor(keyId) {
        this.keyCatalog = localStorageKeys(keyId);
    }

    create(key, prop) {
        if (!key) new ErrorDOM("Please provide a valid key to set into localStorage").throw();
        if (!prop) new ErrorDOM("Please provide a valid prop to set into localStorage").throw();
        setIntoStorage(this.keyCatalog[key], prop);
    }

    read(key) {
        if (!key) new ErrorDOM("Please provide a valid key to extract from localStorage").throw();
        return getFromStorage(this.keyCatalog[key]);
    }

    delete(key) {
        if (!key) new ErrorDOM("Please provide a valid key to extract from localStorage").throw();
        removeFromStorage(this.keyCatalog[key]);
    }
}
