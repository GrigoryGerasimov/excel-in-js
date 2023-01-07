import { $ } from "@framework/CoreDOM";

export class Excel {
    constructor(id, options) {
        this.$rootElem = document.querySelector(id);
        this.components = options.components;
    }

    render() {
        const $appNode = $(this.$rootElem).createAndAppend({ tag: "div", className: "app" }).makeParent();

        this.components = this.components.map(Component => {
            const $componentNode = $($appNode).createAndAppend({ tag: "div", className: Component.className }).makeParent();
            const componentInstance = new Component($componentNode.parent);
            $componentNode.pHTML = componentInstance.toHTML();
            return componentInstance;
        });

        for (const Component of this.components) {
            Component.initSubscription();
        }
    }
}
