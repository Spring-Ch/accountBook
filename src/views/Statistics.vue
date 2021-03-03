<template>
  <Layout>
    <Tabs :dataSource="typeList" :type.sync="selectedType" classPrefix="type" />
    <ol>
      <li>
        <span>总计</span>
      </li>
      <li>
        <span>每日对比</span>
        <Echarts :options="option1" />
      </li>
      <li>
        <span>支出排行{{ x }}</span>
        <Echarts :options="option2" />
      </li>
    </ol>
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
import Echarts from "@/components/Chart.vue";

@Component({
  components: { Tabs, Echarts },
})
export default class Statistics extends Vue {
  beforeCreate() {
    this.$store.commit("getRecordList");
    this.$store.commit("getTagList");
  }
  selectedType = "-";
  typeList = [
    { text: "支出", value: "-" },
    { text: "收入", value: "+" },
  ];
  // 折线图配置项
  get option1() {
    const nowTime = new Date();
    const nowMonth = nowTime.getMonth() + 1;
    const nowYear = nowTime.getFullYear();

    // 获得当前月份的天数
    const dayNumber = new Date(nowYear, nowMonth, 0).getDate();
    // 获取result值的数组
    const data = Object.values(this.result);
    // 生成一个数组，用来放日期
    const days = [];
    for (let i = 0; i < dayNumber; i++) {
      const date = dayjs(nowTime).date(1).add(i, "day").format("YYYY-MM-DD");
      const amount = data.find((i) => i.title === date);
      days.push({ date: date, value: amount ? amount.total : 0 });
    }

    const keys = days.map((i) => i.date);
    const values = days.map((i) => i.value);
    return {
      xAxis: {
        type: "category",
        data: keys,
        axisLabel: {
          formatter: function (value: string) {
            return value.substr(5);
          },
        },
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: values,
          type: "line",
        },
      ],
    };
  }
  // 饼状图配置项
  get x() {
    const { tagList, recordList } = this;
    const result: {
      [key: string]: { title: string; items: RecordItem[]; total?: number };
    } = {};
    const newList = clone(recordList).filter(
      (r: { type: string }) => r.type === this.selectedType
    );
    if (newList.length === 0) {
      return {};
    }
    console.log(newList);

    return result;
  }
  option2 = {
    title: {
      text: "某站点用户访问来源",
      subtext: "纯属虚构",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "访问来源",
        type: "pie",
        radius: "50%",
        data: [
          { value: 1048, name: "搜索引擎" },
          { value: 735, name: "直接访问" },
          { value: 580, name: "邮件营销" },
          { value: 484, name: "联盟广告" },
          { value: 300, name: "视频广告" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  // 获取记账信息
  get recordList() {
    return this.$store.state.recordList;
  }
  //获取标签信息
  get tagList() {
    return this.$store.state.tagList;
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
      return {};
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
