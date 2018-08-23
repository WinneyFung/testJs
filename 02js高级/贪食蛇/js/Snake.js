(function() {
  var bodyArr = [];
  function Snake(width, height, direction) {
    this.width = width || 20;
    this.height = height || 20;
    //1上 -1 下 2右 -2左
    this.direction = direction || 2;
    this.body = [
      { x: 3, y: 2, color: "Blue" }, //头
      { x: 2, y: 2, color: "DodgerBlue" }, //身体
      { x: 1, y: 2, color: "DeepSkyBlue" } //身体];
    ];
  }
  Snake.prototype.init = function(map) {
    //删除之前的蛇仔
    remove();
    var len = this.body.length;
    for (var i = 0; i < len; i++) {
      var bd = this.body[i];
      var div = document.createElement("div");
      var divStyle = div.style;
      divStyle.position = "absolute";
      divStyle.backgroundColor = bd.color;
      divStyle.width = this.width + "px";
      divStyle.height = this.height + "px";
      divStyle.left = bd.x * this.width + "px";
      divStyle.top = bd.y * this.height + "px";
      //方向
      map.appendChild(div);
      bodyArr.push(div);
    }
  };
  //添加小蛇移动的方法
  Snake.prototype.move = function(food, map) {
    //先将非头部的身体部分的坐标切换成靠近头部的坐标
    var len = this.body.length - 1;
    for (; len > 0; len--) {
      this.body[len].x = this.body[len - 1].x;
      this.body[len].y = this.body[len - 1].y;
    }
    //处理头部
    switch (this.direction) {
      case 1:
        this.body[0].y--;
        break;
      case -1:
        this.body[0].y++;
        break;
      case 2:
        this.body[0].x++;
        break;
      case -2:
        this.body[0].x--;
    }

    //判断小蛇是否吃到了食物
    var headX = this.body[0].x * this.width;
    var headY = this.body[0].y * this.height;
    if (headX == food.x && headY == food.y) {
      var last = this.body[this.body.length - 1];
      this.body.push({
        x: last.x,
        y: last.y,
        color: last.color
      });
      //重新初始化项目
      food.init(map);
    }
  };
  //从蛇尾开始删除
  function remove() {
    var i = bodyArr.length - 1;
    for (; i >= 0; i--) {
      var ele = bodyArr[i];
      //找到爸爸自杀
      ele.parentNode.removeChild(ele);
      bodyArr.splice(i, 1);
    }
  }
  window.Snake = Snake;
})();
