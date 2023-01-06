export const MixinDOM = {
    createNode({ tag, className, content }) {
        const node = document.createElement(tag);
        if (className) node.classList.add(className);
        if (content) node.textContent = content;
        return node;
    }
};
