export const convertIntoCodePoints = char => {
    char = typeof char === "string" ? char : Array.isArray(char) ? char.join() : char.toString();
    return char.codePointAt(0);
};
