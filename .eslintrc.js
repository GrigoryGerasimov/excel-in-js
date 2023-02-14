module.exports = {
    parser: "@babel/eslint-parser",
    parserOptions: {
        babelOptions: {
            configFile: "./babel.config.json"
        }
    },
    env: {
        browser: true,
        node: true,
        es6: true,
        "jest/globals": true
    },
    extends: ["eslint:recommended", "standard"],
    plugins: ["jest"],
    rules: {
        indent: ["error", 4, { SwitchCase: 1 }],
        semi: ["error", "always"],
        "space-before-function-paren": ["error", { named: "never", asyncArrow: "never", anonymous: "never" }],
        quotes: ["error", "double", { allowTemplateLiterals: true }],
        "multiline-ternary": ["error", "never"],
        "no-setter-return": ["off"],
        "no-useless-constructor": ["off"],
        "no-extend-native": ["off"],
        "no-prototype-builtins": ["off"],
        "no-new-func": ["off"],
        "no-new-wrappers": ["off"]
    }
};
