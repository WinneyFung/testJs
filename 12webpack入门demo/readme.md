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

#### 添加压缩插件报错

因为博文使用的webpack版本是3的,但是跟做demo时用了4,所以需要做修改;

参考[webpack4.0版本中的js压缩问题](https://my.oschina.net/hyzccc/blog/1797358)

`webpack.config.js`配置:

```javascript
 optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: false
                }
            })
        ]
    },
```

具体步骤为:

- 用npm安装uglifyjs-webpack-plugin插件

  `cnpm install --save-dev uglifyjs-webpack-plugin`

- 引入到`webpack.config.js`配置文件

  `const UglifyJsPlugin = require("uglifyjs-webpack-plugin")` 

- 与plugin并排添加上面的配置代码


# webpack深入学习

## 体验Webpack零配置的效果

初始化一个文件夹

`npm init`

然后安装webpack4.0

`npm i webpack webpack-cli -d`;

在`package.json`配置`scripts`命令,通过`--config  webpack.config.filename.js`可以指定webpack执行时的配置文件：

```json
  "scripts": {
    "webpack": "webpack --config webpack.config.my.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

执行命令：

`npm run webpack`

这时候webpack会使用其默认的配置，打包生成`dist`文件

## 手动配置webpack

### 配置打包的入口文件以及输出路径等

- 默认的配置文件名称是`webpack.config.js`
- 使用的是node的语法编写
- `mode`的值配置打包模式，默认有两种选择，`development`以及`production`;选择`production`模式会将代码压缩；
- `entry`配置的是打包依赖入口的js文件
- `output`主要配置打包后输出的文件名称以及文件路径，其中`path`一定要是绝对路径，需要使用`webpack`内置的`path`模块将路径解析为绝对路径；

所以`webpack.config.js`的文件配置内容现在是：

```javascript
const path = require("path");
module.exports = {
    mode: "development",//默认有两种 production development
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'custom_dist')
    }
}
```

### webpack打包文件内容分析

![打包后的文件结构图](./images/打包后的文件.png)

打包后的文件，可以清晰看出，就是一个匿名立即执行函数，函数接收参数`modules`；

并且实际参数是一个对象，对象的`key`是以文件的相对打包后文件路径命名，`value`是一个函数，并且函数里面是执行`eval`函数的内容，`eval`的参数是该文件的代码；

## 配置插件

在配置文件通过字段`plugins`配置插件，类型时数组：

配置常见的三个插件如下：

```javascript
const path = require("path");
const Webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    mode: "development",//默认有两种 production development
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'custom_dist')
    },
    plugins: [
        new CleanWebpackPlugin({ path: './custom_dist' }),
        new CopyWebpackPlugin([{ from: './static', to: './static' }]),
        new Webpack.BannerPlugin('彩蛋哈哈哈')
    ]
}
```



# Webpack常用插件

webpack的常用插件的更多配置可以找到对应的`查看对用的配置

- `cleanWebpackPlugin `清除打包后的文件夹的内容


- `copyWebpackPlugin `直接将内容复制到打包后的文件夹，常用于静态资源复制
- `bannerPlugin `是和`path`一样是`webpack`自带的插件 在打包后的文件加入注释

### webpack-dev-server

可以以服务的形式启动打包后的文件

安装命令：`npm i webpack-dev-server --save-dev` 

在`package.json`文件添加命令:`'dev':'webpack-dev-server'`

配置方式：

```javascript
  devServer: {
    port:8081,//配置端口号
    contentBase: "./public", //本地服务器所加载的页面所在的目录
    historyApiFallback: false, //不跳转
    inline: true, //实时刷新，
    open: true //自动打开浏览器
  },
```

### 样式相关的`loader`解析处理css文件

#### 使用相关`loader`处理对应的样式文件

安装命令`npm i --save=d css-loader`

`css-loader`只是解析css，是webpack打包的时候不会对css文件依赖报语法错误，如果想css正确引入到`html`文件中。需要配置`style-loader`，在打包后的`main.js`执行后会将css插入到`head`标签中；

并且注意的是use这个数组里面的`loader`的执行顺序默认是**从右向左**开始执行的，而且里面的数据类型可以是对象，如果传入的是对象的话，可以通过`option`这个属性传入对`loader`的一些配置

综上：如果改成` use: ['css-loader','style-loader']`会报错的。

配置方式：

```javascript
    module: {
        rules: [
            {
                test: /(\.css)$/,
                use: ['style-loader','css-loader']
            }
        ]
    }
```

如果希望生成的样式，比写在模板上的内部样式优先级要低，可以这样子配置：

```javascript
    module: {
        rules: [
            {
                test: /(\.css)$/,
                use: [{
                    loader: 'style-loader',
                    options: {
                        insertAt: 'top'
                    }
                }, {
                    loader: 'css-loader'
                }]
            }
        ]
    }
```

