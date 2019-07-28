<template>
<ul :class="[isEmpty?'todo-empty':'todo-main']">
  <span class="note" v-if="isEmpty">暂无数据</span>
    <todo-item v-for="(todo,index) in todos" :index="index" :todo="todo" :key="index" :deleteTodo="deleteTodo"></todo-item>
</ul>
</template>

<script>
import TodoItem from "@/components/todo_02/TodoItem";
export default {
  name: "",
  props: ["todos", "deleteTodo"], // 会成为当前组件对象的属性, 可以在模板中直接访问, 也可以通过this来访问
  components: {
    TodoItem
  },
  data() {
    return {};
  },
  computed: {
    isEmpty() {
      return this.todos.length === 0;
    }
  }
};
</script>

<style scoped>
.note {
  text-align: center;
  color: #c4c4c4;
  display: block;
}
</style>
