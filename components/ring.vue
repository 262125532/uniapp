
基本环形图
<template>
  <view>
    <canvas canvas-id="uchartRing" id="uchartRing" class="charts" @touchend="tap"/>
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
      cHeight: 300
    };
  },
  mounted() {
    //这里的 660 对应 css .charts 的 width
    this.cWidth = uni.upx2px(660);
    //这里的 300 对应 css .charts 的 height
    this.cHeight = uni.upx2px(300);
    this.data.length && this.getServerData();
  },
  watch: {
	  data() {
		  this.data.length && this.getServerData();
	  }
  },
  methods: {
    getServerData() {;
		let total = 0
		this.data.forEach( v => {
			total = total + v.number;
		})
        let res = {
            series: [
              {
				data: this.data.map( v=> { return { name: v.alarmMessage, value: v.number}}),
              }
            ]
          };
        this.drawCharts('uchartRing', res, total);
    },
    drawCharts(id,data, total){
      const ctx = uni.createCanvasContext(id, this);
      uChartsInstance[id] = new uCharts({
        type: "ring",
        context: ctx,
        width: this.cWidth,
        height: this.cHeight,
        series: data.series,
        animation: true,
        rotate: false,
        rotateLock: false,
        background: "#FFFFFF",
        color: ["#3370FF","#3CC6F6","#FFC200","#00D1CF","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
        padding: [5,5,5,5],
        dataLabel: true,
        enableScroll: false,
        legend: {
          show: true,
          position: "right",
          lineHeight: 25
        },
        title: {
          name: "围栏报警",
          fontSize: 12,
          color: "#666666",
		  offsetY: 32
        },
        subtitle: {
          name: total,
          fontSize: 32,
          color: "#000",
		  offsetY: -20
        },
        extra: {
          ring: {
            ringWidth: 12,
            activeOpacity: 0.5,
            activeRadius: 10,
            offsetAngle: 0,
            labelWidth: 15,
            border: false,
            borderWidth: 3,
            borderColor: "#FFFFFF"
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
    height: 300rpx;
  }
</style>