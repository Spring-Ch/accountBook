
<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="backWord">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="ok" class="ok">完成</button>
      <button @click="inputContent" class="zero">0</button>
      <button @click="inputContent">.</button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class NumberPad extends Vue {
  @Prop(Number) readonly amount!: number;
  // 输出的默认值是0
  output = "0";
  // 控制数字按键进行输入
  inputContent(event: MouseEvent) {
    // 设置变量放置button标签中的内容
    const inputValue = (event.target as HTMLButtonElement).textContent;
    // 控制输出最多为16位
    if (this.output.length < 16) {
      if (this.output.indexOf(".") >= 0 && inputValue === ".") {
        return;
      }
      if (this.output === "0" && inputValue !== ".") {
        this.output = inputValue as string;
      } else {
        this.output += inputValue;
      }
    }
  }
  // 退格功能
  backWord() {
    if (this.output.length > 1) {
      this.output = this.output.slice(0, -1);
    } else {
      this.output = "0";
    }
  }
  // 清空功能
  clear() {
    this.output = "0";
  }
  //确定，提交功能
  ok() {
    if (this.output === "0") {
      window.alert("请输入实际金额");
    } else {
      this.$emit("update:amount", parseFloat(this.output));
      this.$emit("submit", parseFloat(this.output));
      this.output = "0";
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.numberPad {
  .output {
    line-height: 36px;
    text-align: right;
    font-size: 24px;
    font-family: Consolas, monospace;
    padding-right: 16px;
    box-shadow: inset 0px -2px 3px rgba(0, 0, 0, 0.1);
  }
  .buttons {
    @extend %clearfix;
    $bg: #f2f2f2;
    button {
      float: left;
      width: 25%;
      height: 56px;
      background-color: transparent;
      border: none;
    }
    .zero {
      width: 50%;
    }
    .ok {
      float: right;
      height: 112px;
    }
    :nth-child(1) {
      background-color: $bg;
    }
    :nth-child(2),
    :nth-child(5) {
      background-color: darken($color: $bg, $amount: 4%);
    }
    :nth-child(3),
    :nth-child(6),
    :nth-child(9) {
      background-color: darken($color: $bg, $amount: 4 * 2%);
    }
    :nth-child(4),
    :nth-child(7),
    :nth-child(10) {
      background-color: darken($color: $bg, $amount: 4 * 3%);
    }
    :nth-child(8),
    :nth-child(11),
    :nth-child(13) {
      background-color: darken($color: $bg, $amount: 4 * 4%);
    }
    :nth-child(14) {
      background-color: darken($color: $bg, $amount: 4 * 5%);
    }
    :nth-child(12) {
      background-color: darken($color: $bg, $amount: 4 * 6%);
    }
  }
}
</style>