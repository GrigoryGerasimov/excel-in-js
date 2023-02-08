import { ErrorDOM } from "@framework/utils/errors/ErrorDOM";
import { ActionRouter } from "./ActionRouter";
import { $ } from "@framework/CoreDOM";

export class Router {
    constructor($selector, routes) {
        this.$selector = $selector;
        this.routes = routes;
        this.changeRoutes = this.changeRoutes.bind(this);
    }

    init() {
        window.addEventListener("hashchange", this.changeRoutes);
        this.definePage();
    }

    end() {
        window.removeEventListener("hashchange", this.changeRoutes);
    }

    definePage() {
        try {
            const Page = this.routes[ActionRouter.path];
            const currentPage = new Page(this.$selector);
            currentPage.createRoot();
        } catch (err) {
            new this.routes.dashboard.prototype.constructor(this.$selector).createRoot();
            new ErrorDOM(`Oops! Unfortunately, you are facing a routing issue. Further details here: ${err.message}. Most probably, the page you are looking for does not exist. Please kindly re-check the name of the requested page and try again.`).throw();
        }
    }

    changeRoutes() {
        if ($(this.$selector).parent.children.length) {
            $(this.$selector).parent.children.forEach(child => child.remove());
        }
        this.definePage();
    }
}
