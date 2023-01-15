export const setResizedDimensions = ({ target, resizedWidth, resizedHeight, mouseDifferX, mouseDifferY }) => {
    if (resizedWidth) target.style.width = resizedWidth + mouseDifferX + "px";
    else if (resizedHeight) target.style.height = resizedHeight + mouseDifferY + "px";
};
