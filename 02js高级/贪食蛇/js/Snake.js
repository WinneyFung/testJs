(function() {
  var bodyArr = [];
  function Snake(width, height, direction) {
    this.width = width || 20;
    this.height = height || 20;
    this.direction = direction || "right";
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
