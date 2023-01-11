import { ErrorDOM } from "@framework/utils/errors/ErrorDOM";
// import { getEventMethodName } from "@framework/utils/namings/getEventMethodName";
import { ComponentsEventHandlers } from "@/app/class.components/ComponentsEventHandlers";

export class DOMListener {
    constructor($root, options) {
        if (!$root) new ErrorDOM("Please provide element value").throw();
        this.$rootElem = $root;
        const { name, listeners } = options;
        Object.assign(this, { name, listeners });
    }

    subscribe() {
        for (const listener of this.listeners) {
            const componentEventHandler = new ComponentsEventHandlers[this.name](listener);
            if (!componentEventHandler) new ErrorDOM(`No corresponding method implemented for ${listener}`).throw();
            this.$rootElem.on(listener, componentEventHandler);
        }
    }

    unsubscribe() {
        // практическое задание

        // реализация по собственному коду
        this.listeners.forEach(listener => {
            const componentEventHandler = new ComponentsEventHandlers[this.name](listener);
            if (!componentEventHandler) new ErrorDOM(`No corresponding method implemented for ${listener}`).throw();
            this.$rootElem.off(listener, componentEventHandler);
        });

        // реализация по коду Владилена
        // this.listeners.forEach(listener => {
        //     const method = getEventMethodName(listener);
        //     if (!this[method]) throw new Error(`No method ${method} implemented for ${this.name}`);
        //     this.$rootElem.off(listener, this[method].bind(this));
        // });
        // Здесь я однако не учёл тот факт, что метод bind возвращает т.н. "экзотический объект",
        // поэтому у нас через привязку контекста каждый раз создаётся новая функция.
        // Следовательно, по реализации Владилена необходимо привязать контекст в отдельной константе,
        // напр. const handler = this[method].bind(this) либо же this[method] = this[method].bind(this),
        // чтобы впоследствии передавать одну и ту же возвращённую функцию в качестве хэндлера для установки/удаления прослушки событий

        // В своей собственной реализации через отдельный класс с методом handleEvent я в качестве хэндлера передаю
        // как раз объект handleEvent, вызывающий методы onInput и onClick класса FormulabarEventHandlers,
        // унаследованного от родительского EventHandler - здесь addEventListener и removeEventListener каждый раз
        // обращаются к одному и тому же родительскому методу handleEvent; новые функции во избежание потери контекста не создаются
    }
}
