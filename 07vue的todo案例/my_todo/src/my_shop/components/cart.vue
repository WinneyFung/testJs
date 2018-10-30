<template>
<div class="cart-contaioner">
    <h3>我的购物车</h3>
    <ul>
        <li v-for="(product,index) in products" :key="index">
          <span>{{index+1}}</span>
          <a>产品：{{product.title}}</a>
          <span>价格：{{product.price}}</span>
          <input class="c-min" type="button" value="-" @click="minFromCart(product)">
          <input  class="c-count" type="text" v-model="product.count" @change="changeCart(product)">
           <input class="c-add" type="button" value="+" @click="addToCart(product)">
        </li>
    </ul>
    <h4>总价：{{totalPrice | currency}}</h4>
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "cart",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({ products: "cartProduts" }),
    totalPrice() {
      return this.products.reduce(
        (preTotal, product) => preTotal + product.count * product.price,
        0
      );
    }
  },
  methods: {
    ...mapActions(["minFromCart"]),
    addToCart(product) {
      const p = this.$store.state.products.products.find(
        p => p.id === product.id
      );
      this.$store.dispatch("addToCart", p);
    },
    changeCart(product) {
      const p = this.$store.state.products.products.find(
        p => p.id === product.id
      );
      const maxCount = p.max;
      debugger;
      const count = product.count ? Number.parseInt(product.count) : 0;
      if (count > maxCount) {
        product.count = maxCount;
      } else if (count <= 0) {
        product.count = 0;
      }
      this.$store.dispatch("editCartCount", product);
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.c-count {
  width: 50px;
  float: right;
}
.cart-contaioner li {
  height: 50px;
  line-height: 50px;
}
.cart-contaioner li:hover {
  background-color: #f6f6f6;
}
.c-min,
.c-add {
  box-sizing: content-box;
  width: 20px;
  margin: 0 2px;
  float: right;
  padding: 0 2px;
}
</style>
