<template>
  <Layout class-prefix="layout">
    <Tags />
    <Notes />
    <Types />
    <Numberpad />
  </Layout>
</template>
<script lang="ts">
import Vue from "vue";
import Tags from "@/components/Money/Tags.vue";
import Notes from "@/components/Money/Notes.vue";
import Types from "@/components/Money/Types.vue";
import Numberpad from "@/components/Money/Numberpad.vue";

export default Vue.extend({
  components: { Tags, Notes, Types, Numberpad },
});
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column;
}
</style>
