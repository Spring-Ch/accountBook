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
        <input type="text" v-model="newTag.name" @change="editTag" />
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

@Component({
  computed: {
    tagList() {
      return this.$store.state.tagList;
    },
  },
})
export default class EditLabel extends Vue {
  newTag: Tag = {
    id: "",
    name: "",
  };

  created() {
    this.newTag.id = this.$route.params.id;
    this.$store.commit("getTagList");
    const tag = this.$store.state.tagList.filter(
      (item: { id: string }) => item.id === this.newTag.id
    )[0];
    if (!tag) {
      this.$router.push("/404");
    } else {
      this.newTag.name = tag.name;
    }
  }
  // 修改标签名
  editTag() {
    this.$store.commit("editTag", this.newTag);
  }
  // 删除标签名
  deleteTag() {
    this.$store.commit("deleteTag", this.newTag);
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