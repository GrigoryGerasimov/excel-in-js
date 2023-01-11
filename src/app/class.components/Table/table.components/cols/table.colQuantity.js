const colQuantity = {
    from: 65,
    to: 90,
    [Symbol.iterator]() {
        return this;
    },
    next() {
        return this.from <= this.to ? { value: this.from++, done: false } : { value: null, done: true };
    }
};

const colCodes = [];

for (const colCode of colQuantity) colCodes.push(colCode);

export {
    colCodes
};
