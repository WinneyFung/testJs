const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'deep/dist/'),
        filename: 'bundle.js'
    },
    module:{
        rules:[
            {
                test:/\.less$/,
                loader:path.resolve(__dirname,'loader','my-style-loader')
            },
            {
                test:/\.less$/,
                loader:path.resolve(__dirname,'loader','my-less-loader')
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html'),
            filename: 'index.html'
        })
    ]
}