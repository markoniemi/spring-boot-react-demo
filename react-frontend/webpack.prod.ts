import * as path from "path";
import * as webpack from "webpack";
import CopyWebpackPlugin = require("copy-webpack-plugin");

const config: webpack.Configuration = {
    mode: "production",
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "app.js",
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"],
    },
    module: {
        rules: [
            {test: /\.tsx?$/, loader: "awesome-typescript-loader"},
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
            {test: /\.css$/, loader: "style-loader!css-loader"},
            {test: /\.json$/, loader: "json-loader"}, {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
                loader: "url-loader?limit=100000@name=[name][ext]",
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin([
            {from: "public", to: "."},
        ]),
    ],
};

export default config;
