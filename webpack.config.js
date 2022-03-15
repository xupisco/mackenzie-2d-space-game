const path = require('path');
const webpack = require('webpack');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',

    entry: {
        game: './src/js/game.js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src/js'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.scss$/,
                include: path.resolve(__dirname, 'src/scss'),
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'typeof CANVAS_RENDERER': JSON.stringify(true),
            'typeof WEBGL_RENDERER': JSON.stringify(true),
            __ENV__: this.mode
        }),
    ],

    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, './dist'),
    },

    devServer: {
        static: path.resolve(__dirname, './'),
        devMiddleware: {
            publicPath: './dist',
            writeToDisk: true
        }
    }
}
