<template>
  <div class="tags">
    <ul class="current">
      <li v-for="(tag, i) in tagList" :key="i" @click="toggle(tag)">
        <Icon :name="tag.iconName" :class="{ selected: selectedTag === tag }" />
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
    padding-left: 10px;
    flex-wrap: wrap;
    li {
      color: #000;
      padding: 0px 16px;
      margin: 5px 10px 5px 0;
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
  }
}
</style>