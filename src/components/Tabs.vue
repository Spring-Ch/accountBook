<template>
  <div class="tabsWrapper">
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
  </div>
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
.tabsWrapper {
  display: flex;
  justify-content: center;
  background-color: #ffda47;
}
.tabs {
  display: flex;
  width: 200px;
  font-size: 20px;
  color: #000;
  text-align: center;
  &-item {
    display: flex;
    position: relative;
    flex-grow: 1;
    padding: 24px 16px 8px 16px;
    justify-content: center;
    align-items: center;
  }
  .selected::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1.5px;
    background-color: #333;
  }
}
</style>