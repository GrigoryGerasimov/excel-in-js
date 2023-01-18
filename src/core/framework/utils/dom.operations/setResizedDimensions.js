import { cachingWrapperDOM } from "@framework/utils/decorator/cachingWrapperDOM";

export const setResizedDimensions = ({ target, resizedWidth, resizedHeight, mouseDifferX, mouseDifferY }) => {
    const processResize = (trgt, rWidth, rHeight, mDifX, mDifY) => {
        trgt.css({ width: Math.trunc(rWidth + mDifX) + "px", height: Math.trunc(rHeight + mDifY) + "px" });
    };
    return cachingWrapperDOM(processResize, target)(resizedWidth, resizedHeight, mouseDifferX, mouseDifferY);
};
