<template>
	<view class="box">
	  <view>
		<canvas canvas-id="minStactColumn" id="minStactColumn" class="charts" @touchend="tap"/>
	  </view>
	  <view class="pos" v-show="lineHideIs">
		<canvas canvas-id="mixLine" id="mixLine" class="charts" @touchend="tap1"/>
	  </view>
	  <view class="button" @click="lineHide">
		<text class="text">工作时长</text>
	  </view>
	</view>
</template>

<script>
import uCharts from './u-charts/u-charts.min.js';
var uChartsInstance = {};
var uChartsInstance1 = {};
export default {
  data() {
    return {
      cWidth: 660,
      cHeight: 500,
	  lineHideIs: true,
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
                name: "运行时长",
                textColor: "#FFFFFF",
                data: [20,20,20,20,20,20]
              },
              {
                name: "怠速时长",
                textColor: "#FFFFFF",
                data: [10,10,10,10,10,10]
              },
            ]
          };
        this.drawCharts('minStactColumn', res);
      }, 500);
	  setTimeout(() => {
		  //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
		  let res = {
			  categories: ["2018","2019","2020","2021","2022","2023"],
			  series: [
				{
				  name: "成交量A",
				  data: [100,0,31,33,13,34]
				}
			  ]
			};
		  this.drawCharts1('mixLine', res);
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
        color: ["#52C41A","#FF6000","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
        padding: [15,5,0,5],
        enableScroll: false,
        legend: {},
        xAxis: {
          disableGrid: true
        },
		dataLabel:false,
        yAxis: {
          data: [
            {
              min: 0,
			  max: 100
            }
          ]
        },
        extra: {
          column: {
            type: "stack",
			width: this.cWidth * this.pixelRatio * 0.3 / data.categories.length,
            activeBgColor: "#000000",
            activeBgOpacity: 0.08,
            labelPosition: "center"
          }
        }
      });
    },
    tap(e){
      uChartsInstance[e.target.id].touchLegend(e);
      uChartsInstance[e.target.id].showToolTip(e);
    },
	drawCharts1(id,data){
	      const ctx = uni.createCanvasContext(id, this);
	      uChartsInstance1[id] = new uCharts({
	        type: "line",
	        context: ctx,
	        width: this.cWidth,
	        height: this.cHeight,
	        categories: data.categories,
	        series: data.series,
	        animation: true,
			dataLabel:false,
			// dataPointShapeType: 'hollow',
	        color: ["#FFC200","#0080FF","#7166E4"],
	        padding: [15,10,53,35],
	        enableScroll: false,
	        legend: {
				show:false
			},
	        xAxis: {
				disabled:true,
			    disableGrid:true,
	        },
	        yAxis: {
				disabled:true,
	            disableGrid:true,
				data: [
				    {
				      min: 0,
				  	max: 100
				    }
				  ]
	        },
	        extra: {
	          line: {
	            type: "straight",
	            width: 1,
	            activeType: "hollow",
	          }
	        }
	      });
	    },
	    tap1(e){
	      uChartsInstance1[e.target.id].touchLegend(e);
	      uChartsInstance1[e.target.id].showToolTip(e);
	    },
		lineHide(){
			this.lineHideIs = !this.lineHideIs
		}
	
  }
};
</script>

<style scoped>
	.box{position: relative;}
	.charts{
		width: 660rpx;
		height: 500rpx;
	}
	.pos{position: absolute;left: 0; top: 0;height: 410rpx;overflow: hidden;}
	.button{height: 20rpx;width: 30rpx;position: absolute;right: 140rpx; bottom: 24rpx;background: #f00;}
	.text{
		font-size: 24rpx;
		position: absolute;
		left: 36rpx;
		width: 100rpx;
		top: -8rpx;
	}
</style>