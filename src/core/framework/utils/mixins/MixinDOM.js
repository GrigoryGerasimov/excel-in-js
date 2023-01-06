export const MixinDOM = {
    createNode({ tag, className, content }) {
        const node = document.createElement(tag);
        if (className) node.classList.add(className);
        if (content) node.innerHTML = content;
        return node;
    },
    validateSelector(payload) {
        return typeof payload === "string" ? document.querySelector(payload) : payload;
    }
};
