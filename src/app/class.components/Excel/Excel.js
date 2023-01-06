import { $ } from "@framework/CoreDOM";

export class Excel {
    constructor(id, options) {
        this.$rootElem = document.querySelector(id);
        this.components = options.components;
    }

    render() {
        const $appNode = $(this.$rootElem).createAndInsert({ tag: "div", className: "app" });

        for (const Component of this.components) {
            $appNode
                .create({
                    tag: "div",
                    className: Component.className
                })
                .insert({ shouldAppend: true })
                .insert({
                    parent: $appNode.$newElem,
                    node: new Component($appNode.$newElem).toHTML(),
                    shouldAppend: false,
                    isElement: false,
                    place: "beforeend"
                });
        }
    }
}
