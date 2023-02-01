export const isEqual = (a, b) => typeof a === "object" && typeof b === "object" ? JSON.stringify(a) === JSON.stringify(b) : a === b;
