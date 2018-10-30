/* const actions = {};
 */
/***
 *
 * 包含n个间接更新对象的方法
 */
import {
  INCREMENT,
  ADD_TODO,
  DELETE_TODO,
  CHECK_ALL_TODO,
  DELETE_ALL_COMPLETED,
  ADD_TO_CART,
  MIN_FROM_CART,
  EDIT_CART_COUNT
} from "./type";
export default {
  //自增
  increment({ commit }) {
    commit(INCREMENT);
  },
  incrementSync({ commit }) {
    setTimeout(() => {
      commit(INCREMENT);
    }, 1000);
  },
  /**
   * 还可以接收state对象
   * @param {} param0
   */
  incrementOdd({ commit, state }) {
    if (state.count % 2 == 1) {
      commit(INCREMENT);
    }
  },
  addTodo({ commit }, todo) {
    commit(ADD_TODO, { todo });
  },
  deleteTodo({ commit }, index) {
    commit(DELETE_TODO, { index });
  },
  setCheckAll({ commit }, isCheckAll) {
    commit(CHECK_ALL_TODO, { isCheckAll });
  },
  deleteAllCompleted({ commit }) {
    commit(DELETE_ALL_COMPLETED);
  },
  /************************************myShop app*********************************** */
  addToCart({ commit }, p) {
    if (p.inventory) {
      commit(ADD_TO_CART, { id: p.id });
    }
  },
  minFromCart({ commit }, item) {
    //当且仅当购物车产品大于0时才能减少
    if (item.count) {
      commit(MIN_FROM_CART, { id: item.id });
    }
  },
  editCartCount({ commit }, item) {
    //当且仅当购物车产品大于0时才能减少
    commit(EDIT_CART_COUNT, { id: item.id, count: item.count });
  }
};
