const FileManagerPlugin = require("filemanager-webpack-plugin");
const path = require("path");

module.exports = {
    mode: "development",
    entry: {
        index: "./src/index.tsx",
        api: "./src/api.tsx",
        editorApi: "./src/editorApi.tsx"
    },
    devtool: "inline-source-map",
    experiments: {
        outputModule: true
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
    externals: {
        "./cjs/react.development.js": "root React",
        "./cjs/react-dom.development.js": "root ReactDOM",
        "./index": "/static/js/index.js",
        "./api": "/static/js/api.js",
        "./editorApi": "/static/js/editorApi.js"
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    externalsType: 'module',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        library: {
            type: "module"
        },
        module: true,
        environment: { module: true }
    },
    plugins: [
        new FileManagerPlugin({
            events: {
                onEnd: {
                    copy: [
                        { source: "./dist/*.js", destination: "../www/js" },
                        { source: "./css/*.css", destination: "../www/css"}
                    ]
                }
            }
        })
    ]
}