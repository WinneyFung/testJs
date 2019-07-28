<template>
<div class="todo-container">
    <div class="todo-wrap">
        <todo-header/>
        <todo-list/>
        <todo-footer/>
    </div>
</div>
</template>

<script>
import TodoHeader from "@/components/todo_03/TodoHeader";
import TodoFooter from "@/components/todo_03/TodoFooter";
import TodoList from "@/components/todo_03/TodoList";
import storageUtils from "@/utils/storageUtils";
import { mapState } from "vuex";
export default {
  name: "todoApp",
  components: {
    TodoHeader,
    TodoFooter,
    TodoList
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>

<style scoped>
</style>
