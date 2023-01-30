export const MixinReducer = {
    addNewProps(state, key, value) {
        const prevState = state;
        prevState[key] = value;
        return prevState;
    }
};
