/**
 * 包含n个mutations名称的常量
 */
//自增1
export const INCREMENT = "increment";
//异步自增
export const INCREMENT_SYNC = "increment_sync";
//奇数才自增
export const INCREMENT_ODD = "increment_odd";

//--------------------------------todo app-------------------------------
//添加todo
export const ADD_TODO = "add_todo";
export const DELETE_TODO = "delete_todo";
export const CHECK_ALL_TODO = "check_all_todo";
export const DELETE_ALL_COMPLETED = "delete_all_completed";

//-------------------------------------my shop app----------------------------------
export const RECEIVE_PRODUCTS = "receive_products";
export const ADD_TO_CART = "add_to_cart";
export const CHECKOUT_REQ = "checkout_req";
export const CHECKOUT_SUCCESS = "checkout_success";
export const CHECKOUT_FAILURE = "checkout_failure";
export const MIN_FROM_CART = "min_from_cart";
export const EDIT_CART_COUNT = "edit_cart_count";
