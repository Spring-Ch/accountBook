<template>
  <Layout>
    <Tabs :dataSource="typeList" :type.sync="selectedType" classPrefix="type" />
    <Tabs
      :dataSource="intervalList"
      :type.sync="selectedInterval"
      classPrefix="interval"
    />
    <ol>
      <li v-for="(group, index) in result" :key="index">
        <h3 class="title">{{ group.title }} <span>总计</span></h3>
        <ol>
          <li v-for="(item, i) in group.items" :key="i" class="record">
            <span>{{ item.selectedTag[0].name }}</span>
            <span class="note">{{ item.note }}</span>
            <span>¥ {{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
  </Layout>
</template>
<script lang="ts">
import Vue from "vue";
import Tabs from "@/components/Tabs.vue";
import { Component } from "vue-property-decorator";
import dayjs from "dayjs";
import clone from "@/lib/clone";

@Component({
  components: { Tabs },
})
export default class Statistics extends Vue {
  beforeCreate() {
    this.$store.commit("getRecordList");
  }
  selectedType = "-";
  typeList = [
    { text: "支出", value: "-" },
    { text: "收入", value: "+" },
  ];
  intervalList = [
    { text: "按天", value: "day" },
    { text: "按周", value: "week" },
    { text: "按月", value: "month" },
  ];
  selectedInterval = "day";
  // 获取记账信息
  get recordList() {
    return this.$store.state.recordList;
  }
  // 将记账信息按日期分组处理
  get result() {
    const { recordList } = this;
    const hashTable: {
      [key: string]: { title: string; items: RecordItem[] };
    } = {};
    const newList = clone(recordList).sort(
      (a: { createAt: string }, b: { createAt: string }) =>
        dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf()
    );

    for (let i = 0; i < newList.length; i++) {
      const [myDate] = newList[i].createAt.split("T");
      hashTable[myDate] = hashTable[myDate] || {
        title: myDate,
        items: [],
      };
      hashTable[myDate].items.push(newList[i]);
    }
    return hashTable;
  }
}
</script>
<style lang="scss" scoped>
::v-deep .type-tabs-item {
  background-color: #fff;
  &.selected {
    background-color: #c4c4c4;
    &::after {
      display: none;
    }
  }
}
::v-deep .interval-tabs-item {
  height: 48px;
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 40px;
  font-size: 17px;
  padding: 0 16px;
}
.record {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 40px;
  padding: 0 16px;
  background-color: #fff;
}
.note {
  margin-left: 16px;
  margin-right: auto;
  color: #999;
}
</style>
