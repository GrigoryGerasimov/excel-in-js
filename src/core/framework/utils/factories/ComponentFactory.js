export function ComponentFactory(parentClass, className, htmlTemplate, name, listeners = []) {
    if (!new.target) return new ComponentFactory(parentClass, className, htmlTemplate, name, listeners);

    return class extends parentClass {
        static className = className;

        constructor($root) {
            super($root, { name, listeners });
        }

        toHTML() {
            return htmlTemplate;
        }

        initSubscription() {
            super.initSubscription();
        }
    };
}
