<template>
<div class="wrap">
    <ul>
    <li><button @click='increment'>增加1</button></li>
    <li><button @click='oddIncrement'>奇数才加1</button></li>
    <li><button @click='afterIncrement'>1s后才加1</button></li>
</ul>
<div style="clear:both"></div>
<p>计数器的值:{{getCount}}<span>{{getCountType}}</span></p>
</div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      //直接放在state中管理
      //   count: 0
    };
  },
  methods: {
    increment() {
      /*  const { count } = this;
      this.count = count + 1; */
      //   this.$store.increment(); 错误
      this.$store.dispatch("increment");
    },
    oddIncrement() {
      /*  const { count } = this;
      if (count % 2 === 1) {
        this.count = count + 1;
      } */
      this.$store.dispatch("incrementOdd");
    },
    afterIncrement() {
      /* setTimeout(() => {
        const { count } = this;
        this.count = count + 1;
      }, 1000); */
      this.$store.dispatch("incrementSync");
    }
  },
  computed: {
    getCount() {
      return this.$store.state.count;
    },
    getCountType() {
      return this.$store.getters.getCountType;
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
  border: 1px solid orangered;
  margin-right: 20px;
}

li button:focus {
  outline: none;
}
</style>

