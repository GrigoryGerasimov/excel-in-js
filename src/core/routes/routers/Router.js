import { ErrorDOM } from "@framework/utils/errors/ErrorDOM";
import { ActionRouter } from "./ActionRouter";
import { $ } from "@framework/CoreDOM";

export class Router {
    constructor($selector, routes) {
        this.$selector = $selector;
        this.routes = routes;
        this.currentPage = null;
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
        if (!ActionRouter.path) return this.fixPage("dashboard");
        if (this.currentPage) this.currentPage.removeRoot();
        try {
            const Page = this.routes[ActionRouter.pathName];
            const currentPage = new Page(this.$selector);
            this.currentPage = currentPage;
            currentPage.createRoot();
        } catch (err) {
            this.fixPage(404);
            new ErrorDOM(`Oops! Unfortunately, you are facing a routing issue. Further details here: ${err.message} ${err.stack}. Most probably, the page you are looking for does not exist. Please kindly re-check the name of the requested page and try again.`).throw();
        }
    }

    fixPage(pageKey) {
        return new this.routes[pageKey].prototype.constructor(this.$selector).createRoot();
    }

    changeRoutes() {
        if ($(this.$selector).parent.children.length) {
            $(this.$selector).parent.children.forEach(child => child.remove());
        }
        this.definePage();
    }
}
