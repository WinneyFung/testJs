const Webpack = require('webpack');
const path = require('path');
module.exports = {
    mode:'development',
    entry:{
        react:['react','react-dom']
    },
    output:{
        filename:'_dll_[name].js',
        path:path.resolve(__dirname,'dist/'),
        library:'_dll_[name]'
    },
    plugins:[
        new Webpack.DllPlugin({
            name:'_dll_[name]',
            path:path.resolve(__dirname,'dist','manifest.json')
        })
    ]
}