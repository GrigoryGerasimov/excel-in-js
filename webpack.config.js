const { defineOptimization } = require("./webpack.utils/defineOptimization");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const { generateFilename } = require("./webpack.utils/generateFilename");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { definePlugins } = require("./webpack.utils/definePlugins");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

const isProd = process.env.NODE_ENV === "production";
const isDev = !isProd;

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
        new webpack.ProgressPlugin(),
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
    optimization: defineOptimization(process.env.NODE_ENV, [new TerserWebpackPlugin(), new CssMinimizerWebpackPlugin()]),
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
        hot: isDev,
        watchFiles: "./",
        historyApiFallback: isDev
    },
    devtool: isDev && "source-map",
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/gi,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.csv$/gi,
                use: ["csv-loader"]
            },
            {
                test: /\.m?js$/gi,
                exclude: /node_modules/,
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
                filename: "index.html",
                minify: {
                    collapseWhitespace: isProd
                }
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
            }),
            new webpack.ProgressPlugin(),
            new webpack.DefinePlugin({
                "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
            })
        ],
        [new EslintWebpackPlugin(), new BundleAnalyzerPlugin()]
    )
});

module.exports = (env, argv) => {
    return argv?.mode ? [webpackMainConfig(env, argv), multipleStylesheetsBundlerConfig(env, argv)] : webpackMainConfig(env, argv);
};
