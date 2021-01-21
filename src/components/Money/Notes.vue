<template>
  <label class="notes">
    <span class="name">备注</span>
    <input type="text" placeholder="在这里添加备注" v-model="note" />
  </label>
</template>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class Note extends Vue {
  note = "";
}
</script>
<style lang="scss" scoped>
.notes {
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  font-size: 14px;
  .name {
    padding: 0 16px;
  }
  input {
    background-color: transparent;
    height: 64px;
    border: none;
    color: #999;
    flex-grow: 1;
  }
}
</style>