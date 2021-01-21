<template>
  <ul class="types">
    <li :class="type === '-' && 'selected'" @click="selectedType('-')">支出</li>
    <li :class="type === '+' && 'selected'" @click="selectedType('+')">收入</li>
  </ul>
</template>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class Types extends Vue {
  type = "-"; // '-'表示支出，'+'表示收入
  selectedType(type: string) {
    this.type = type;
  }
}
</script>
<style lang="scss" scoped>
.types {
  display: flex;
  height: 64px;
  line-height: 64px;
  background-color: #c4c4c4;
  font-size: 24px;
  color: #000;
  text-align: center;
  li {
    position: relative;
    flex-grow: 1;
  }
  .selected::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 4px;
    background-color: #333;
  }
}
</style>