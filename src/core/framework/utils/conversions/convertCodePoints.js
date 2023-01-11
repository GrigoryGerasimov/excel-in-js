import { ErrorDOM } from "@framework/utils/errors/ErrorDOM";

export const convertCodePoints = codePoint => {
    codePoint = typeof codePoint === "number" ? Math.trunc(codePoint) : Number.truncate(codePoint);
    if (!codePoint || Number.isNaN(codePoint) || isNaN(codePoint) || !isFinite(codePoint)) new ErrorDOM("Please provide a valid code point").throw();
    return String.fromCodePoint(codePoint);
};
