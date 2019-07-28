import shop from "@/my_shop/api/shop";
import {
  RECEIVE_PRODUCTS,
  ADD_TO_CART,
  MIN_FROM_CART,
  EDIT_CART_COUNT
} from "../type";

const state = {
  products: []
};

const mutations = {
  //设置产品列表
  [RECEIVE_PRODUCTS](state, { products }) {
    state.products = products;
  },
  [ADD_TO_CART](state, { id }) {
    state.products.find(p => p.id === id).inventory--;
  },
  [MIN_FROM_CART](state, { id }) {
    const product = state.products.find(product => product.id === id);
    if (product) {
      product.inventory++;
    }
  },
  [EDIT_CART_COUNT](state, { id, count }) {
    const p = state.products.find(p => p.id === id);
    if (p) {
      p.inventory = p.max - count;
    }
  }
};

const actions = {
  getProducts({ commit }) {
    //通过api的接口获取产品，并且将产品列表放到vuex中存储
    shop.getProducts(products => {
      commit(RECEIVE_PRODUCTS, { products });
    });
  }
};

const getters = {
  products(state) {
    return state.products;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
