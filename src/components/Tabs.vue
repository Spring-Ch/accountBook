<template>
  <ul class="tabs">
    <li
      v-for="item in dataSource"
      :key="item.value"
      class="tabs-item"
      :class="{
        [classPrefix + '-tabs-item ']: classPrefix,
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
  // 数据源
  @Prop({ required: true, type: Array }) dataSource!: DataSourceItem[];
  // 当前选中的项目
  @Prop() readonly type: string | undefined;
  // 外部修改选中项的样式
  @Prop(String) classPrefix?: string;
  selectedChange(item: DataSourceItem) {
    this.$emit("update:type", item.value);
  }
}
</script>
<style lang="scss" scoped>
.tabs {
  display: flex;
  background-color: #c4c4c4;
  font-size: 24px;
  color: #000;
  text-align: center;
  &-item {
    display: flex;
    position: relative;
    flex-grow: 1;
    height: 64px;
    justify-content: center;
    align-items: center;
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