<template>
  <Layout class-prefix="layout">
    {{ recordList }}
    <Tags :tags.sync="tags" :selectedTag.sync="record.selectedTag" />
    <Notes @update:note="onUpdateNote" />
    <Types :type.sync="record.type" />
    <Numberpad :amount.sync="record.amount" @submit="saveRecord" />
  </Layout>
</template>
<script lang="ts">
import Vue from "vue";
import Tags from "@/components/Money/Tags.vue";
import Notes from "@/components/Money/Notes.vue";
import Types from "@/components/Money/Types.vue";
import Numberpad from "@/components/Money/Numberpad.vue";
import { Component, Watch } from "vue-property-decorator";

const recordList: Record[] = JSON.parse(
  window.localStorage.getItem("recordList") || "[]"
);
type Record = {
  selectedTag: string[];
  note: string;
  type: string;
  amount: number;
  createAt?: Date;
};
@Component({
  components: { Tags, Notes, Types, Numberpad },
})
export default class Money extends Vue {
  recordList: Record[] = recordList;
  tags: string[] = ["衣", "食", "住", "行"];
  record: Record = {
    selectedTag: [],
    note: "",
    type: "-",
    amount: 0,
  };
  onUpdateNote(note: string) {
    this.record.note = note;
  }
  saveRecord() {
    const record2: Record = JSON.parse(JSON.stringify(this.record));
    record2.createAt = new Date();
    this.recordList.push(record2);
  }
  @Watch("recordList")
  onRecordListChanged() {
    window.localStorage.setItem("recordList", JSON.stringify(this.recordList));
  }
}
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column;
}
</style>
