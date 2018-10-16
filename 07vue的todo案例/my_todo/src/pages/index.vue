<template>
<ul>
  <li><router-link to="/todo">前往待办事项app:/todo</router-link></li>
  <li><router-link to="/new/todo">前往待办事项app:/new/todo</router-link></li>
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
