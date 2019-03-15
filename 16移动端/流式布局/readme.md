# 流式布局
就是百分比布局，没有固定的像素，屏幕大小发生改变时，元素会自上而下自左向右像流水一样铺满
# viewport
移动特有的，虚拟的区域，用来承载网页；浏览器承载viewport，viewport承载网页。
# 适配要求
1. 网页宽度和浏览器一致，不能出现滚动条  width=device-width;initial-scale=1.0
2. 网页打开的大小默认是1.0，没有被缩放过 width=device-width;initial-scale=1.0
3. 不允许用户自行修改网页的缩放比例 user-scalable=no
# 设置viewport
如果viewport啥都没有设置，走的是默认设置。
1. 可以设置宽度 ---width
2. 设置高度 ---height
3. 设置默认的缩放比例 ---initial-scale
4. 可以设置最大缩放比例 ---maximum-scale
5. 可以设置最小缩放比例 ---minimum-scale
6. 是否允许用户修改缩放比例 --user-scalable(yes/no;1/0)
# 移动端js不建议使用jq
因为jq为了桌面浏览器做了很多兼容，特别是ie
目前移动端的浏览器大多是谷歌，qq，360，百度，他们的内核大多数要么是webkit或者blink
建议使用h5的api或者zepto.js（基于高版本浏览器的js库）
# 触摸事件
## 事件类型
1. touchstart 触摸开始
2. touchmove 触摸移动
3. touchend 触摸结束
4. touchcancel 取消触摸（一般只接电话，弹出消息）
## touchEvent对象的属性
1. touchList 触摸点集合,一个手指就是一个触摸点
2. changeTouches 改变后的触摸点
3. targetTouched 当前元素的触摸点集合
4. touches 页面的所有的触摸点
# 封装移动端的手势事件
通过touchsart,touchmove,touchend来判断位移大于一定的距离（比如50），则认定在做一个手势
1. swipe 滑动
2. swipeLeft 向左滑动 判断水平方向的位移<0
3. swipeRight 向右滑动 判断水平方向的位移>0
4. swipeDown 向下滑动 判断垂直方向的位移
5. swipeUp 向上滑动
#tap事件
移动端本身具有原生的click事件，但是为了更好的区分touch，所以加了300ms的延迟
在这300ms内没有触发touchmove事件，那么就是click事件了
缺点：影响用户体验，加长点击相应时间
改进：封装tap事件，和swipe事件一样，也是通过touch事件衍生出来
#fastclick.js插件
为了解决300ms的延迟，除了利用touch事件封装tap事件外，还可以利用fastclick.js插件
#总结
1. 适配的问题，移动端设备尺寸不一致
2. 流式布局：随着浏览器的尺寸的改变做自适应
3. 视口：在移动端特有的视口会对页面进行缩放
4. 视口设置 ：标准设置（width=device-width,initial-scale=1.0,user-scalable=no）
5. 非标准设置：淘宝的多种比例的缩放（页面的缩放 640 1242px)
6. 640px 750px px是css单位，真机的分辨率不是px
7. 移动设备有物理像素的概念 1px里面可以放置多个物理像素
8. 物理像素比： 非矢量的网页内容会失真
9. 解决移动端图片:在标准视口中使用2倍图
10. 移动端的尺寸计算设置为从边框开始 `box-sizing:borderbox`
11. 移动端特有的属性，咋移动端使用css3属性尽可能添加私有前缀；比如`-webkit-appearance: none; -webkit-tap-highlight-color: transparent;`
12. 网页的最大宽度限制的原因:和主流的设计稿640px,750p相关
13. 基于流体式布局就是基于百分比布局
14. 双飞翼为常见的头部布局，还有两栏自适应（一栏浮动，另外一栏添加`overflow:hidden`使用bfc）
15. 移动端常见滚动效果原理（touchstart,touchmove,touchend）（使用里面的touches,changedTouches），结合css3的transition和transform
16. 移动端滚动插件（Iscroll）
17. 使用touch事件封装手势swipe事件和点击tap事件
18. 封装tap事件是因为移动端的click事件有300ms延迟
    