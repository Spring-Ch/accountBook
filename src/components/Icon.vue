<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="'#' + name" />
  </svg>
</template>
<script lang="ts">
import Vue from "vue";
// 整体导入svg文件，不需要单独import文件
const importAll = (requireContext: __WebpackModuleApi.RequireContext) =>
  requireContext.keys().forEach(requireContext);
try {
  importAll(require.context("../assets/icon", true, /\.svg$/));
} catch (e) {
  console.log(e);
}

export default Vue.extend({
  props: ["name"],
});
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
