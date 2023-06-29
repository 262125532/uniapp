
基本柱状图
堆叠柱状图
圆角+渐变+半透明柱状图
温度计图表
圆角温度计图表
正负柱状图
柱状图滚动条
全圆角柱状图+标记线
Copyright © 2018-2023 uCharts All Rights Reserved. 秋云科技 版权所有吉ICP备18000454号-2
未经许可，禁止转载、复制此文档的任何内容。
<template>
  <view>
    <canvas canvas-id="CcfvPPpbACVWvFlEGAjdPKSVEhIIvSvr" id="CcfvPPpbACVWvFlEGAjdPKSVEhIIvSvr" class="charts" @touchend="tap"/>
  </view>
</template>

<script>
import uCharts from './u-charts/u-charts.min.js';
var uChartsInstance = {};
export default {
  data() {
    return {
      cWidth: 660,
      cHeight: 500,
	  pixelRatio: 1
    };
  },
  mounted() {
    //这里的 660 对应 css .charts 的 width
    this.cWidth = uni.upx2px(660);
    //这里的 500 对应 css .charts 的 height
    this.cHeight = uni.upx2px(500);
    this.getServerData();
  },
  methods: {
    getServerData() {
      //模拟从服务器获取数据时的延时
      setTimeout(() => {
        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        let res = {
            categories: ["2018","2019","2020","2021","2022","2023"],
            series: [
              {
                name: "目标值",
                data: [35,36,31,33,13,34]
              },
              // {
              //   name: "完成量",
              //   data: [18,27,21,24,6,28]
              // }
            ]
          };
        this.drawCharts('CcfvPPpbACVWvFlEGAjdPKSVEhIIvSvr', res);
      }, 500);
    },
    drawCharts(id,data){
      const ctx = uni.createCanvasContext(id, this);
      uChartsInstance[id] = new uCharts({
        type: "column",
        context: ctx,
        width: this.cWidth,
        height: this.cHeight,
        categories: data.categories,
        series: data.series,
        animation: true,
        background: "#FFFFFF",
        color: ["#FFA4AC","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
        padding: [15,15,0,5],
        enableScroll: false,
        legend: {},
        xAxis: {
          disableGrid: true
        },
        yAxis: {
          data: [
            {
              min: 0
            }
          ]
        },
        extra: {
          column: {
            type: "group",
			width: this.cWidth * this.pixelRatio * 0.3 / data.categories.length,
            activeBgColor: "#000000",
            activeBgOpacity: 0.08
          }
        }
      });
    },
    tap(e){
      uChartsInstance[e.target.id].touchLegend(e);
      uChartsInstance[e.target.id].showToolTip(e);
    }
  }
};
</script>

<style scoped>
  .charts{
    width: 660rpx;
    height: 500rpx;
  }
</style>