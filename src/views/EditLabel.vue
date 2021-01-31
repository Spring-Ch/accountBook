<template>
  <Layout>
    <div class="header">
      <router-link to="/labels">
        <Icon name="left" />
      </router-link>
      <span>编辑标签</span>
    </div>
    <div class="note-wrapper">
      <label class="notes">
        <span class="name">标签名</span>
        <input type="text" v-model="name" @change="onNameChanged" />
      </label>
    </div>
    <div class="button-wrapper">
      <button @click="deleteTag">删除标签</button>
    </div>
  </Layout>
</template>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import tagListModel from "@/models/tagListModel.ts";

type Tag = {
  id: string;
  name: string;
};

@Component
export default class EditLabel extends Vue {
  id = "";
  name = "";
  tags: Tag[] = [];
  created() {
    this.id = this.$route.params.id;
    this.tags = tagListModel.fetch();
    const tag = this.tags.filter(
      (item: { id: string }) => item.id === this.id
    )[0];
    if (tag) {
      this.name = tag.name;
    } else {
      this.$router.push("/404");
    }
  }
  // 修改标签名
  onNameChanged() {
    const names = this.tags.map((item) => item.name);
    if (this.name === "" || this.name.trim() === "") {
      window.alert("标签名不能为空");
    } else if (names.indexOf(this.name) >= 0) {
      window.alert("标签名已存在，请重新输入");
    } else {
      const index = this.tags.findIndex((item) => item.id === this.id);
      this.tags.splice(index, 1, { id: this.name, name: this.name });
      tagListModel.save(this.tags);
      window.alert("标签修改成功");
    }
  }
  // 删除标签名
  deleteTag() {
    const index = this.tags.findIndex((item) => item.id === this.id);
    this.tags.splice(index, 1);
    tagListModel.save(this.tags);
    this.$router.push("/labels");
  }
}
</script>
<style lang="scss" scoped>
.header {
  text-align: center;
  background-color: #fff;
  font-size: 16px;
  padding: 12px 23px;
  svg {
    float: left;
    height: 20px;
    width: 20px;
    font-size: 18px;
  }
}
.note-wrapper {
  margin-top: 8px;
  background-color: #fff;
  .notes {
    height: 44px;
    display: flex;
    align-items: center;
    font-size: 16px;
  }
  .name {
    padding: 0 16px;
  }
  input {
    background-color: transparent;
    border: none;
    flex-grow: 1;
  }
}
.button-wrapper {
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