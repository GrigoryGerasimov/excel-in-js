const generateFilename = (ext, env) => env?.development ? `[name].bundle.${ext}` : `[name].[contenthash].bundle.${ext}`;

module.exports = {
    generateFilename
};
