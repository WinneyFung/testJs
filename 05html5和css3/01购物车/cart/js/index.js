$(() => {
  $(".container").fullpage({
    //配置页面的背景颜色
    sectionsColor: ["#fadd67", "#84a2d4", "#ef674d", "#ffeedd", "#d04759", "#84d9ed", "#8ac060"],
    //添加的小圆点的导航栏
    navigation:true,
    //小圆点导航栏的位置 默认值为right 可选值//"left"
    navigationPosition:"right"
  });
});
