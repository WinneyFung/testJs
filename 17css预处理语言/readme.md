

# 预处理语言

## less
> less包含一套自定义的语法以及一个解析器，用户根据这些语法定义自己的样式规则，这些规则最终会通过解析器，编译成对应的css文件；
> less并没有裁剪css原有的特性，更不是取代css，而是在css原有的基础上，为css添加程序式的语言特性；

### 安装

在已有的node环境下，安装less

`npm i -g less`

### 基本编译过程

1. 准备css文件`style.less`

   文件内容

   ```less
   .r {
       color: red;
   }

   .bb {
       border-bottom: 1px solid #ddd;
   }

   .rbb {
       .r();
       .bb();
       .rbb-child {
           color:yellow;
       }
   }
   ```

   ​

2. 编译

   运行语句编译 `lessc  style.less style.css`

   编译后文件内容：

   ```css
   .r {
     color: red;
   }
   .bb {
     border-bottom: 1px solid #ddd;
   }
   .rbb {
     color: red;
     border-bottom: 1px solid #ddd;
   }
   .rbb .rbb-child {
     color: yellow;
   }
   ```

   ### 基础语法

   #### 变量

   使用`@`前缀的都是变量，如果要进行变量拼接，类似字符串模板语法，需要用花括号`{}`括住`@`后面的字符

   ​

   编译前的less文件

   ```less
   @charset "utf-8";

   @main-color: #f00;
   @parent: box;

   nav {
       color: @main-color;
   }

   .@{parent} {
       color: @main-color;
   }
   ```

   ​

   编译后的less文件

   ```css
   @charset "utf-8";
   nav {
     color: #f00;
   }
   .box {
     color: #f00;
   }

   ```

#### mixins混入

##### 类混入

编译前的less文件

```less
@charset "utf-8";

.fl {
    float: left;
}

.bt {
    border-top: 10px;
}

.mixins {
    .fl();
    .bt();
}
```

编译后的css文件

```css
@charset "utf-8";
.fl {
  float: left;
}
.bt {
  border-top: 10px;
}
.mixins {
  float: left;
  border-top: 10px;
}
```

##### 函数混入

当类混入的某些组合样式(比如`.fl、.bt`)，最后并不希望输出到编译的css文件中，可以使用函数混入；

函数混入的优点：

- 函数不会被编译到css文件中，节省编译后的文件体积
- 函数可以指定变量
- 函数变量可以有默认值
- 函数体可以写兼容代码，减少开发时编写的代码量

编译前的less文件

```less
@charset "utf-8";
  .fl() {
      float: left;
  }

  .transition() {
      transition: all 2s ease 1s;
      -moz-transition: all 2s ease 1s;
  }

  .b-rad(@width:50%) {
      border-radius: @width;
  }

  .box {
      .fl();
      .transition();
      .b-rad(100px);
  }
```

编译后的css文件

```css
@charset "utf-8";
.box {
  float: left;
  transition: all 2s ease 1s;
  -moz-transition: all 2s ease 1s;
  border-radius: 100px;
}
```

#### 嵌套

嵌套语法体现了一种高内聚低耦合的软件开发思想；使得css能够模块块开发

编译前的less文件：

```less
@charset "utf-8";

.nav {
    width: 1000px;
    .nav-item {
        display: inline-block;
        padding: 10px 20px;
        &:before {
            content: "伪元素或者伪类的连接要用&连接";

        }
        > .link {
            width: 100px;
        }
    }
}
```

编译后的css文件：

```css
@charset "utf-8";
.nav {
  width: 1000px;
}
.nav .nav-item {
  display: inline-block;
  padding: 10px 20px;
}
.nav .nav-item:before {
  content: "伪元素或者伪类的连接要用&连接";
}
.nav .nav-item > .link {
  width: 100px;
}
```

#### import引入

import可以引入less文件，比如在工程中有variable.less,想使用里面的变量，那么久可以引入

编译前的less文件：

```less
@charset "utf-8";
@import './variables.less';

a {
    color: @main-color;
}

.@{parent} {
    background-color: #000;
}
```

其中variables.less文件内容：

```less
@charset "utf-8";
@main-color: #f00;
@parent: box;
```



编译后的css文件：

```css
@charset "utf-8";
a {
  color: #f00;
}
.box {
  background-color: #000;
}
```

#### 运算以及内置函数

运算

