<template>
<div>
    <label>
      <input type="checkbox" v-model="checkAll"/>
    </label>
    <span>
          <span>已完成{{completeSize}}</span> / 全部{{totalSize}}
        </span>
    <button class="btn btn-danger" v-show="completeSize" @click="deleteAllCompleted">清除已完成任务</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "TodoFooter",
  data() {
    return {};
  },
  computed: {
    // ...mapActions(["deleteAllCompleted"]),
    ...mapGetters(["completeSize", "totalSize"]),
    checkAll: {
      get() {
        return this.$store.getters.isCheckAll;
      },
      set(value) {
        this.$store.dispatch("setCheckAll", value);
      }
    }
  },
  methods: {
    deleteAllCompleted() {
      const confirm = window.confirm("确定删除所有已完成事项?");
      if (confirm) {
        this.$store.dispatch("deleteAllCompleted");
      }
    }
  }
};
</script>

<style scoped>
</style>
