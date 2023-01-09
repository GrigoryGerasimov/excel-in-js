const defineOptimization = (processEnv, minimizerPlugins) => {
    const config = {
        chunkIds: false,
        nodeEnv: processEnv || "development"
    };

    if (config.nodeEnv === "production") config.minimizer = minimizerPlugins;

    return config;
};

module.exports = {
    defineOptimization
};
