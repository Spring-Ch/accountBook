<template>
  <div id="main" style="height: 400px" ref="chart"></div>
</template>
<script lang="ts">
import Vue from "vue";
import * as echarts from "echarts";
import { Component, Prop, Watch } from "vue-property-decorator";
import { EChartsOption } from "echarts";

@Component({})
export default class Echarts extends Vue {
  @Prop() options?: EChartsOption;
  mounted() {
    const chartDom = this.$refs.chart as HTMLDivElement;
    const myChart = echarts.init(chartDom);
    this.options && myChart.setOption(this.options);
  }
}
</script>

<style lang="scss" scoped></style>
