import { $ } from "@framework/CoreDOM";
import { IPage } from "./IPage";
import "@/assets/scss/404.scss";

export class PageNotFound extends IPage {
    constructor($root) {
        super($root);
    }

    createRoot() {
        $(this.$pageRoot).createAndAppend({ tag: "div", className: "notfound" }).cHTML = "<p>Oops, the page you are looking for could not be found...</p>";
    }

    afterRender() {}

    removeRoot() {}
}
