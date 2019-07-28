<template>
<div class="todo-container">
    <div class="todo-wrap">
        <todo-header :addTodo="addTodo"></todo-header>
        <todo-list :todos="todos" :deleteTodo="deleteTodo"></todo-list>
        <todo-footer :todos="todos" :deleteAllDone="deleteAllDone" :selectAll="selectAll"></todo-footer>
    </div>
</div>
</template>

<script>
import TodoHeader from "@/components/todo/TodoHeader";
import TodoFooter from "@/components/todo/TodoFooter";
import TodoList from "@/components/todo/TodoList";
import storageUtils from "@/utils/storageUtils";
export default {
  name: "todoApp",
  components: {
    TodoHeader,
    TodoFooter,
    TodoList
  },
  data() {
    return {
      todos: storageUtils.readTodos()
    };
  },
  watch: {
    todos: {
      deep: true,
      /*handler: function (val) {
          // 将数据(json)保存到localStorage
          // localStorage.setItem('todos_key', JSON.stringify(val))
          storageUtils.saveTodos(val)
        }*/
      // handler的值应该是一个函数, 且函数应该要有一个形参(接收todos最新的值)
      handler: storageUtils.saveTodos
      /*handler: function  (todos) {
          localStorage.setItem(TODOS_KEY, JSON.stringify(todos))
        }*/
    }
  },
  methods: {
    addTodo(todo) {
      this.todos.unshift(todo);
    },
    deleteTodo(index) {
      this.todos.splice(index, 1);
    },
    deleteAllDone() {
      this.todos = this.todos.filter(todo => !todo.complete);
    },
    selectAll(selected) {
      this.todos.forEach(todo => {
        todo.complete = selected;
      });
    }
  }
};
</script>

<style scoped>
</style>
