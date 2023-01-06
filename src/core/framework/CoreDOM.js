import { MixinDOM } from "@framework/utils/mixins/MixinDOM";

class CoreDOM {}

export const $ = new CoreDOM();

Object.assign(CoreDOM.prototype, MixinDOM);
