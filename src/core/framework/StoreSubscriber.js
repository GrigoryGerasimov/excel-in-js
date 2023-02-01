import { isEqual } from "@framework/utils/comparison/isEqual";

export class StoreSubscriber {
    constructor(store) {
        this.store = store;
        this.unsubscriber = null;
        this.prevState = this.store.getState();
    }

    applySubscription(components) {
        const currentState = this.store.getState.bind(this.store);
        this.unsubscriber = this.store.subscribe(() => {
            for (const stateKey of Object.keys(currentState())) {
                if (!isEqual(this.prevState[stateKey], currentState()[stateKey])) {
                    components.forEach(component => {
                        if (component.subscribes.includes(stateKey)) {
                            component.componentPropsUpdated({ [stateKey]: currentState()[stateKey] });
                        }
                    });
                }
            }
            this.prevState = currentState();
        });
    }

    cancelSubscription() {
        this.unsubscriber();
    }
}