[参考](https://less.bootcss.com/#-operations-)

```
escape(@string);//通过url-encoding编码字符串
e(@string);//对字符串转义
unit（@dimension，[@unit:'']);//移除或者替换属性值的单位
color（@string）；//将字符串解析为颜色值

```

其中使用`loop+when`可以实现循环

[参考](https://www.jianshu.com/p/6d412130fa53?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation)

目标输出的css代码：

```css
.a{
  background: url("./resource/a.png") top/100% no-repeat;
}
.b{
  background: url("./resource/b.png") top/100% no-repeat;
}
.c{
  background: url("./resource/c.png") top/100% no-repeat;
}
```

分析目标css代码可知，类名和图片名相同（不包含图片后缀）；

故定义函数：

```less
.getImgae(@className) {
    .@{className} {
        background: url("./resource/@{className}.png") top/100% no-repeat;
    }
}
```

测试函数`.getImage(a)`输出：

```css
@charset 'utf-8';
.a {
  background: url("./resource/a.png") top / 100% no-repeat;
}
```

使用循环生成目标函数：

```less
@charset 'utf-8';
@classNames: a,b,c;
@len: length(@classNames);
.getImgae(@className) {
    .@{className} {
        background: url("./resource/@{className}.png") top/100% no-repeat;
    }
}

.getImgae(a);

.loop(@i) when(@i <= @len) {
    @cn: extract(@classNames,@i);
    .getImgae(@cn);
    .loop(@i+1);
}

.loop(1);
```

[大佬的less实现栅格系统](https://segmentfault.com/a/1190000010104455)：

> 简单分析里面的循环：当i小于栅格列数时，一直循环调用函数`col(@i)`收集类名，当类名收集完后，利用`@{list} { .columns-base-css();}`生成css代码

```

@container: m-container;

@columns-name: m-col;
@columns-pading: 15px;
@grid-count: 12;

@screen-sm-min: 768px;
@screen-md-min: 992px;
@screen-lg-min: 1200px;

.@{container},
.@{container}-fluid{
    padding-left: @columns-pading;
    padding-right: @columns-pading;
    margin-right: auto;
    margin-left: auto;
    min-width: 960px;/*为了兼容不支持媒体选择的浏览器*/
    -webkit-transition:width 0.9s cubic-bezier(1,-0.02, 0, 1.04);// for Safari and Chrome
    -moz-transition:width 0.9s cubic-bezier(1,-0.02, 0, 1.04);// for Firefox
    -o-transition:width 0.9s cubic-bezier(1,-0.02, 0, 1.04);// for Opera
    -ms-transition:width 0.9s cubic-bezier(1,-0.02, 0, 1.04);// for ie
    transition:width 0.5s cubic-bezier(1,-0.02, 0, 1.04);
    -webkit-box-sizing: border-box;
    box-sizing:border-box;
    -moz-box-sizing:border-box;
}
.@{container}-fluid{
    min-width: 0;
    width: 100%;
}
.row{
    min-height: 1px;
    margin-left: -@columns-pading;
    margin-right: -@columns-pading;
    clear: both;
    &:before,
    &:after{
        content: "";
        display: table;
        clear: both;
    }
}
// 列基础css
.columns-base-css() {
    position: relative;
    min-height: 1px;
    padding-right: @columns-pading;
    padding-left: @columns-pading;
    
    -webkit-box-sizing: border-box;
    box-sizing:border-box;
    -moz-box-sizing:border-box;
}
// 循环列，设置基础css
.make-grid-columns(@len: @grid-count) {
    .col(@i) {
        @classList: ~".@{columns-name}-xs-@{i},.@{columns-name}-sm-@{i},.@{columns-name}-md-@{i},.@{columns-name}-lg-@{i}";
        .col(@i + 1, ~"@{classList}");
    }
    .col(@i, @list) when (@i =< @len){
        @classList: ~".@{columns-name}-xs-@{i},.@{columns-name}-sm-@{i},.@{columns-name}-md-@{i},.@{columns-name}-lg-@{i}";
        .col(@i + 1, ~"@{classList},@{list}");
    }
    .col(@i, @list) when (@i > @len) {
        @{list} {
          .columns-base-css();
        }
    }
    .col(1)
}
.make-grid-columns(@grid-count);

// 循环生成列
.make-columns-loop(@type, @n, @i: 1) when (@i <= @n){
    @col-class-name: ~"@{columns-name}-@{type}";
    .@{col-class-name}-@{i}{
        width: @i/@n*100%;
        float: left;
    }
    // 偏移
    .@{col-class-name}-offset-@{i}{
        margin-left: @i/@n*100%;
    }
    // 排序
    .@{col-class-name}-pull-@{i}{
        right: @i/@n*100%;
    }
    .@{col-class-name}-push-@{i}{
        left: @i/@n*100%;
    }
    .make-columns-loop(@type, @n, (@i + 1));
}
.make-columns-loop(xs, @grid-count);

// 媒体查询
.@{container}{
    @media (max-width: @screen-sm-min) {
        min-width: 0;
    }
    @media (min-width: @screen-sm-min) {
        width: 750px;
        min-width: 0;
    }
    @media (min-width: @screen-md-min) {
        width: 970px;
        min-width: 0;
    }
    @media (min-width: @screen-lg-min) {
        width: 1170px;
        min-width: 0;
    }
}
// 媒体查询设置对应列类型css
@media (min-width: @screen-sm-min) {
    .make-columns-loop(sm, @grid-count);
}
@media (min-width: @screen-md-min) {
    .make-columns-loop(md, @grid-count);
}
@media (min-width: @screen-lg-min) {
    .make-columns-loop(lg, @grid-count);
}

```



