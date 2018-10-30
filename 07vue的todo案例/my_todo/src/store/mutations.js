// const mutations = {};
/* 用于直接更新对象状态的方法对象模块 */
import {
  INCREMENT,
  ADD_TODO,
  DELETE_TODO,
  CHECK_ALL_TODO,
  DELETE_ALL_COMPLETED
} from "./type";
export default {
  [INCREMENT](state) {
    state.count++;
  },
  [ADD_TODO](state, { todo }) {
    state.todos.unshift(todo);
  },
  [DELETE_TODO](state, { index }) {
    state.todos.splice(index, 1);
  },
  [CHECK_ALL_TODO](state, { isCheckAll }) {
    state.todos.forEach(todo => (todo.complete = isCheckAll));
  },
  [DELETE_ALL_COMPLETED](state) {
    state.todos = state.todos.filter(todo => !todo.complete);
  }
};
