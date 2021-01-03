<template>
  <Layout>
    <div class="tags">
      <ol>
        <li>衣</li>
        <li>食</li>
        <li>住</li>
        <li>行</li>
      </ol>
      <button>新增标签</button>
    </div>
    <div class="comment">
      <label for="comment">备注</label>
      <input type="text" id="comment" />
    </div>
    <div>
      <ul class="types">
        <li>支出</li>
        <li>收入</li>
      </ul>
    </div>
    <div class="numberPad">
      <div>数字显示区</div>
      <div class="btns">
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>+</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>-</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>.</button>
        <button>0</button>
        <button>退格</button>
        <button>完成</button>
      </div>
    </div>
  </Layout>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>
<style lang="scss" scoped></style>
