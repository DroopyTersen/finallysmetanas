var fs = require("fs");
var path = require("path");

module.exports = {
    entry: { "site": "./src/site.js" },
    output: {
        path: path.join( __dirname, 'dist' ),
        publicPath: '/dist/',
        filename: '[name].js',
        chunkFilename: "[name].chunk.js",
    },
    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /(node_modules)/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["env"]
                }
            }
        }]
    },
    devtool: "source-map"
};
