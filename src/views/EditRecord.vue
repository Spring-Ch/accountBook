<template>
  <div class="editRecordWrapper" :style="{ height: h + 'px' }">
    <div class="header">
      <div class="back">
        <router-link to="/item">
          <Icon name="left" />
        </router-link>
      </div>
      <h3 class="title">
        <div><Icon :name="record.selectedTag.iconName" /></div>
        <div>{{ record.selectedTag.name }}</div>
      </h3>
      <div class="back"></div>
    </div>
    <ol class="content">
      <li class="item">
        <span>金额</span><input type="number" v-model="record.amount" />
      </li>
      <li class="item">
        <span>备注</span><input type="text" v-model="record.note" />
      </li>
    </ol>
    <div class="footer">
      <div class="footer-left" @click="editRecord()">编辑完成</div>
      <div class="footer-right" @click="deleteRecord()">删除</div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({})
export default class EditRecord extends Vue {
  id = "";
  record = {};
  created() {
    this.id = this.$route.params.id;
    this.$store.commit("getRecordList");
    this.record = this.recordList.filter(
      (i: { id: string }) => i.id === this.id
    )[0];
    if (!this.record) {
      this.$router.push("/404");
    }
  }
  get h() {
    return document.documentElement.clientHeight;
  }
  get recordList() {
    return this.$store.state.recordList;
  }
  // 记账信息完成编辑
  editRecord() {
    this.$store.commit("deleteRecord", this.id);
    this.$store.commit("editRecordList", this.record);
  }
  // 根据ID删除此条记账信息
  deleteRecord() {
    this.$store.commit("deleteRecord", this.id);
  }
}
</script>
<style lang="scss" scoped>
.editRecordWrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  .header {
    display: flex;
    background-color: #ffda47;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
    .title {
      display: flex;
      flex-grow: 1;
      flex-direction: column;
      align-items: center;
      font-size: 14px;
      .icon {
        box-sizing: border-box;
        padding: 8px;
        width: 48px;
        height: 48px;
        background-color: #fff;
        border-radius: 50%;
      }
    }
    .back {
      width: 32px;
      height: 32px;
      .icon {
        width: 30px;
        height: 30px;
      }
    }
  }
  .content {
    padding: 0 15px;
    flex-grow: 1;
    .item {
      font-size: 16px;
      color: #999;
      padding: 20px 5px;
      border-bottom: 1px solid #ccc;
      input {
        padding-left: 15px;
        color: #000;
        border: none;
        outline: none;
        background-color: #f5f5f5;
      }
    }
  }
  .footer {
    display: flex;
    width: 100%;
    border-top: 1px solid #ccc;
    padding: 10px 15px;
    .footer-left {
      border-right: 1px solid #ccc;
    }
    .footer-right {
      color: red;
    }
    div {
      flex-grow: 1;
      text-align: center;
      font-size: 14px;
    }
  }
}
</style>
