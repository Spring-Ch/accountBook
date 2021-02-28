<template>
  <Layout class-prefix="layout">
    <Tags :selectedTag.sync="record.selectedTag" />
    <Notes @update:note="onUpdateNote" />
    <Tabs :type.sync="record.type" :dataSource="typeList" />
    <Numberpad :amount.sync="record.amount" @submit="editRecordList" />
  </Layout>
</template>
<script lang="ts">
import Vue from "vue";
import Tags from "@/components/Money/Tags.vue";
import Notes from "@/components/Money/Notes.vue";
import Tabs from "@/components/Tabs.vue";
import Numberpad from "@/components/Money/Numberpad.vue";
import { Component } from "vue-property-decorator";

@Component({
  components: { Tags, Notes, Tabs, Numberpad },
})
export default class Money extends Vue {
  created() {
    this.$store.commit("getTagList");
    this.$store.commit("getRecordList");
  }
  typeList = [
    { text: "支出", value: "-" },
    { text: "收入", value: "+" },
  ];
  record = {
    selectedTag: [],
    note: "",
    type: "-",
    amount: 0,
  };
  onUpdateNote(note: string) {
    this.record.note = note;
  }
  editRecordList() {
    //将record进行深拷贝
    const newRecord = JSON.parse(JSON.stringify(this.record));
    // 为newRecord添加创造时间属性
    newRecord.createAt = new Date().toISOString();
    this.$store.commit("editRecordList", newRecord);
  }
}
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column;
}
</style>
