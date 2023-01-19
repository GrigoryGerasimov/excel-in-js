import { cachingWrapperDOM } from "@framework/utils/decorator/cachingWrapperDOM";

export const setResizedDimensions = ({ target, resizedWidth, resizedHeight }) => {
    const processResize = (trgt, resWidth, resHeight) => { trgt.css({ width: resWidth, height: resHeight }); };
    return cachingWrapperDOM(processResize, target)(resizedWidth, resizedHeight);
};
