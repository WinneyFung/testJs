(function() {
  var that = null;
  function Game(map) {
    this.map = map;
    this.snake = new Snake();
    this.food = new Food();
    that = this;
  }
  Game.prototype.init = function() {
    this.snake.init(this.map);
    this.food.init(this.map);
    this.runSnake(this.food, this.map);
  };
  //移动小蛇
  Game.prototype.runSnake = function(food, map) {
    var timeId = setInterval(function() {
      that.snake.move(food, map);
      that.snake.init(map);
      //判断蛇活动是否过界
      var maxX = that.map.offsetWidth / that.snake.width;
      var maxY = that.map.offsetHeight / that.snake.height;
      var headX = that.snake.body[0].x;
      var headY = that.snake.body[0].y;
      if (headX >= maxX || headX < 0) {
        clearInterval(timeId);
        alert("Game over...");
      }
      if (headY >= maxY || headY < 0) {
        clearInterval(timeId);
        alert("Game over...");
      }
    }, 120);
  };
  //绑定键盘事件移动
  Game.prototype.bindKey = function() {
    document.addEventListener(
      "keydown",
      function(e) {
        let code = e.keyCode;
        switch (code) {
          case 37:
            this.snake.direction = -2;
            break;
          case 38:
            this.snake.direction = 1;
            break;
          case 39:
            this.snake.direction = 2;
            break;
          case 40:
            this.snake.direction = -1;
            break;
        }
      }.bind(this),
      false
    );
  };
  window.Game = Game;
})();
