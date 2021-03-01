<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>
<style lang="scss">
@import "~@/assets/style/helper.scss";
@import "~@/assets/style/reset.scss";
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  font-family: $font-hei;
  line-height: 1.5;
  font-size: 16px;
  background-color: #f5f5f5;
}
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
#app {
  max-width: 500px;
  margin: 0 auto;
}
</style>
