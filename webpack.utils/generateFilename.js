const generateFilename = (ext, env) => env?.development ? `[id].bundle.${ext}` : `[id].[contenthash].bundle.${ext}`;

module.exports = {
    generateFilename
};
