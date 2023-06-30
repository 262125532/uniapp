
<template>
  <view>
    <canvas canvas-id="uchartStactBar" id="uchartStactBar" class="charts" @touchend="tap"/>
  </view>
</template>

<script>
import uCharts from './u-charts/u-charts.min.js';
var uChartsInstance = {};
export default {
	props: ["data"],
  data() {
    return {
      cWidth: 660,
      cHeight: 400,
	  pixelRatio: 1,
    };
  },
  mounted() {
    //这里的 660 对应 css .charts 的 width
    this.cWidth = uni.upx2px(660);
    //这里的 400 对应 css .charts 的 height
    this.cHeight = uni.upx2px(400);
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
        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        let res = {
            // categories: ["2018","2019","2020","2021","2022","2023"],
			categories: this.data.map( v => v.licPlateNum),
            series: [
              {
                name: "本周总运行时长",
				data: this.data.map( v => (v.runningTime/3600).toFixed(0) - 0),
                // data: [35,36,31,33,13,34]
              },
              {
                name: "本周总怠速时长",
                data: this.data.map( v => (v.idlingTime/3600).toFixed(0) - 0 ),
              }
            ]
          };
        this.drawCharts('uchartStactBar', res);
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
			color: ["#52C41A","#FF6000","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
			padding: [15,40,0,5],
			enableScroll: false,
			dataLabel:false,
			legend: {},
			xAxis: {
				boundaryGap: "justify",
				disableGrid: false,
				min: 0,
				max: 120,
				axisLine: false,
				title: '小时',
				titleOffsetX: 12,
				titleFontSize: 12
			},
			yAxis: {},
			extra: {
				bar: {
					type: "stack",
					width: this.cWidth * this.pixelRatio * 0.2 / data.categories.length,
					meterBorde: 1,
					meterFillColor: "#FFFFFF",
					activeBgColor: "#000000",
					// activeBgOpacity: 0.08,
					categoryGap: 2,
					labelPosition: 'center'
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
    height: 400rpx;
  }
</style>