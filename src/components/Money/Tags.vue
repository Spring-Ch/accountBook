<template>
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
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>
<style lang="scss" scoped>
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
</style>