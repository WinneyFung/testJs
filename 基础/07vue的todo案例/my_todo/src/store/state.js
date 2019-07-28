/* 当所有的state、actions、mutations、getters都在放在一个文件的时候就这么写
const state = {
  count: 10 //给数初始化值
}; */

/**
 *相当于data中的数据
 */
import storageUtils from "../utils/storageUtils";
export default {
  count: 10,
  todos: storageUtils.readTodos()
};
