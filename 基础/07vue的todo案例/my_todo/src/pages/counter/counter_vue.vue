<template>
<div class="wrap">
    <ul>
    <li><button @click='increment'>增加1</button></li>
    <li><button @click='oddIncrement'>奇数才加1</button></li>
    <li><button @click='afterIncrement'>1s后才加1</button></li>
</ul>
<div style="clear:both"></div>
<p>计数器的值:{{count}}<span>{{numbertype}}</span></p>
</div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      count: 0
    };
  },
  methods: {
    increment() {
      const { count } = this;
      this.count = count + 1;
    },
    oddIncrement() {
      const { count } = this;
      if (count % 2 === 1) {
        this.count = count + 1;
      }
    },
    afterIncrement() {
      setTimeout(() => {
        const { count } = this;
        this.count = count + 1;
      }, 1000);
    }
  },
  computed: {
    numbertype() {
      return this.count % 2 == 1 ? "奇数" : "偶数";
    }
  }
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
.wrap {
  width: 600px;
  margin: 60px auto;
  padding: 20px;
}
li {
  list-style: none;
  float: left;
  border: 0px;
}
li button {
  display: inline-block;
  width: 120px;
  height: 30px;
  color: orangered;
  background-color: orange;
  border: 1px solid orangered;
  margin-right: 20px;
}

li button:focus {
  outline: none;
}
</style>

