<template>
<div class="todo-footer">
    <label>
        <input type="checkbox" v-model="checkAll"/>
    </label>
    <span>
        <span>已完成{{completed}}</span> / 全部{{todos.length}}
    </span>
    <button class="btn btn-danger" @click="deleteComplete">清除已完成任务</button>
</div>
</template>

<script>
export default {
  name: "",
  props: {
    todos: Array,
    deleteAllDone: Function,
    selectAll: Function
  },
  data() {
    return {};
  },
  methods: {
    deleteComplete() {
      this.deleteAllDone();
    }
  },
  computed: {
    completed() {
      return this.todos.reduce(
        (preSum, todo) => (preSum += todo.complete ? 1 : 0),
        0
      );
    },
    checkAll: {
      set(value) {
        this.selectAll(value);
      },
      get() {
        return this.completed === this.todos.length && this.completed > 0;
      }
    }
  }
};
</script>

<style scoped>
</style>
