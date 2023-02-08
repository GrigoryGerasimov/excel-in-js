export class ActionRouter {
    static get path() {
        return window.location.hash.slice(1);
    }

    static get param() {
        const parsedPath = ActionRouter.path.split("/");
        return parsedPath[parsedPath.length - 1];
    }
}
