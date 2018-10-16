<template>
<div class="todo-container">
    <div class="todo-wrap">
        <!-- <todo-header :addTodo="addTodo"></todo-header> -->
        <!-- 避免传递函数 使用自定义事件触发 -->
        <todo-header ref="todoHeader"></todo-header>
        <todo-list :todos="todos" :deleteTodo="deleteTodo"></todo-list>
        <todo-footer>
            <label slot="checkAll">
                <input type="checkbox" v-model="checkAll"/>
            </label>
            <span slot="size" >
                <span>已完成{{completed}}</span> / 全部{{todos.length}}
            </span>
            <button slot="delete" class="btn btn-danger" @click="deleteAllDone">清除已完成任务</button>
        </todo-footer>
        <!-- <todo-footer :todos="todos" :deleteAllDone="deleteAllDone" :selectAll="selectAll"></todo-footer> -->
    </div>
</div>
</template>

<script>
import TodoHeader from "@/components/todo_02/TodoHeader";
import TodoFooter from "@/components/todo_02/TodoFooter";
import TodoList from "@/components/todo_02/TodoList";
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
  },
  mounted() {
    //添加自定义事件addTodo的监听 一旦监听到addTodo事件的触发 就立即执行this.addTodo方法
    //触发事件的参数会自动接收
    this.$refs.todoHeader.$on("addTodo", this.addTodo);
    //订阅消息 addTodo
    this.$PubSub.subscribe("deleteTodo", (msg, index) => {
      this.deleteTodo(index);
      // console.log(msg); //"deleteTodo"
    });
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
