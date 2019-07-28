(function() {
  //用来存放生成的食物对象
  var foods = [];
  //Food构造函数
  function Food(width, height, color) {
    this.element = document.createElement("div");
    this.color = color || "ForestGreen";
    this.height = parseInt(height) || 20;
    this.width = parseInt(width) || 20;
    this.position = "absolute";
    this.x = 0;
    this.y = 0;
  }
  Food.prototype.init = function(map) {
    remove(foods);
    var div = this.element;
    var divStyle = div.style;
    divStyle.backgroundColor = this.color;
    divStyle.width = this.width + "px";
    divStyle.height = this.height + "px";
    divStyle.position = this.position;
    this.x =
      Math.floor(Math.random() * (map.offsetWidth / this.width)) * this.width;
    this.y =
      Math.floor(Math.random() * (map.offsetHeight / this.height)) *
      this.height;
    divStyle.left = this.x + "px";
    divStyle.top = this.y + "px";
    //将div放到map下
    map.appendChild(div);
    foods.push(div);
  };
  //将Food构造函数绑定到window下
  window.Food = Food;
  function remove() {
    var len = foods.length;
    for (var i = 0; i < len; i++) {
      var child = foods[i];
      //找到爸爸来删除儿子
      child.parentNode.removeChild(child);
      //从索引值为i的地方开始删除一个元素
      foods.splice(i, 1);
    }
  }
})();
