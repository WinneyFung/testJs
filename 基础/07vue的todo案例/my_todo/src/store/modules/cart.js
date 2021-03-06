import {
  ADD_TO_CART,
  CHECKOUT_REQ,
  CHECKOUT_SUCCESS,
  CHECKOUT_FAILURE,
  MIN_FROM_CART,
  EDIT_CART_COUNT
} from "../type";
import shop from "@/my_shop/api/shop";
import storageUtils from "@/utils/storageUtils";
const state = {
  items: storageUtils.readCarts(), // 每个元素对象: id/count
  checkoutStatus: null
};

const mutations = {
  [ADD_TO_CART](state, { id }) {
    const item = state.items.find(item => item.id === id);
    if (item) {
      item.count++;
    } else {
      state.items.unshift({
        id,
        count: 1
      });
    }
  },

  [CHECKOUT_REQ](state) {
    state.items = [];
    state.checkoutStatus = null;
  },

  [CHECKOUT_SUCCESS](state) {
    state.checkoutStatus = "提交成功";
  },

  [CHECKOUT_FAILURE](state, { items }) {
    state.items = items;
    state.checkoutStatus = "提交失败";
  },
  [MIN_FROM_CART](state, { id }) {
    const item = state.items.find(item => item.id == id);
    if (item) {
      item.count--;
    }
    state.items = state.items.filter(item => item.count > 0);
  },
  /**
   * 设置购物车的数目
   * @param {*} state
   * @param {*} param1
   */
  [EDIT_CART_COUNT](state, { id, count }) {
    const item = state.items.find(item => item.id === id);
    if (item) {
      item.count = count;
      state.items = state.items.filter(item => item.count > 0);
    }
  }
};

const actions = {
  checkout({ commit }, cartProducts) {
    var items = [...state.items]; // state.items
    //发出请求
    commit(CHECKOUT_REQ);
    //调用提交订单接口服务
    shop.buyProducts(
      cartProducts,
      //成功的回调函数
      () => commit(CHECKOUT_SUCCESS),
      //失败的回调函数
      () => commit(CHECKOUT_FAILURE, { items })
    );
  }
};

const getters = {
  checkoutStatus(state) {
    return state.checkoutStatus;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
