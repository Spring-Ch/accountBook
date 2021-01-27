<template>
  <Layout>
    <ol class="tags">
      <li v-for="(tag, i) in tags" :key="i">
        <span>{{ tag }}</span> <Icon name="right" />
      </li>
    </ol>
    <div class="newTagWrapper">
      <button @click="createTag">新建标签</button>
    </div>
  </Layout>
</template>
<script lang="ts">
import Vue from "vue";
import Icon from "@/components/Icon.vue";
import { Component } from "vue-property-decorator";
import tagListModel from "@/models/tagListModel.ts";

@Component({
  components: { Icon },
})
export default class Labels extends Vue {
  tags: string[] = [];
  created() {
    this.tags = tagListModel.fetch();
  }
  // 新建标签
  createTag() {
    const newTagName = window.prompt("请输入新的标签名") as string;
    if (newTagName === "" || newTagName.trim() === "") {
      window.alert("标签名不能为空");
    } else if (this.tags.indexOf(newTagName) >= 0) {
      window.alert("标签名已存在，请输入新的标签名");
    } else {
      this.tags.push(newTagName);
    }
    tagListModel.save(this.tags);
  }
}
</script>
<style lang="scss" scoped>
.tags {
  background-color: #fff;
  li {
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