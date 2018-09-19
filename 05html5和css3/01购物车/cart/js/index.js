$(() => {
  $(".container").fullpage({
    //配置页面的背景颜色
    sectionsColor: [
      "#fadd67",
      "#84a2d4",
      "#ef674d",
      "#ffeedd",
      "#d04759",
      "#84d9ed",
      "#8ac060"
    ],
    scrollingSpeed: 1000,
    //添加的小圆点的导航栏
    navigation: true,
    //小圆点导航栏的位置 默认值为right 可选值//"left"
    navigationPosition: "right",
    //当页面加载后执行
    afterLoad: function(link, index) {
      //index的序号是从1计算的
      $(".section")
        .eq(index - 1)
        .addClass("now");
      /*     setTimeout(function() {
        $(".section")
          .eq(index - 1)
          .addClass("now");
      }, 1000); */
    },
    //页面渲染后
    afterRender: function() {
      /*jquery插件初始的时候封装这个方法*/
      /*1.回想jquery插件的封装 $.fn.fullpage = function(){} */
      /*2.jquery本身没有的方法通过$.fn的方式追加方法  认为是插件方法*/
      /*3.例如：$.fn.src = function(){ return this.attr('src') } this 你选择谁this（jquery对象）执行谁 */
      /*点击更多切换下一页*/
      console.log(this);
      //注册事件
      $(".more").on("click", () => {
        $.fn.fullpage.moveSectionDown();
      });
    },
    //页面离开
    onLeave: function(index, nextIndex, direction) {
      //判断是否是从第二页跳转到第三页 index非0基
      if (index == 2 && nextIndex == 3) {
        //给第二页添加leave
        $(".section")
          .eq(index - 1)
          .addClass("leaved");
        console.log($(".screen1.leaved .sofa").css("opacity "));
      }
    }
  });
});
