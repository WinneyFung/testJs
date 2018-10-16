<template>
<div class="todo-header">
    <input type="text" placeholder="请输入你的任务名称，按回车键确认" v-model="content" @keyup.enter="add" />
</div>
</template>

<script>
export default {
  name: "",
  props: {
    addTodo: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      content: ""
    };
  },
  methods: {
    add() {
      const { content } = this;
      const todo = {
        content: content,
        complete: false
      };
      if (content.trim()) {
        this.addTodo(todo);
        this.content = "";
      }
    }
  }
};
</script>

<style scoped>
</style>
