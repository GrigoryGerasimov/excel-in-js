export const createPropsObj = state => {
    return ({ path, prop, currentValue, initialValue }) => ({
        isPropUpdated: state?.[prop] === currentValue,
        path,
        get isActive() {
            return this.isPropUpdated;
        },
        get value() {
            const self = this;
            return {
                get [prop]() {
                    return self.isPropUpdated ? initialValue : currentValue;
                }
            };
        }
    });
};
