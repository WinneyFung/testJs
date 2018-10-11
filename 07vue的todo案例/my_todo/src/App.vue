<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
#app {
  font-family: "微软雅黑", Helvetica, Arial, sans-serif;
  margin-top: 60px;
  text-align: center;
}
</style>