其他css预处理语言也是类似配置，只要安装对应的loader即可，比如`less`就要安装对应的`less-loader`,`sass`就要安装对应的`sass-loader`;

#### 抽离样式文件

按照上面的配置发现`css`并没有被抽离出来，如果希望抽离css文件，那么需要使用插件`mini-css-extract-plugin`插件；并且希望一些样式自动加上兼容浏览器的前缀，可以使用`autoprefixer`插件；同时也需要安装`post-css`插件；

执行命令：

```
 npm i --save-d mini-css-extract-plugin
 npm i --save-d autoprefixer
 npm i --save-d postcss-loader
```

压缩css代码的参考[mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)

相关配置：

```javascript
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'main.[hash].css'
        })]
    module: {
        rules: [
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
            }
        ]
    }
}
```

其中使用postcss-loader还需要添加`postcss.config`.js文件,文件配置:

```javascript
module.exports = {
    plugins: [
      require('autoprefixer')
    ]
  }
```

### 使用`babel`插件

将`es6`语法转换为`es5`语法

[官网](https://github.com/babel/babel-loader)

### 使用`elint`插件

```
npm i -d elint
npm i -d elint-loader
```

`loader`的默认执行顺序是从右到左,从下到上

参考文档,需要使用做如下配置:

```javascript
{
  enforce: "pre",
    test: /\.js$/,
      exclude: /node_modules/,
        loader: "eslint-loader"
}, 
```

### 引入全局变量

> 当我们引入`jquery`,可以直接在入口文件`import`进来,但是`query`却没有挂在`window`上,这是可以使用`expose-loader`;可以使用内联`loader`的方式,也可以使用全局loader的方式配置(`pre`前面执行的`loader`,`post`后置`loader`)

安装`npm i -d expose-loader`

内联引入引入:

```javascript
import $ from 'expose-loader?$!jquery';
console.log($);
console.log(window.$);
```

配置引入:

引用jquery的时候,也需要`import $ from 'jquery'`

```javascript
{
  test: require.resolve('jquery'),
    loader: 'expose-loader?$'
}
```

如果希望每个模块都不用`import`就可以使用`jquery`,那么需要配置注入到每个模块中,在`plugins`里面配置

```javascript
     new Webpack.ProvidePlugin({
            '$':'jquery'
        })
```

还有一种引入方式是在模板`html`中配置,并且配置`external:'jquery'默认不引入文件`

### 图片等文件资源的处理

可以使用`file-loader`引入图片,改处理器会在内部生成一张图片,到build目录下

具体使用如下:

```javascript
import img from './img.png';
const image = new Image();
image.src = img;
document.body.appendChild(image);
```

webpack的配置:

```javascript
   {
     test:/\.(png|jpg|gif)$/,
     use: [{
     loader:'file-loader'
     }]
  },
```

比`file-loader`多一个功能的是`url-loader`,该处理器会根据`limit`配置,小于限制时,将图片等转化为`base64`编码;当超过限制的图片会输出到配置的输出路径

```javascript
    {
      test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1024*1024,
            outputPath:'./static/images/'
          }
        }]
    },
```

### 多页面打包配置

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: {
        'home': "./src/home.js",
        'index': "./src/index.js"
    },
    output: {
        //使用[name]代表 home，index
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "index.html",
            filename: 'index.html',
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'home.html',
            chunks: ['home']
        })
    ]
}
```

### 配置源码映射sourcemap

> 可以通过`devtool:'**-map'`配置源码映射,可配置的值有:
>
> `devtoo`l:'source-map':增加一个映射文件 帮我们调试源代码
>
> `devtool:'eval-source-map'`:不会产生单独的`*.map.*文件,但是可以显示行和列
>
> `devtool:'cheap-module-source-map'`:单独的`*.map.*文件,但是可以显示行,不显示列信息
>
> `devtool:'cheap-module-eval-source-map'`:不产生`*.map*文件,集成在打包后的文件中,但是可以显示行,不显示列信息

### watch字段配置

可以通过`watch`字段配置`webpack`自动打包,当监听到文件发生变化时,会实时打包文件.配置如下:

```javascript
watch:true,
watchOptions:{
    poll:100,//每秒问1000次 是否需要打包
      aggregateTimeout: 500,//防抖设置的时间
        ignored: /node_modules/ //不要进行监听的文件夹
  },
```

### 处理开发时的跨域问题

```javascript
const http = new XMLHttpRequest();
http.open('get', '/api/recipes/all?pageNum=1', true);
http.onreadystatechange = function (e) {
   if (this.readyState==4) {
       console.log(this.response,'.......................')
   }
}
http.onload = function(e) {
    console.log(e.target.response);
}
http.send();
```

具体配置:

