
<template>
  <view>
    <canvas canvas-id="CXZOipJAGisASTyVrQIAFTvEQmntRbwh" id="CXZOipJAGisASTyVrQIAFTvEQmntRbwh" class="charts" @touchend="tap"/>
  </view>
</template>

<script>
import uCharts from './u-charts/u-charts.min.js';
var uChartsInstance = {};
export default {
	props: ['data'],
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
    this.data.length && this.getServerData();
  },
  watch: {
	  data() {
		  this.data.length && this.getServerData();
	  }
  },
  methods: {
    getServerData() {
      //模拟从服务器获取数据时的延时
      setTimeout(() => {
        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        let res = {
			categories: this.data.map( v => v.licPlateNum),
            series: [
              {
                name: "目标值",
                data: this.data.map( v => v.number),
              },
            ]
          };
        this.drawCharts('CXZOipJAGisASTyVrQIAFTvEQmntRbwh', res);
      }, 500);
    },
    drawCharts(id,data){
      const ctx = uni.createCanvasContext(id, this);
      uChartsInstance[id] = new uCharts({
        type: "bar",
        context: ctx,
        width: this.cWidth,
        height: this.cHeight,
        categories: data.categories,
        series: data.series,
        animation: true,
        background: "#FFFFFF",
        color: ["#FFA4AC","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
        padding: [15,30,0,5],
        enableScroll: false,
		dataLabel:false,
        legend: {
			show: false
		},
        xAxis: {
          boundaryGap: "justify",
          disableGrid: false,
          min: 0,
          axisLine: false,
		  tofix: 1,
        },
        yAxis: {},
        extra: {
          bar: {
            type: "stack",
			width: this.cWidth * this.pixelRatio * 0.2 / data.categories.length,
            meterBorde: 1,
            meterFillColor: "#FFFFFF",
            activeBgColor: "#000000",
            activeBgOpacity: 0.08,
            categoryGap: 2
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