<template>
<div class="p-constainer">
  <h3><span class="star">⭐⭐⭐⭐⭐</span>爆款<span class="star">⭐⭐⭐⭐⭐</span></h3>
    <ul>
        <li v-for="(product,index) in products" :key="index">
          <span>{{index+1}}</span>
          <a>产品：{{product.title}}</a>
          <span>价格：{{product.price}}</span>
          <span>库存：{{product.inventory}}</span> <span class="mean" v-if="product.inventory<=2">{{product.inventory==0?"缺货":"库存紧张"}}</span>
          <button :disabled="product.inventory <=0" @click="addToCart(product)">买买买</button>
        </li>
    </ul>
</div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  name: "products",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["products"])
  },
  methods: {
    ...mapActions(["addToCart"])
  },
  created() {
    //获取所有的产品列表
    this.$store.dispatch("getProducts");
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

a {
  cursor: pointer;
}
button {
  cursor: pointer;
  outline: none;
}
.p-constainer li {
  height: 50px;
  line-height: 50px;
}
.p-constainer li:hover {
  background-color: #f6f6f6;
}
.p-constainer h3 {
  text-align: center;
  font-weight: normal;
  color: orangered;
}
.p-constainer li button {
  padding: 4px 6px;
  height: 28px;
  position: relative;
  float: right;
  display: inline-block;
  border: 1px solid orange;
  background-color: orangered;
  color: #fff;
  margin-top: 10px;
}
.p-constainer li button:hover {
  border: 1px solid #ffc83d;
  background-color: #ffc83d;
  color: #f6f6f6;
}

.p-constainer li button[disabled] {
  border: 1px solid #666;
  background-color: #888;
  color: #333;
}
.star {
  color: #ffc83d;
}
.p-constainer .mean {
  background-color: red;
  color: #fff;
  font-size: 10px;
}
</style>
