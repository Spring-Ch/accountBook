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
  myChart!: any;
  mounted() {
    this.myChart = echarts.init(this.$refs.chart as HTMLDivElement);
    this.options && this.myChart.setOption(this.options);
  }
  @Watch("options")
  onOptionsChange(newValue: EChartsOption) {
    this.myChart.setOption(newValue);
  }
}
</script>

<style lang="scss" scoped></style>
