<template>
<ul>
  <li><router-link to="/todo">前往待办事项app:/todo</router-link></li>
  <li><router-link to="/new/todo">前往待办事项app:/new/todo</router-link></li>
  <li><router-link to="/vuex/todo">前往待办事项app:/vuex/todo</router-link></li>
  <li><router-link to="/counter/01">前往计数器01:/counter/01</router-link></li>
  <li><router-link to="/counter/02">前往计数器(vuex状态管理):/counter/02</router-link></li>
  <li><router-link to="/shopping">前往shopping</router-link></li>
</ul>
</template>

<script>
export default {
  name: "index",
  data() {
    return {};
  }
};
</script>

<style scoped>
a {
  font-size: 18px;
}
</style>
