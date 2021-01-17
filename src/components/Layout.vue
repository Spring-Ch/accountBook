<template>
  <div class="layout-wrapper">
    <div class="content" :class="classPrefix && `${classPrefix}-content`">
      <slot></slot>
    </div>
    <Nav />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["classPrefix"],
});
</script>
<style lang="scss" scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  border: 1px solid red;
}
.content {
  flex-grow: 1;
  border: 1px solid blue;
  overflow: auto;
}
</style>