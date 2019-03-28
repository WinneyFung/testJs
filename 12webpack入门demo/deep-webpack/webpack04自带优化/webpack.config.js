const Webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: { "main": './src/main.js'},
    mode: 'production',
    output: {
        filename: '[name].js',
        path: __dirname + '/dist'
    },
    devServer: {
        contentBase: './dist/',
        inline: true,
        open: true
    },
    optimization: {
        splitChunks: {
            //缓存组
            cacheGroups: {
                //分割代码块
                common: {
                    chunks: 'initial',
                    minSize: 0,
                    minChunks: 2
                },
                vendor: {
                    priority: 1,//增加处理优先级
                    test: /node_modules/,//将组件库的单独抽离处理
                    chunks: 'initial',
                    minSize: 0,
                    minChunks: 2
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "index.html",
            filename: 'index.html',
            chunks: ['main']
        })
        // new Webpack.DllReferencePlugin({
        //     manifest: path.resolve(__dirname, 'dist', 'manifest.json')
        // })
    ],
    module: {
        noParse: /jquery/, //不去解释jquery的依赖库
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                //优化只解释配置src下的js文件
                exclude: /node_modules/,
                include: path.resolve('src'),
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react'
                    ],
                    plugins: ["@babel/plugin-syntax-dynamic-import"]
                }
            }
        ]
    }
}