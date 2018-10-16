import Vue from "vue";
import Router from "vue-router";
import Index from "@/pages/index";
import TodoApp from "@/pages/todo/TodoApp";
import NewTodoApp from "@/pages/todo_02/TodoApp";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Index",
      component: Index
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
    }
  ]
});
