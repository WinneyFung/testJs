<template>
<ul class="todo-main">
    <todo-item v-for="(todo,index) in todos" :index="index" :todo="todo" :key="index" :deleteTodo="deleteTodo"></todo-item>
</ul>
</template>

<script>
import TodoItem from "@/components/todo/TodoItem";
export default {
  name: "",
  props: ["todos", "deleteTodo"], // 会成为当前组件对象的属性, 可以在模板中直接访问, 也可以通过this来访问
  components: {
    TodoItem
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
</style>
