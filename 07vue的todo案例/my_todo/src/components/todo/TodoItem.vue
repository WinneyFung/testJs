<template>
<li @mouseenter="handlerEnter(true)" @mouseleave="handlerEnter(false)" :style="{background:bgc}">
    <label for="check">
    <input type="checkbox" v-model="todo.complete" id="check"/>
    <span>{{todo.content}}</span>
    </label>
    <button class="btn btn-danger" v-show="isEnter" @click="del(index)">删除</button>
</li>
</template>

<script>
export default {
  name: "todoItem",
  props: { todo: Object, deleteTodo: Function, index: Number }, // 会成为当前组件对象的属性, 可以在模板中直接访问, 也可以通过this来访问
  data() {
    return { isEnter: false, bgc: "#fff" };
  },
  methods: {
    handlerEnter(isEnter) {
      this.bgc = isEnter ? "#eee" : "#ffff";
      this.isEnter = isEnter;
    },
    del(index) {
      const confirm = window.confirm("确认删除吗?");
      if (confirm) {
        this.deleteTodo(index);
      }
    }
  }
};
</script>

<style scoped>
</style>

