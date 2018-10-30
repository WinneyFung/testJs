
<template>
<div class="main">
    <ww-products></ww-products>
    <ww-cart style="margin-top:20px"></ww-cart>
</div>
</template>

<script>
import WWProducts from "@/my_shop/components/products";
import WWCart from "@/my_shop/components/cart";
export default {
  name: "myShop",
  components: { "ww-products": WWProducts, "ww-cart": WWCart },
  data() {
    return {};
  }
};
</script>

<style scoped>
.main {
  width: 800px;
  margin: 60px auto;
}
</style>
