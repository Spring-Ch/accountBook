<template>
  <label class="notes">
    <span class="name">备注</span>
    <input type="text" placeholder="在这里添加备注" v-model="note" />
    <input type="date" v-model="createAt" class="date" />
  </label>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import dayjs from "dayjs";

@Component
export default class Note extends Vue {
  note = "";
  createAt = dayjs(new Date()).format("YYYY-MM-DD");
  @Watch("note")
  onNoteChanged(note: string) {
    this.$emit("update:note", note);
  }
  @Watch("createAt")
  atChanged(createAt: string) {
    this.$emit("update:createAt", createAt);
  }
}
</script>
<style lang="scss" scoped>
.notes {
  display: flex;
  align-items: center;
  background-color: #fff;
  font-size: 14px;
  height: 48px;
  border-top: 1px solid #f5f5f5;
  .name {
    padding: 0 10px;
    white-space: nowrap;
    display: block;
  }
  input {
    background-color: transparent;
    border: none;
    color: #999;
    flex-grow: 1;
  }
  .date {
    margin-right: 10px;
  }
}
</style>
