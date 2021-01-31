<template>
  <Layout>
    <div class="tags">
      <router-link
        v-for="tag in tags"
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
import Icon from "@/components/Icon.vue";
import { Component } from "vue-property-decorator";
import tagListModel from "@/models/tagListModel.ts";
import createID from "@/lib/createID.ts";

type Tag = {
  id: string;
  name: string;
};
@Component({
  components: { Icon },
})
export default class Labels extends Vue {
  tags: Tag[] = [];
  created() {
    this.tags = tagListModel.fetch();
  }
  // 新建标签
  createTag() {
    const newTagName = window.prompt("请输入新的标签名") as string;
    const names: string[] = this.tags.map((item) => item.name);
    if (newTagName === "" || newTagName.trim() === "") {
      window.alert("标签名不能为空");
    } else if (names.indexOf(newTagName) >= 0) {
      window.alert("标签名已存在，请输入新的标签名");
    } else {
      const tagID = createID();
      this.tags.push({ id: tagID, name: newTagName });
    }
    tagListModel.save(this.tags);
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