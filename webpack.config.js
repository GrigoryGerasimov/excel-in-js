const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = env => ({
    mode: env.development ? "development" : "production",
    context: path.resolve(__dirname, "src"),
    entry: {
        app: ["core-js/stable", "regenerator-runtime/runtime", "./app.js"]
    },
    output: {
        filename: "[name].[contenthash].bundle.js",
        path: path.resolve(__dirname, "bundle")
    },
    resolve: {
        extensions: [".js", "json"],
        alias: {
            "@": path.resolve(__dirname, "src"),
            "@/core": path.resolve(__dirname, "src", "core") 
        }
    },
    module: {
        rules: [
            {
                test: /\.s[a,c]ss$/gi,
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
    plugins: [
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
            filename: "[name].[contenthash].bundle.css"
        })
    ]
});
