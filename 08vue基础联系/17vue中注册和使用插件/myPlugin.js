(function(window) {
  const MyPlugin = {};
  MyPlugin.install = function(Vue, options) {
    // 1. 添加全局方法或属性
    Vue.myGlobalMethod = function() {
      alert("执行vue的全局方法:myGlobalMethod");
    };

    // 2. 添加全局资源
    Vue.directive("my-directive", function(el, binding) {
      el.textContent = "自定义指令有效果:" + binding.value;
    });

    // 4. 添加实例方法
    Vue.prototype.$myMethod = function() {
      alert("执行vue实例对象的方法:$myMethod");
    };
  };
  window.MyPlugin = MyPlugin;
})(window);
