<template>
<div class="todo-footer">
    <label>
        <slot name="checkAll"></slot>
    </label>
    <span>
        <slot name="size"></slot>
    </span>
        <slot name="delete"></slot>
</div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped>
</style>
