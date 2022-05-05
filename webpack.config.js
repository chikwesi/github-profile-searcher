const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin')

const config = {
    entry: {
        home: path.resolve(__dirname, "src/index.js"),
        profile: path.resolve(__dirname, "src/pages/profile-page.js"),
    },
    module: {
        //TODO: add babel loader
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contenthash].bundle.js",
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Github Profile Searcher",
            template: path.resolve(__dirname, "src/index.html"),
            chunks: ['home']
        }),
        new HtmlWebpackPlugin({
            title: "Github Profile Searcher",
            template: path.resolve(__dirname, "src/pages/profile.html"),
            chunks: ['profile'],
            filename: 'profile.html'
        }),
        new CopyPlugin({
            patterns: [
                { from: 'public/assets', to: 'assets' }
            ]
        })
    ],
    devtool: "eval-source-map",
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
    },
}
module.exports = config;