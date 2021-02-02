<template>
  <div class="tags">
    <ul class="current">
      <li
        v-for="(tag, i) in tags"
        :key="i"
        @click="toggle(tag)"
        :class="{ selected: selectedTag.indexOf(tag) >= 0 }"
      >
        {{ tag.name }}
      </li>
    </ul>
    <div class="new">
      <button @click="create">新增标签</button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import tagListModel from "@/models/tagListModel.ts";

@Component
export default class Tags extends Vue {
  //定义一个属性，用来放置标签内容的数组，有外部传入
  @Prop(Array) tags: string[] | undefined;
  //设置一个数组，用来放置被选中的标签
  @Prop(Array) readonly selectedTag!: string[];
  // 选中元素后，将其放到selectedTag数组中
  toggle(tag: string) {
    const index: number = this.selectedTag.indexOf(tag);
    if (index >= 0) {
      this.selectedTag.splice(index, 1);
    } else {
      this.selectedTag.push(tag);
    }
    this.$emit("update:selectedTag", this.selectedTag);
  }
  // 添加新标签
  create() {
    this.$emit("update:tags", tagListModel.create());
  }
}
</script>
<style lang="scss" scoped>
.tags {
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 16px;
  flex-grow: 1;
  .current {
    display: flex;
    flex-grow: 1;
    flex-wrap: wrap;
    li {
      $h: 24px;
      $bg: #b9b9b9;
      height: $h;
      line-height: $h;
      border-radius: $h/2;
      color: #000;
      background-color: $bg;
      padding: 0px 16px;
      margin-right: 10px;
      &.selected {
        background-color: darken($bg, 50%);
      }
    }
  }
  .new {
    padding-top: 16px;
    font-size: 14px;
    button {
      background-color: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid #000;
      padding: 0 4px;
    }
  }
}
</style>