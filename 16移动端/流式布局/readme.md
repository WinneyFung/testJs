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