```javascript
    devServer: {
        port: 8081,
        progress: true,
        inline: true, //实时刷新
        contentBase: path.resolve(__dirname, 'custom_dist/'),
        proxy: {
            '/api': {
                target: 'http://localhost:8888',
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
```

### resovle属性的配置

`resolve`属性专门用于配置解决第三方依赖时，模块查找的位置；

以及提供`alias`配置引入包的别名；

使用`extension`配置缺省后缀名时查找的顺序；

具体配置：

```javascript
resolve:{
  modules:['./node_modules','./cutom_dist'],
    alias:{
      'bootstrap':'bootstrap/dist/css/bootstrap.css'
    }
}
```

### 定义环境变量

假设在入口文件引入文件,`import "./envVarible";`：

```javascript
if (ENV == 'production') {
    console.log('生产环境');
} else if (ENV == 'dev') {
    console.log('开发环境');
}
```

这时候会报错：`Uncaught ReferenceError: ENV is not defined`

修改配置文件，使用`webpack`自带的`DefinePlugin`插件，定义全局变量：

```javascript
new Webpack.DefinePlugin({
  ENV:JSON.stringify('production'),
  IS_DEV:'true',
  IS_EXPRESSION:'1+2'
}),
```

有了上面的配置，相当于定义字符串类型的全局变量`ENV`，值为:`production`;布尔类型的全局变量`IS_DEV`，值为:`true`;数字类型的全局变量`IS_EXPRESSION`，值为:`3`;

所以可知：对于引号或者的字符，如果是表达式，则将表达式运算结果值赋给变量，如果是`true`或者`false`的值，那么就将布尔值扶植给全局变量，如果引号里面是一串普通字符串，那么将字符串识别为变量，将变量值赋值给全局变量；

### 使用webpack-merge配置文件分类

将`webpack`配置文件分成三份：分别是`webpack.base.js;webapck.dev.js;webpack.prod.js`

`dev`环境用于配置开发时的配置，`prod`用于配置生产时的配置，包含一些生产的优化，压缩之类的；`base`配置基础配置；使用`webpack-merge`插件合并两个配置文件；

示例：

`package.json`文件配置脚本命令：

```json
  "scripts": {
    "build": "webpack --cofig webpack.prod.js",
    "dev": "webpack-dev-server --inline --progress --config ./webpack.dev.js",
    "eslint": "eslint",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```



`base`文件配置公共配置；

`dev`文件作如下配置：

```javascript
const { smart } = require('webpack-merge');
const base = require('./webpack.base.js');
module.exports = smart(base,{
    mode: "development",//默认有两种 production development
});
```

`prod`文件作如下配置：

```javascript
const { smart } = require('webpack-merge');
const base = require('./webpack.base.js');
module.exports = smart(base,{
    mode: "production",//默认有两种 production development
});
```

### module的noParse属性作用

`noParse`配置的库，表示不去解释其依赖关系

```javascript
  module: {
        noParse:/jquery/, //不去解释jquery的依赖库
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react'
                    ]
                }
            }
        ]
    }
```

### 优化webpack

#### 使用dllPlugin

`dllPlugin`是`webpack`自带的插件，动态链接库，可以把预先需要的包，比如`react,react-dom`预先打包，然后建立动态链接，最后打包后的`main`的大小会变小，`react,react-dom`等依赖，变为动态连接

动态连接配置`react,react-dom`的配置文件，并且编译：

```javascript
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
```

编译后会，在配置好的文件夹里会产生`_dll_react.js,manifest.json`文件；

如何引入这个打包后的文件呢？需要使用`webapck.DllReferencePlugin`插件，当找不到对应的`mainfest.json`文件的时候，`webpack`才会重新打包；并且需要在静态`html`文件中写死对`_dll_react.js`的引入；

```javascript
    plugins:[
        new Webpack.DllReferencePlugin({
            manifest:path.resolve(__dirname,'dist','manifest.json')
        })
    ],
```

#### 使用hapyWepack多线程打包

#### webpack生产模式下的打包

使用`import`引入模块，会在生产环境会自动删除没用的代码，`tree-shaking`把没用到的代码，自动删除；

并且存在`scope hosting`作用域提升，在webpack中自动省略一些可以优化的代码

#### 抽离公共的代码

如果有两个入口文件，都共同引入几个文件，则可以将文件抽取出来，具体配置如下：

```javascript
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
}
```

#### 实现懒加载

实现模块懒加载（即动态加载，使用的是`import（）`函数）

`babel`需要配置插件

```javascript
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
```

具体代码：

```javascript
let button = document.createElement('button');
button.innerHTML = '点击动态加载js文件';
button.addEventListener('click', function (e) {
    console.log('click')
    import('./a').then(moudle => console.log(moudle.a));
});
document.body.appendChild(button);
```

#### 热更新

