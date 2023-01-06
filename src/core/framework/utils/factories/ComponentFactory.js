export function ComponentFactory(parentClass, className, htmlTemplate) {
    if (!new.target) return new ComponentFactory(parentClass, className, htmlTemplate);

    return class extends parentClass {
        static className = className;

        toHTML() {
            return htmlTemplate;
        }
    };
}
