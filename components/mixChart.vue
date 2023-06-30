<template>
	<view class="box">
	  <view>
		<canvas canvas-id="minStactColumn" id="minStactColumn" class="charts" @touchend="tap"/>
	  </view>
	  <view class="pos" v-show="lineHideIs">
		<canvas canvas-id="mixLine" id="mixLine" class="charts" @touchend="tap1"/>
	  </view>
	  <view class="button" @click="lineHide">
		<text class="text">平均工作时长</text>
	  </view>
	</view>
</template>

<script>
import uCharts from './u-charts/u-charts.min.js';
var uChartsInstance = {};
var uChartsInstance1 = {};
export default {
	props: ['data'],
	data() {
		return {
			cWidth: 660,
			cHeight: 500,
			lineHideIs: true,
			pixelRatio: 1
		};
	},
	mounted() {
		this.cWidth = uni.upx2px(660);
		this.cHeight = uni.upx2px(500);
		this.data.length && this.getServerData();
	},
	watch: {
		data(newVal) {
			this.getServerData();
		}
	},
	methods: {
		getServerData() {
		
		let categories = [];
		let totalRunningTimes = [];
		let totalIdlingTimes = [];
		let avgWorkTimes = []
		
		let totalMax = 0;
		let avgMax = 0
		
		this.data.forEach( v => {
			let totalRunningTime = v.totalRunningTime ? (v.totalRunningTime/60/60).toFixed(1) - 0 : 0;
			let totalIdlingTime = v.totalIdlingTime ? (v.totalIdlingTime/60/60).toFixed(1) - 0 : 0;
			let avgWorkTime = v.avgWorkTime ? (v.avgWorkTime/60/60).toFixed(1) - 0 : null;
			
			categories.push(v.date.substr(6));
			totalRunningTimes.push(totalRunningTime);
			totalIdlingTimes.push(totalIdlingTime);
			avgWorkTimes.push(avgWorkTime);
			
			if( totalMax < totalRunningTime + totalIdlingTime ) {
				totalMax = totalRunningTime + totalIdlingTime;
			}
			
			if(avgMax < avgWorkTime) {
				avgMax = avgWorkTime;
			}
		})
        let data1 = {
			categories: categories,
            series: [
              {
                name: "总运行时长",
                textColor: "#FFFFFF",
                data: totalRunningTimes
              },
              {
                name: "总怠速时长",
                textColor: "#FFFFFF",
                data: totalIdlingTimes
              },
            ]
          };
        this.drawCharts('minStactColumn', data1);
		  //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
		  let data2 = {
			  categories: categories,
			  series: [
				{
				  name: "平均工作时长",
				  data: avgWorkTimes
				}
			  ]
			};
		  this.drawCharts1('mixLine', data2);
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
			padding: [15,26,0,5],
			enableScroll: false,
			legend: {},
			xAxis: {
			  disableGrid: true
			},
			dataLabel:false,
			yAxis: {
				showTitle: true,
				data: [
					{
						title: '小时',
						titleOffsetX: -16,
						titleOffsetY: -4,
						axisLineColor: '#fff',
						min: 0,
						// max: 100
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
	        padding: [15,0,53,45],
	        enableScroll: false,
	        legend: {
				show:false
			},
	        xAxis: {
				disabled:true,
			    disableGrid:true,
	        },
	        yAxis: {
				// disabled:true,
				showTitle: true,
	            disableGrid:true,
				data: [
				    {
				      min: 0,
					  position: "right",
					  title: '小时',
					  titleOffsetY: -4,
					  axisLineColor: '#fff',
					  titleOffsetX: 10,
					  tofix: 1,
				  	// max: 100
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
	.button{height: 20rpx;width: 30rpx;position: absolute;left: 150rpx; bottom: -8rpx;background: #FFC200;}
	.text{
		font-size: 24rpx;
		position: absolute;
		left: 36rpx;
		width: 150rpx;
		top: -8rpx;
	}
</style>