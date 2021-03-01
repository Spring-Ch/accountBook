<template>
  <Layout>
    <Tabs :dataSource="typeList" :type.sync="selectedType" classPrefix="type" />
    <ol v-if="Object.keys(result).length > 0">
      <li v-for="(group, index) in result" :key="index">
        <h3 class="title">
          {{ group.title }} <span>总计: ¥{{ group.total }}</span>
        </h3>
        <ol>
          <li v-for="(item, i) in group.items" :key="i" class="record">
            <span>{{ item.selectedTag.name }}</span>
            <span class="note">{{ item.note }}</span>
            <span>¥ {{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
    <ol v-else>
      <div class="amountAlert">当前还未有记账信息</div>
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
  // 获取记账信息
  get recordList() {
    return this.$store.state.recordList;
  }
  // 将记账信息按日期分组处理
  get result() {
    const { recordList } = this;
    const result: {
      [key: string]: { title: string; items: RecordItem[]; total?: number };
    } = {};
    // 先将记账信息按当前选中类型过滤支出收入信息，然后按日期由近到远排序
    const newList = clone(recordList)
      .filter((r: { type: string }) => r.type === this.selectedType)
      .sort(
        (a: { createAt: string }, b: { createAt: string }) =>
          dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf()
      );
    // 防止newList为空数组，导致后面程序无法执行
    if (newList.length === 0) {
      return [];
    }
    for (let i = 0; i < newList.length; i++) {
      const [myDate] = newList[i].createAt.split("T");
      result[myDate] = result[myDate] || {
        title: myDate,
        items: [],
      };
      result[myDate].items.push(newList[i]);
    }
    // eslint-disable-next-line prefer-const
    for (let k in result) {
      result[k].total = result[k].items.reduce(
        (sum, item) => sum + item.amount,
        0
      );
    }
    return result;
  }
}
</script>
<style lang="scss" scoped>
::v-deep .type-tabs-item {
  background-color: #c4c4c4;
  &.selected {
    background-color: #fff;
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
  font-weight: bolder;
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
.amountAlert {
  line-height: 60px;
  text-align: center;
  color: #c4c4c4;
}
</style>
