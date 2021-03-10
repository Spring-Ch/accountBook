<template>
  <Layout :style="{ height: h + 'px' }">
    <Tabs :dataSource="typeList" :type.sync="selectedType" classPrefix="type" />
    <ol v-if="Object.keys(result).length > 0" class="Statistics">
      <li class="total">
        <div>
          <span>总计: </span>
          <span class="amount">{{ selectedType }}{{ amountTotal }}</span>
        </div>
        <div class="date"><input type="month" v-model="nowMonth" /></div>
      </li>
      <li class="daily">
        <Echarts :options="option1" />
      </li>
      <li class="output">
        <Echarts :options="option2" />
      </li>
    </ol>
    <ol v-else>
      <div class="amountAlert">
        <div class="date"><input type="month" v-model="nowMonth" /></div>
        <Icon name="record" />
        <div>此月还未有记账信息</div>
      </div>
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
  nowMonth = dayjs(new Date()).format("YYYY-MM");

  get h() {
    return document.documentElement.clientHeight;
  }
  // 折线图配置项
  get option1() {
    const { nowMonth } = this;
    // 获得当前月份的天数
    const dayNumber = new Date(
      parseInt(nowMonth.substring(0, 4)),
      parseInt(nowMonth.substring(5, 7)),
      0
    ).getDate();
    // 获取result值的数组
    const data = Object.values(this.result);

    // 生成一个数组，用来放日期
    const days = [];
    for (let i = 0; i < dayNumber; i++) {
      const date = dayjs(nowMonth).date(1).add(i, "day").format("YYYY-MM-DD");
      const amount = data.find((item) => (item as ResultItem).title === date);
      days.push({
        date: date,
        value: amount ? (amount as ResultItem).total : 0,
      });
    }

    const keys = days.map((i) => i.date);
    const values = days.map((i) => i.value);
    return {
      title: { text: "每日对比", left: "center" },
      grid: { top: "20%", height: "60%" },
      tooltip: {
        show: true,
        trigger: "axis",
        triggerOn: "mousemove|click",
        formatter: "{c}",
      },
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
  get option2() {
    const { tagList, recordList } = this;
    const result: {
      [key: string]: { title: string; items: number[]; total?: number };
    } = {};
    // 按支出和收入将数组过滤
    let newList = clone(recordList).filter(
      (r: { type: string }) => r.type === this.selectedType
    );
    // 按月份将数组过滤
    newList = newList.filter(
      (item: { createAt: string }) =>
        item.createAt.substring(0, 7) === this.nowMonth
    );

    for (let i = 0; i < tagList.length; i++) {
      const tag = tagList[i].name;
      for (const k in newList) {
        if (newList[k].selectedTag.name === tag) {
          result[tag] = result[tag] || {
            title: tag,
            items: [],
          };
          result[tag].items.push(newList[k].amount);
        }
      }
    }
    for (const k in result) {
      result[k].total = result[k].items.reduce((sum, item) => sum + item, 0);
    }
    const newResult: { value: number; name: string }[] = [];
    for (const k in result) {
      newResult.push({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        value: result[k].total!,
        name: result[k].title,
      });
    }

    return {
      title: { text: "各项占比", left: "center" },
      grid: { top: "20%", height: "60%" },
      tooltip: {
        trigger: "item",
        triggerOn: "mousemove",
      },
      series: [
        {
          label: { formatter: "{b}: {d}%" },
          type: "pie",
          radius: "50%",
          data: newResult,
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
  }
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
        (sum, item) => sum + parseFloat(item.amount),
        0
      );
    }
    const newResult = [];
    for (const k in result) {
      if (result[k].title.substring(0, 7) === this.nowMonth) {
        newResult.push(result[k]);
      }
    }
    return newResult;
  }
  // 获取当月支出或收入总额
  get amountTotal() {
    let amountTotal;
    const newResult = Object.values(this.result);
    if (newResult.length > 0) {
      amountTotal = newResult.reduce(
        (sum, i) => (sum as number) + (i as ResultItem).total,
        0
      );
    } else {
      amountTotal = 0;
    }
    return amountTotal;
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
  margin-top: 60px;
  text-align: center;
  color: #c4c4c4;
  .icon {
    width: 40px;
    height: 40px;
  }
  .date {
    padding-bottom: 15px;
  }
}
.Statistics {
  li {
    padding-top: 10px;
  }
  .total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    .amount {
      font-weight: bolder;
    }
  }
  .daily,
  .output {
    border-top: 1px solid #999;
  }
}
</style>
