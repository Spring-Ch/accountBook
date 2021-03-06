<template>
  <div class="tags">
    <ul class="current">
      <li v-for="(tag, i) in tagList" :key="i" @click="toggle(tag)">
        <Icon
          :name="tag.iconName"
          :class="{ selected: record.selectedTag.name === tag.name }"
        />
        <span class="label">{{ tag.name }}</span>
      </li>
      <li class="new" @click="createTag">
        <Icon name="add" />
        <span class="label">添加</span>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class Tags extends Vue {
  // 当页面生成时，获取标签数组
  created() {
    this.$store.commit("getTagList");
    this.$store.commit("initialRecord");
  }
  //设置一个数组，用来放置被选中的标签
  @Prop() readonly selectedTag!: Tag;
  get record() {
    return this.$store.state.record;
  }
  get tagList() {
    return this.$store.state.tagList.filter(
      (item: { type: string }) => item.type === this.record.type
    );
  }
  // 默认选中第一个标签，通过点击切换选中的样式
  toggle(tag: Tag) {
    this.$emit("update:selectedTag", tag);
  }
  // 添加新标签
  createTag() {
    this.$store.commit("createTag");
  }
}
</script>
<style lang="scss" scoped>
.tags {
  height: 220px;
  overflow: auto;
  background: #fff;
  padding: 16px;
  flex-grow: 1;
  .current {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #000;
      width: 25%;
      height: 25%;
      margin: 5px 0;
      .icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        &.selected {
          background-color: #ffda47;
        }
      }
    }
  }
  .label {
    display: block;
    font-size: 12px;
    text-align: center;
    width: 100%;
  }
}
</style>
