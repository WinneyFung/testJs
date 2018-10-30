// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import "../static/todoApp/index.css";
//发布订阅
import PubSub from "pubsub-js";
//将pubsub挂载到vue实例上
Vue.config.productionTip = false;
Vue.prototype.$PubSub = PubSub;
//引入store
import store from "./store";
import { currency } from "./utils/currency";
Vue.filter("currency", currency);
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>",
  store
});
