const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const { generateFilename } = require("./webpack.utils/generateFilename");
const { definePlugins } = require("./webpack.utils/definePlugins");

const multipleStylesheetsBundlerConfig = (env, argv) => ({
    mode: argv?.mode || "development",
    context: path.resolve(__dirname, "src/assets/scss"),
    entry: {
        app: "./app.scss",
        dashboard: "./dashboard.scss"
    },
    output: {
        filename: "[name].[contenthash].bundle.js",
        path: path.resolve(__dirname, "bundle")
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/gi,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": argv?.mode ? JSON.stringify(argv.mode) : "development"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].bundle.css"
        })
    ]
});

const webpackMainConfig = (env, argv) => ({
    mode: env?.development ? "development" : "production",
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
    optimization: {
        chunkIds: false,
        nodeEnv: !env && "development"
    },
    resolve: {
        extensions: [".js", "json"],
        alias: {
            "@": path.resolve(__dirname, "src"),
            "@core": path.resolve(__dirname, "src", "core"),
            "@framework": path.resolve(__dirname, "src", "core", "framework")
        }
    },
    devServer: {
        port: 5000,
        open: true,
        hot: true,
        watchFiles: "./",
        historyApiFallback: true
    },
    devtool: env?.development && "source-map",
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/gi,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            },
            {
                test: /\.csv$/gi,
                use: ["csv-loader"]
            },
            {
                test: /\.m?js$/gi,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: ["@babel/plugin-proposal-class-properties"]
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
            }),
            new webpack.ids.DeterministicChunkIdsPlugin({
                maxLength: 7
            })
        ],
        [new EslintWebpackPlugin()]
    )
});

module.exports = (env, argv) => {
    return argv?.mode ? [webpackMainConfig(env, argv), multipleStylesheetsBundlerConfig(env, argv)] : webpackMainConfig(env, argv);
};
