const { smart } = require('webpack-merge');
const base = require('./webpack.base.js');
module.exports = smart(base, {
    mode: "production",//默认有两种 production development
});