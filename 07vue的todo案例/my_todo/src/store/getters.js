/* const getters = {}; */
export default {
  getCountType(state) {
    return state.count % 2 == 0 ? "偶数" : "奇数";
  },
  getTodos(state) {
    return state.todos;
  },
  //---------------------todo app-----------------------
  completeSize(state) {
    return state.todos.reduce(
      (preSum, todo) => preSum + (todo.complete ? 1 : 0),
      0
    );
  },
  totalSize(state) {
    return state.todos.length;
  },
  isCheckAll(state, getters) {
    return getters.completeSize === getters.totalSize && getters.totalSize > 0;
  },
  //******************************myShop app******************************* */
  cartProduts(state) {
    return state.cart.items.map(({ id, count }) => {
      var p = state.products.products.find(p => p.id === id);
      return {
        id,
        count,
        title: p.title,
        price: p.price
      };
    });
  }
};
