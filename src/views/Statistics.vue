<template>
  <Layout>
    <Types :type.sync="selectedType" classPrefix="type" />
  </Layout>
</template>
<script lang="ts">
import Vue from "vue";
import Types from "@/components/Money/Types.vue";
import { Component } from "vue-property-decorator";

@Component({
  components: { Types },
})
export default class Statistics extends Vue {
  selectedType = "-";
}
</script>
<style lang="scss" scoped>
::v-deep .type-item {
  background-color: #fff;
  &.selected {
    background-color: #c4c4c4;
    &::after {
      display: none;
    }
  }
}
</style>