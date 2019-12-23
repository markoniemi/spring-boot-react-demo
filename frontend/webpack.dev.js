"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HtmlWebPackPlugin = require("html-webpack-plugin");
var htmlPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html"
});
var config = {
    mode: "development",
    entry: "./src/index.tsx",
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" }
        ]
    },
    plugins: [htmlPlugin]
};
exports.default = config;
