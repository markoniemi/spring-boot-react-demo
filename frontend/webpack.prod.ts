import * as path from "path";
import * as webpack from "webpack";
//import * as HtmlWebPackPlugin from "html-webpack-plugin";
import HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
//    template: "./src/index.html",
    template: "./public/index.html",
    filename: "./index.html"
});

const config: webpack.Configuration = {
    mode: "production",
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            {test: /\.tsx?$/, loader: "awesome-typescript-loader"},
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
            {test: /\.css$/, loader: "style-loader!css-loader"},
            {test: /\.json$/, loader: "json-loader"}, {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
                loader: "url-loader?limit=100000@name=[name][ext]",
            }
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
//            { test: /\.tsx?$/, loader: "awesome-typescript-loader" }
        ]
    },
    plugins: [htmlPlugin]
};

export default config;