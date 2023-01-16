export const setResizedDimensions = ({ target, resizedWidth, resizedHeight, mouseDifferX, mouseDifferY }) => {
    if (resizedWidth) target.style.width = Math.trunc(resizedWidth + mouseDifferX) + "px";
    else if (resizedHeight) target.style.height = Math.trunc(resizedHeight + mouseDifferY) + "px";
};
