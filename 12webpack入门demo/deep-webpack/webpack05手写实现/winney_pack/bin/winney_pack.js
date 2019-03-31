#! /usr/bin/env node
/**
 * 1. 需要找到当前执行的路径，拿到webapck.config.js之类的配置文件
 * 2. 执行Compiler().run()方法 进行编译文件
 *
 */
console.log('start...');

const path = require('path');
let config = require(path.resolve('webpack.config.js'));

console.log('配置文件内容： ', config);
console.log();

let Compiler = require('../lib/Compiler.js');
let compiler = new Compiler(config);
//执行entryOptions钩子函数
compiler.hooks.entryOptions.call();
compiler.run();
compiler.hooks.done.call();