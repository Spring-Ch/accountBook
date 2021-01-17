<template>
  <Layout class-prefix="layout">
    <div class="tags">
      <ul class="current">
        <li>衣</li>
        <li>食</li>
        <li>住</li>
        <li>行</li>
      </ul>
      <div class="new">
        <button>新增标签</button>
      </div>
    </div>
    <div>
      <label class="notes">
        <span class="name">备注</span>
        <input type="text" placeholder="在这里添加备注" />
      </label>
    </div>
    <div>
      <ul class="types">
        <li class="selected">支出</li>
        <li>收入</li>
      </ul>
    </div>
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
  </Layout>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column;
}
</style>
<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.tags {
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 16px;
  flex-grow: 1;
  .current {
    display: flex;
    flex-grow: 1;
    flex-wrap: wrap;
    li {
      $h: 24px;
      height: $h;
      line-height: $h;
      border-radius: $h/2;
      color: #000;
      background-color: #b9b9b9;
      padding: 0px 16px;
      margin-right: 10px;
    }
  }
  .new {
    padding-top: 16px;
    font-size: 14px;
    button {
      background-color: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid #000;
      padding: 0 4px;
    }
  }
}
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
