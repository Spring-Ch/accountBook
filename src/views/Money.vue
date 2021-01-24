<template>
  <Layout class-prefix="layout">
    {{ record }}
    <Tags :tags.sync="record.tags" />
    <Notes @update:note="onUpdateNote" />
    <Types :type.sync="record.type" />
    <Numberpad :amount.sync="record.amount" />
  </Layout>
</template>
<script lang="ts">
import Vue from "vue";
import Tags from "@/components/Money/Tags.vue";
import Notes from "@/components/Money/Notes.vue";
import Types from "@/components/Money/Types.vue";
import Numberpad from "@/components/Money/Numberpad.vue";
import { Component } from "vue-property-decorator";

type Record = {
  tags: string[];
  note: string;
  type: string;
  amount: number;
};
@Component({
  components: { Tags, Notes, Types, Numberpad },
})
export default class Money extends Vue {
  record: Record = {
    tags: ["衣", "食", "住", "行"],
    note: "",
    type: "-",
    amount: 0,
  };
  onUpdateNote(note: string) {
    this.record.note = note;
  }
}
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column;
}
</style>
