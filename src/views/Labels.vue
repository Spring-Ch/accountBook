<template>
  <Layout>
    <ol class="tags">
      <li><span>衣</span> <Icon name="right" /></li>
      <li><span>食</span> <Icon name="right" /></li>
      <li><span>住</span> <Icon name="right" /></li>
      <li><span>行</span> <Icon name="right" /></li>
    </ol>
    <div class="newTagWrapper">
      <button>新建标签</button>
    </div>
  </Layout>
</template>
<script lang="ts">
import Icon from "@/components/Icon.vue";
import Vue from "vue";
export default Vue.extend({
  components: { Icon },
});
</script>
<style lang="scss" scoped>
.tags {
  background-color: #fff;
  li {
    display: flex;
    min-height: 44px;
    font-size: 16px;
    color: #000;
    align-items: center;
    justify-content: space-between;
    margin-left: 16px;
    box-shadow: inset 0px -0.5px 0px #bcbbc1;
  }
  svg {
    height: 20px;
    width: 20px;
    margin-right: 20px;
    font-weight: bold;
  }
}
.newTagWrapper {
  margin-top: 44px;
  text-align: center;
  button {
    border: none;
    background-color: #767676;
    border-radius: 4px;
    font-size: 17px;
    color: #fff;
    padding: 9px 15px;
  }
}
</style>