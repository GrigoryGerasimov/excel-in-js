import { ErrorDOM } from "../errors/ErrorDOM";

export const convertFromCodePoints = codePoint => {
    codePoint = typeof codePoint === "number" ? Math.trunc(codePoint) : Number(codePoint);
    if (!codePoint || Number.isNaN(codePoint) || isNaN(codePoint) || !isFinite(codePoint)) new ErrorDOM("Please provide a valid code point").throw();
    return String.fromCodePoint(codePoint);
};
