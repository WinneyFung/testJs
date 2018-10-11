<template>
<div class="wrapper">
    <div class="top">
            <input type="text" v-model="nTodo" @keyup.enter="add"><button @click="add">添加</button><button @click="clean">清空</button>
    </div>
    <div class="todos">
        <todo-title title="我的计划--0.0"></todo-title>
        <ul>
            <li v-for="(todo,index) in todoList" :key="index"  :class="{done:todo.done}" @click="troggle(index)">{{index+1}}.{{todo.text}}</li>
        </ul>
        <p>{{remain}}/{{todoList.length}}</p>
    </div>
</div>
</template>
<script>
import todoTitle from "@/components/todoTitle";
export default {
  name: "index",
  components: {
    "todo-title": todoTitle
  },
  data() {
    return {
      mytitle: "今天计划",
      nTodo: "",
      todoList: [
        { text: "学习1小时", done: false },
        { text: "学习2小时", done: false },
        { text: "学习3小时", done: false },
        { text: "学习4小时", done: false }
      ]
    };
  },
  methods: {
    add() {
      if (this.nTodo.length == 0) {
        return;
      }
      this.todoList.push({ text: this.nTodo, done: false });
      this.nTodo = "";
    },
    clean(index) {
      //将已经完成的清空
      this.todoList = this.todoList.filter(todo => !todo.done);
    },
    troggle(index) {
      let hasDone = this.todoList[index].done;
      this.todoList[index].done = !hasDone;
    }
  },
  computed: {
    remain() {
      return this.todoList.filter(todo => !todo.done).length;
    }
  }
};
</script>
<style>
.top button {
  margin-left: 10px;
  width: 80px;
}
.top input {
  width: 150px;
}
.done {
  text-decoration: line-through;
  color: red;
}

.todos {
  width: 320px;
  margin: 40px auto;
}

.todos li {
  height: 30px;
  width: 100%;
  line-height: 30px;
}

.todos ul li:hover {
  background-color: #dce3e6;
}

.todos li:nth-child(even) {
  background-color: #ccc;
}
.todos li:nth-child(odd) {
  background-color: #fff;
}
</style>

