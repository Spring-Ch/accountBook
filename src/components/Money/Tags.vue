<template>
  <div class="tags">
    <ul class="current">
      <li
        v-for="(tag, i) in tagList"
        :key="i"
        @click="toggle(tag)"
        :class="{ selected: selectedTag.indexOf(tag) >= 0 }"
      >
        {{ tag.name }}
      </li>
    </ul>
    <div class="new">
      <button @click="createTag">新增标签</button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({
  computed: {
    tagList() {
      return this.$store.state.tagList;
    },
  },
})
export default class Tags extends Vue {
  // 当页面生成时，获取标签数组
  created() {
    this.$store.commit("getTagList");
  }
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
  createTag() {
    this.$store.commit("createTag");
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