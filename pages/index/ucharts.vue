<template>
	<view class="box">
	  <view>
		<canvas canvas-id="hQJmUynQPNJcfBjgZXfexhRbpTJlInCm" id="hQJmUynQPNJcfBjgZXfexhRbpTJlInCm" class="charts" @touchend="tap"/>
	  </view>
	  <view class="pos" v-show="lineHideIs">
		<canvas canvas-id="XHNtJidbWDUNrnLSoXIZIScpHFNKwyHW" id="XHNtJidbWDUNrnLSoXIZIScpHFNKwyHW" class="charts" @touchend="tap1"/>
	  </view>
	  <view class="button" @click="lineHide">
	  	4
	  </view>
	</view>
</template>

<script>
import uCharts from '../../components/u-charts/u-charts.min.js';
var uChartsInstance = {};
var uChartsInstance1 = {};
export default {
  data() {
    return {
      cWidth: 750,
      cHeight: 500,
	  lineHideIs: true
    };
  },
  onReady() {
    //这里的 750 对应 css .charts 的 width
    this.cWidth = uni.upx2px(750);
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
                name: "1",
                textColor: "#FFFFFF",
                data: [20,20,20,20,20,20]
              },
              {
                name: "2",
                textColor: "#FFFFFF",
                data: [10,10,10,10,10,10]
              },
			  {
			    name: "3",
			    textColor: "#FFFFFF",
			    data: [50,50,50,50,50,50]
			  }
            ]
          };
        this.drawCharts('hQJmUynQPNJcfBjgZXfexhRbpTJlInCm', res);
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
		  this.drawCharts1('XHNtJidbWDUNrnLSoXIZIScpHFNKwyHW', res);
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
        color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
        padding: [15,5,0,5],
        enableScroll: false,
        legend: {},
        xAxis: {
          disableGrid: true
        },
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
            width: 30,
            activeBgColor: "#fff",
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
				dataPointShapeType: 'hollow',
				color: ["#0ff"],
				padding: [15,10,53,35],
				enableScroll: false,
				legend: {
					show:false
				},
				onShadow:true,
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
					onShadow:true,
					line: {
						type: "straight",
						width: 1,
						activeType: "hollow",
						onShadow:true,
					},
					area: {
						type: "straight", // 区域图类型，可选值："straight"尖角折线模式,"curve"曲线圆滑模式,"step"时序图模式
						opacity: 1, // 	区域图透明度
						addLine: true, // 是否叠加相应的折线
						width: 2, // 叠加的折线宽度
						gradient: true, // 是否开启区域图渐变色
						activeType: "hollow", // 激活指示点类型，可选值："none"不启用激活指示点,"hollow"空心点模式,"solid"实心点模式
						onShadow:true,
					},
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
    width: 750rpx;
    height: 500rpx;
  }
  .pos{position: absolute;left: 0; top: 0;height: 410rpx;overflow: hidden;}
  .button{position: absolute;right: 220rpx; bottom: 10rpx;height: 50rpx;width: 50rpx;background: #f00;}
</style>