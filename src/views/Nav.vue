<template>
  <nav>
    <router-link to="/item" class="item" active-class="selected"
      ><Icon name="money" />明细
    </router-link>
    <router-link to="/money" class="item" active-class="selected"
      ><Icon name="manage" />记账
    </router-link>
    <router-link to="/statistics" class="item" active-class="selected"
      ><Icon name="static" />统计
    </router-link>
  </nav>
</template>
<script lang="ts">
import Vue from "vue";
import Icon from "@/components/Icon.vue";

export default Vue.extend({
  components: { Icon },
});
</script>
<style lang="scss" scoped>
nav {
  display: flex;
  font-size: 12px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  .item {
    display: flex;
    flex-direction: column;
    flex-grow: 0.33;
    justify-content: center;
    align-items: center;
    padding: 2px 0;
  }
  .icon {
    width: 32px;
    height: 32px;
  }
  .selected {
    color: #ffda47;
  }
}
</style>
