<template>
<ul :class="[isEmpty?'todo-empty':'todo-main']">
  <span class="note" v-if="isEmpty">暂无数据</span>
    <todo-item v-for="(todo,index) in todos" :index="index" :todo="todo" :key="index"></todo-item>
</ul>
</template>

<script>
import TodoItem from "@/components/todo_03/TodoItem";
import { mapState } from "vuex";
import storageUtils from "@/utils/storageUtils";
export default {
  name: "",
  props: {},
  components: {
    TodoItem
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["todos"]),
    isEmpty() {
      return this.todos.length === 0;
    }
  },
  watch: {
    todos: {
      deep: true,
      handler: storageUtils.saveTodos
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
