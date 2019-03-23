const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: {
        'home': "./src/home.js",
        'index': "./src/index.js"
    },
    output: {
        //使用[name]代表 home，index
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "index.html",
            filename: 'index.html',
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'home.html',
            chunks: ['home']
        })
    ]
}