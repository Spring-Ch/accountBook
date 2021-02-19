<template>
  <ul class="tabs">
    <li
      v-for="item in dataSource"
      :key="item.value"
      :class="{
        [classPrefix + '-item']: classPrefix,
        selected: item.value === type,
      }"
      @click="selectedChange(item)"
    >
      {{ item.text }}
    </li>
  </ul>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

type DataSourceItem = {
  text: string;
  value: string;
};
@Component
export default class Types extends Vue {
  @Prop({ required: true, type: Array }) dataSource!: DataSourceItem[];
  @Prop() readonly type: string | undefined;
  @Prop(String) classPrefix?: string;
  selectedChange(item: DataSourceItem) {
    this.$emit("update:type", item.value);
  }
}
</script>
<style lang="scss" scoped>
.tabs {
  display: flex;
  height: 64px;
  line-height: 64px;
  background-color: #c4c4c4;
  font-size: 24px;
  color: #000;
  text-align: center;
  li {
    position: relative;
    flex-grow: 1;
  }
  .selected::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 4px;
    background-color: #333;
  }
}
</style>