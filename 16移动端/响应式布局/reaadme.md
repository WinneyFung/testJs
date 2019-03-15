# 响应式的原理
利用css3的媒体查询`media query`
1. 通过查询screen的宽度来指定某个宽度区间的网页布局
2. 超小屏幕（移动设备） 768px以下
3. 小屏屏幕 68px-992px
4. 中屏屏幕 992px-1200px
5. 宽屏屏幕 1200px以上
媒体查询语法：`@media screen and (max-width:768px)`;`and`和`（`之间要有空格隔开
# bootstrap
## normalizee.css
normalize.css和拼写的reset.css的差异
共同点都是重置了样式库，增强不同浏览器对同一个样式的表现一致性
不同的是：我们的reset.css会重置即使各个浏览器表现一致的样式，比如`list-style:none`;这样做的原因
是为了更好完成需求编码；但是normalize.css则不会重置各个浏览器表现一致的样式库
## 栅格系统
栅格系统，其实就是行和列的布局，网格状布局
1. row表示行，每行分为12等份
2. col表示列，语法为`col-*-*`;第一个*表示屏幕的大小：超小屏幕代表:`col-xm-*`;小屏幕:`col-sm-*`;中屏幕：`col-md-*`;宽屏幕：`col-lg-*`
3. 第二个*表示每一列占的12等份中的几等份；比如`col-md-2`;
4. 位置偏移；`col-*-offset-*`;两个星号的代码意思和上面的一样；
5. 列中嵌套行
6. 使用定位功能；push往后推，pull往前拉；语法`col-*-push-*`；`col-*-pull-*`;
## 响应式类
也是利用媒体查询控制元素的显示与隐藏
显示：`visible-lg`在大屏显示;`visible-sm`:在小屏幕显示...`visible-xs,visible-md`
隐藏：`hidden-lg,hiden-md,hidden-sm,hidden-xs`;

