const path = require("path");
const Webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    mode: "development",//默认有两种 production development
    entry: './src/index.js',
    devServer: {
        port: 8081,
        progress: true,
        inline: true, //实时刷新
        contentBase: path.resolve(__dirname, 'custom_dist/')
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'custom_dist')
    },
    plugins: [
        new CleanWebpackPlugin({ path: './custom_dist' }),
        new CopyWebpackPlugin([{ from: './static', to: './static' }]),
        new HtmlWebpackPlugin({ filename: 'index.html', template: path.resolve(__dirname, 'index.tmp.html') }),
        new Webpack.BannerPlugin('彩蛋哈哈哈'),
        new MiniCssExtractPlugin({
            filename: 'main.[hash].css'
        }),
        new Webpack.ProvidePlugin({
            '$': 'jquery'
        })
    ],
    module: {
        rules: [
            /*    {
                   enforce: "pre",
                   test: /\.js$/,
                   exclude: /node_modules/,
                   loader: "eslint-loader"
               }, */
            /*    {
                   test: require.resolve('jquery'),
                   loader: 'expose-loader?$'
               }, */
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1,
                        outputPath:'./static/images/'
                    }
                }]
            },
            {
                test: /(\.css)$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: './'
                    }
                }, {
                    loader: 'css-loader'
                }, "postcss-loader"]
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-transform-runtime'
                        ]
                    }
                }
            }
        ]
    }
}