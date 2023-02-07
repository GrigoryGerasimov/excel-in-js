import { ActionRouter } from "./ActionRouter";

export class Router {
    constructor(selector, routes) {
        this.$selector = selector;
        this.routes = routes;
        this.changeRoutes = this.changeRoutes.bind(this);

        this.init();
    }

    init() {
        window.addEventListener("hashchange", this.changeRoutes);
    }

    end() {
        window.removeEventListener("hashchange", this.changeRoutes);
    }

    changeRoutes() {
        console.log(ActionRouter.path);
    }
}
