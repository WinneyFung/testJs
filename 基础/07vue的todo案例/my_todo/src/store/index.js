/*
vuex核心管理模块store对象
 */
import Vue from "vue";
import Vuex from "vuex";

import state from "./state";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
import cart from "./modules/cart";
import products from "./modules/products";
Vue.use(Vuex);
//使用Store的构造函数创建一个Store实例对象
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    cart,
    products
  }
});
