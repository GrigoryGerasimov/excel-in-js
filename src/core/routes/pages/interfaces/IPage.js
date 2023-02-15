import { ErrorDOM } from "@framework/utils/errors/ErrorDOM";

export class IPage {
    constructor($root) {
        this.$pageRoot = $root;
    }

    createRoot() {
        new ErrorDOM("Please note that the method createRoot in an interface-like class Page is an abstract one. Therefore, you are strongly requested to please override the same method in any child class!").throw();
    }

    onRender() {
        new ErrorDOM("Please note that the method onRender in an interface-like class Page is an abstract one. Therefore, you are strongly requested to please override the same method in any child class!").throw();
    }

    removeRoot() {
        new ErrorDOM("Please note that the method removeRoot in an interface-like class Page is an abstract one. Therefore, you are strongly requested to please override the same method in any child class!").throw();
    }
}
