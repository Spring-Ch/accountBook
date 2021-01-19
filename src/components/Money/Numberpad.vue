<template>
  <div class="numberPad">
    <div class="output">100</div>
    <div class="buttons">
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>删除</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>清空</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button class="ok">完成</button>
      <button class="zero">0</button>
      <button>.</button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>
<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.numberPad {
  .output {
    height: 72px;
    line-height: 72px;
    text-align: right;
    font-size: 36px;
    font-family: Consolas, monospace;
    padding-right: 16px;
    box-shadow: inset 0px -2px 3px rgba(0, 0, 0, 0.25);
  }
  .buttons {
    @extend %clearfix;
    $bg: #f2f2f2;
    button {
      float: left;
      width: 25%;
      height: 64px;
      background-color: transparent;
      border: none;
    }
    .zero {
      width: 50%;
    }
    .ok {
      float: right;
      height: 128px;
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