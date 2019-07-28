import Vue from "vue";
import Router from "vue-router";
import Index from "@/pages/index";
import TodoApp from "@/pages/todo/TodoApp";
import NewTodoApp from "@/pages/todo_02/TodoApp";
import VuexTodoApp from "@/pages/todo_03/TodoApp";
import Counter01 from "@/pages/counter/counter_vue";
import Counter02 from "@/pages/counter/counter_vuex";
import Myshop from "@/my_shop/pages/myShop";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Index",
      component: Index
    },
    {
      path: "/shopping",
      name: "Myshop",
      component: Myshop
    },
    {
      path: "/todo",
      name: "TodoApp",
      component: TodoApp
    },
    {
      path: "/new/todo",
      name: "NewTodoApp",
      component: NewTodoApp
    },
    {
      path: "/vuex/todo",
      name: "VuexTodoApp",
      component: VuexTodoApp
    },
    {
      path: "/counter/01",
      name: "Counter01",
      component: Counter01
    },
    {
      path: "/counter/02",
      name: "Counter02",
      component: Counter02
    }
  ]
});
