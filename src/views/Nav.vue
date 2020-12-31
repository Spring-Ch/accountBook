<template>
  <div>
    <router-link to="/labels">标签</router-link> |
    <router-link to="/money"
      >记账
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#money" />
      </svg>
    </router-link>
    |
    <router-link to="/statistics">统计</router-link>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import x from "@/assets/icon/money.svg";
console.log(x);
export default Vue.extend({});
</script>
<style lang="scss" scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
