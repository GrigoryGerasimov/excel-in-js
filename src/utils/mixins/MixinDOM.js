export const MixinDOM = {
    createNode(parent, node, content) {
        const child = document.createElement(node);
        child.textContent = content;
        parent.appendChild(child);
    }
};
