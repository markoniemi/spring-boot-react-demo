import Dotenv from "dotenv-webpack";
import * as path from "path";
import webpack = require("webpack");

const webpackConfig: webpack.Configuration = {
    mode: "development",
    devtool: "source-map",
    entry: {
        app: [
            "babel-polyfill",
            "react-hot-loader/patch",
            "./src/index",
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name].js",
    },
    module: {
        rules: [
            {test: /\.tsx?$/, use: ["ts-loader"]},
            {test: /\.js$/, exclude: /node_modules/, use: ["babel-loader"]},
            {test: /\.css$/, use: ["style-loader","css-loader"]},
            {test: /\.json$/, use: ["json-loader"]}, {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
                use: ["file-loader"],
            }],
    },
    plugins: [
        // Dotenv reads config/development.env file to process.env
        new Dotenv({
            path: "config/development.env",
            systemvars: true,
        }),
    ],
};
export default webpackConfig;
