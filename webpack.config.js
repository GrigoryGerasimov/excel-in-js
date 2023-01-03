const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const { generateFilename } = require("./webpack.utils/generateFilename");
const { definePlugins } = require("./webpack.utils/definePlugins");

module.exports = env => ({
    mode: env.development ? "development" : "production",
    target: "web",
    context: path.resolve(__dirname, "src"),
    entry: {
        app: ["core-js/stable", "regenerator-runtime/runtime", "./app.js"]
    },
    output: {
        filename: generateFilename("js", env),
        path: path.resolve(__dirname, "bundle"),
        clean: true
    },
    resolve: {
        extensions: [".js", "json"],
        alias: {
            "@": path.resolve(__dirname, "src"),
            "@/core": path.resolve(__dirname, "src", "core")
        }
    },
    devServer: {
        port: 5000,
        open: true,
        hot: true,
        watchFiles: "./"
    },
    devtool: env.development && "source-map",
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/gi,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            },
            {
                test: /\.m?js$/gi,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ]
    },
    plugins: definePlugins(
        env,
        [
            new HtmlWebpackPlugin({
                template: "./app.html",
                filename: "index.html"
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, "src/assets/favicon/Carlosjj-Microsoft-Office-2013-Excel.ico"),
                        to: path.resolve(__dirname, "bundle")
                    }
                ]
            }),
            new MiniCssExtractPlugin({
                filename: generateFilename("css", env)
            })
        ],
        [new EslintWebpackPlugin()]
    )
});
