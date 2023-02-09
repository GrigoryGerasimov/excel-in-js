export const convertToArr = item => !Array.isArray(item) ? typeof item === "object" ? Object.keys(item) : [...item] : item;
