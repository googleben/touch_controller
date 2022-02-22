const path = require("path");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const { library } = require("webpack");

module.exports = {
    mode: "development",
    entry: "./src/index.tsx",
    devtool: "inline-source-map",
    experiments: {
        outputModule: true
    },
    externals: {
        "./cjs/react.development.js": "root React",
        "../../touch_controller_www/src/editorApi": "/static/js/editorApi.js",
        "../../touch_controller_www/src/api": "/static/js/api.js",
        "../../touch_controller_www/src/index": "/static/js/index.js"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    externalsType: 'module',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
        library: {
            type: "module"
        },
        environment: { module: true }
    },
    plugins: [
        new FileManagerPlugin({
            events: {
                onEnd: {
                    copy: [
                        { source: "./dist/index.js", destination: "../plugins/core/www/index.js" },
                        { source: "./css/*.css", destination: "../plugins/core/www" }
                    ]
                }
            }
        })
    ]
}