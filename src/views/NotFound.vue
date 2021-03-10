<template>
  <div class="wrapper">
    <h1>404，未找到对应资源</h1>
    <router-link to="/" class="back">返回首页</router-link>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30vh;
  h1 {
    color: red;
  }
  .back {
    color: blue;
  }
}
</style>