import { MixinDOM } from "@/utils/mixins/MixinDOM";

class CoreDOM {}

export const $ = () => {
    return new CoreDOM();
};

Object.assign(CoreDOM.prototype, MixinDOM);
