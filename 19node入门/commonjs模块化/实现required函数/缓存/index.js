/**
 * 定义一个myrequire函数 作用和required一样 同步引入模块
 * 回顾编写模块时，可以使用的不用定义的变量有：
 * module， exports，module.exports，__dirname,__filename,require
 * 其中exports和module.exports指向同一个地址
 * 首先模块文件的原理和匿名立即执行函数一样的，外面只能访问通过moudle.exports暴露的变量
 */

function myrequire(id) {
    let module = { exports: {} };
    let exports = module.exports;
    const fs = require('fs');
    const path = require('path');
    let regexp = /\.\w+/;
    let exec = regexp.exec(id);
    if (!exec) {
        id += '.js';
    }
    const filename = path.join(__dirname, id);
    //添加缓存
    myrequire.cache = myrequire.cache || {};
    if (myrequire.cache.hasOwnProperty(filename)) {
        return myrequire.cache[filename].exports;
    }

    const dirname = path.dirname(filename);
    const fCode = fs.readFileSync(filename);
    let __mydefine = '我自己定义的伪全局函数.';

    let code = `(function (myrequire,module,exports,__filename,__dirname,__mydefine) {
        ${fCode}
    })(myrequire,module,exports,filename,dirname,__mydefine)`;

    eval(code);
    myrequire.cache[filename] = module;
    return module.exports;
}

/**
 * 如果没有添加缓存 ：
 * 每次加载模块，都会执行模块的代码
 * 而添加了缓存：即缓存了模块导出的变量 这时不会再去执行文件 而直接读取缓存
 */
setInterval(() => {
    console.log(myrequire('./test'))
}, 1000)