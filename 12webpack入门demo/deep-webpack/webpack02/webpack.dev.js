const { smart } = require('webpack-merge');
const base = require('./webpack.base.js');
module.exports = smart(base,{
    mode: "development",//默认有两种 production development
});