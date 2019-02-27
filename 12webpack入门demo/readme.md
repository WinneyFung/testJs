# webpack 入门 demo

[参考](https://segmentfault.com/a/1190000006178770#articleHeader0)

引入笔记:

## 创建 app 和 public 文件夹

> app 文件夹用来存放原始数据和我们将写的 JavaScript 模块，public 文件夹用来存放之后供浏览器读取的文件（包括使用 webpack 打包生成的 js 文件以及一个 index.html 文件）
>
> 创建三个文件夹:
>
> - `index.html` --放在 public 文件夹中;
> - `Greeter.js`-- 放在 app 文件夹中;
> - `main.js`-- 放在 app 文件夹中;

#### 打包错误

在这里执行命令时要求安装webpack-cli,安装后,执行和博主一样的打包命令会报错`bundle.js找不到`,后来执行

```javascript
# webpack非全局安装的情况
node_modules/.bin/webpack app/main.js
```

会默认打包到`__dirname+'/dist/'`文件夹下;

当配置了`webpack.config.js`文件,并且指定打包打包路径后,则按照指定的打包路径来.

> **注**：“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。
>
> npm的`start`命令是一个特殊的脚本名称，其特殊性表现在，在命令行中使用`npm start`就可以执行其对于的命令，如果对应的此脚本名称不是`start`，想要在命令行中运行时，需要这样用`npm run {script name}`如`npm run build`

#### 添加loader

在`wabpack.config.js`中添加loader后,需要重启server,才生效.