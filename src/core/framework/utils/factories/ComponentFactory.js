export function ComponentFactory(parentClass, className, htmlTemplate, name, listeners = [], subscribes = []) {
    if (!new.target) return new ComponentFactory(parentClass, className, htmlTemplate, name, listeners, subscribes);

    return class extends parentClass {
        static className = className;

        constructor($root) {
            super($root, { name, listeners, subscribes });
        }

        toHTML(args) {
            return htmlTemplate(args);
        }

        initSubscription() {
            super.initSubscription();
        }

        endSubscription() {
            super.endSubscription();
        }
    };
}
