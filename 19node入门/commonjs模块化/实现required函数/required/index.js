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
        id+='.js';
    }
    const filename = path.join(__dirname, id);
    const dirname = path.dirname(filename);
    const fCode = fs.readFileSync(filename);
    let __mydefine = '我自己定义的伪全局函数.';

    let code = `(function (myrequire,module,exports,__filename,__dirname,__mydefine) {
        ${fCode}
    })(myrequire,module,exports,filename,dirname,__mydefine)`;

    eval(code);
    return module.exports;
}

const a = myrequire('./a.js')
console.log(a);