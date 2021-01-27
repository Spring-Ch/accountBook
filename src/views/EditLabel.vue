<template>
  <Layout>
    <div class="header">
      <Icon name="left" />
      <span>编辑标签</span>
    </div>
    <div class="note-wrapper">
      <label class="notes">
        <span class="name">标签名</span>
        <input type="text" v-model="name" />
      </label>
    </div>
    <div class="button-wrapper">
      <button>删除标签</button>
    </div>
  </Layout>
</template>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import tagListModel from "@/models/tagListModel.ts";

@Component
export default class EditLabel extends Vue {
  name = "";
  created() {
    const id = this.$route.params.id;
    const tags = tagListModel.fetch();
    const tag = tags.filter((item: { id: string }) => item.id === id)[0];
    this.name = tag.name;
    if (tag) {
      console.log(tag);
    } else {
      this.$router.push("/404");
    }
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