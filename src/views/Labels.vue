<template>
  <Layout>
    <div class="tags">
      <router-link
        v-for="tag in tagList"
        :key="tag.id"
        :to="`/labels/edit/${tag.id}`"
        class="tag"
      >
        <span>{{ tag.name }}</span> <Icon name="right" />
      </router-link>
    </div>
    <div class="newTagWrapper">
      <button @click="createTag">新建标签</button>
    </div>
  </Layout>
</template>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({
  computed: {
    // 定义标签数组变量
    tagList() {
      return this.$store.state.tagList;
    },
  },
})
export default class Labels extends Vue {
  created() {
    // 当页面生成时，获取标签数组
    this.$store.commit("getTagList");
  }
  // 新建标签
  createTag() {
    this.$store.commit("createTag");
  }
}
</script>
<style lang="scss" scoped>
.tags {
  background-color: #fff;
  .tag {
    display: flex;
    min-height: 44px;
    font-size: 16px;
    color: #000;
    align-items: center;
    justify-content: space-between;
    margin-left: 16px;
    box-shadow: inset 0px -0.5px 0px #bcbbc1;
  }
  svg {
    height: 20px;
    width: 20px;
    margin-right: 20px;
    font-weight: bold;
  }
}
.newTagWrapper {
  margin-top: 44px;
  text-align: center;
  button {
    border: none;
    background-color: #767676;
    border-radius: 4px;
    font-size: 17px;
    color: #fff;
    padding: 9px 15px;
  }
}
</style>