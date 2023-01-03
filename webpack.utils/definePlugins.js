const definePlugins = (env, pluginsArray, devPlugins) => env?.development ? [...pluginsArray, ...devPlugins] : pluginsArray;

module.exports = {
    definePlugins
};
