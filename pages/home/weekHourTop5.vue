<template>
	<view class="week-hour-chart">
		<!--#ifdef MP-ALIPAY -->
		<canvas canvas-id="weekHourTop5" id="weekHourTop5" class="charts" :width="cWidth*pixelRatio" :height="cHeight*pixelRatio"
		 :style="{'width':cWidth+'px','height':cHeight+'px'}" disable-scroll=true></canvas>
		<!--#endif-->
		<!--#ifndef MP-ALIPAY -->
		<canvas canvas-id="weekHourTop5" id="weekHourTop5" class="charts" disable-scroll=true></canvas>
		<!--#endif-->
	</view>
</template>


<script>
	import uCharts from '../../components/u-charts/u-charts.js';
	var _self;
	var canvasObj = {};
	export default {
		data() {
			return {
				pixelRatio: 1,
				cWidth: '',
				cHeight:'',
				Column: {
					"categories": ["6.1", "6.2", "6.3", "6.4", "6.5", "6.6"],
					"series": [{
						"name": "成交量1",
						color: '#52C41A',
						"data": [15, 20, 45, 37, 43, 34]
					},{
						"name": "成交量2",
						color: '#FF6000',
						"data": [15, 20, 45, 37, 43, 34]
					}]
				},

			}
		},
		onLoad() {
			
			console.log(111)
		},
		onShow() {
			_self = this;
			//#ifdef MP-ALIPAY
			uni.getSystemInfo({
				success: function(res) {
					if (res.pixelRatio > 1) {
						//正常这里给2就行，如果pixelRatio=3性能会降低一点
						//_self.pixelRatio =res.pixelRatio;
						_self.pixelRatio = 2;
					}
				}
			});
			//#endif
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(300);
			
			this.showColumn("weekHourTop5", this.Column);
			console.log(111)
			
			
		},
		methods: {
			showColumn(canvasId, chartData) {
				console.log(222)
				canvasObj[canvasId] = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'column',
					padding: [15, 15, 0, 15],
					legend: {
						show: false,
						padding: 5,
						lineHeight: 11,
						margin: 0,
					},
					fontSize: 11,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					animation: false,
					categories: chartData.categories,
					series: chartData.series,
					xAxis: {
						disableGrid: true,
					},
					yAxis: {
						// format: (val) => {
						// 	return val.toFixed(0) + '元'
						// }
					},
					dataLabel: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						column: {
							type: 'stack',
							width: _self.cWidth * _self.pixelRatio * 0.45 / chartData.categories.length
						}
					}
				});
			},
			
			
			
		}
	}
</script>

<style scoped lang="scss">
	.home{
			
		.cars{
			height: 440rpx;
			background-color: #fff;
			border-radius: 16rpx;
			margin: 24rpx;
			padding: 32rpx 24rpx 24rpx 0;
			box-sizing: border-box;
			.total{
				width: 298rpx;
				height: 100%;
				float: left;
				text-align: center;
			}
			.right{
				width: 380rpx;
				float: right;
			}
			.item{
				
				height: 64rpx;
				line-height: 64rpx;
				position: relative;
				padding-left: 24rpx;
				background-color: rgba(80,200,24,0.08);
				margin-bottom: 16rpx;
				border-radius: 8rpx;
				
				.t{
					font-size: 28rpx;
					float: left;
					margin-right: 16rpx;
					
				}
				.num1{
					font-size: 32rpx;
					float: left;
				}
				.num2{
					font-size: 24rpx;
					position: absolute;
					right: 24rpx;
				}
			}
			
			.green{
				background-color: rgba(80,200,24,0.08);
				.num1{
					color: #52C41A;
				}
				.num2{
					color: #52C41A;
				}
			}
			.blue{
				background-color: rgba(51,112,255,0.08);
				.num1{
					color: #3370FF;
				}
				.num2{
					color: #3370FF;
				}
			}
			.orange{
				background-color: rgba(255,96,0,0.08);
				.num1{
					color: #FF6000;
				}
				.num2{
					color: #FF6000;
				}
			}
			.green1{
				background-color: rgba(14,196,172,0.08);
				.num1{
					color: #0EC4AC;
				}
				.num2{
					color: #0EC4AC;
				}
			}
			.gray{
				background-color: #F4F7FA;
				.num1{
					color: #666;
				}
				.num2{
					color: #666;
				}
			}
			
		}
	
		.title{
			color: #666;
			font-size: 28rpx;
			padding: 8rpx 32rpx;
		}
		.card-title{
			font-size: 32rpx;
			margin-bottom: 16rpx;
		}
		.car-box{
			background-color: #fff;
			border-radius: 16rpx;
			padding: 36rpx 16rpx;
			margin: 24rpx 24rpx;
		}
		.tab{
			position: absolute;
			top: 30rpx;
			right: 24rpx;
			
			.item{
				height: 48rpx;
				line-height: 48rpx;
				border-radius: 24rpx;
				padding: 0 16rpx;
				font-size: 24rpx;
				color: #666;
				background-color: #F4F7FA;
				float: left;
				margin-left: 10rpx;
			}
			.active{
				color: #fff;
				background-color: #3370FF;
			}
		}
		.today-hour{
			
			.card{
				height: 128rpx;
				padding: 24rpx;
				border-radius: 16rpx;
				box-sizing: border-box;
				background-color: #F4F7FA;
				font-size: 24rpx;
				margin: 8rpx;
			}
			.card1{
				height: 136rpx;
				padding: 24rpx;
				border-radius: 16rpx;
				box-sizing: border-box;
				font-size: 24rpx;
				margin: 8rpx;
				
			}
			.icon{
				width: 80rpx;
				height: 80rpx;
				float: left;
				margin-right: 16rpx;
				.img{
					
					width: 100%;
					height: 100%;
				}
			}
			.num{
				font-size: 40rpx;
				margin-top: 6rpx;
			}
			.bit{
				font-size: 24rpx;
				color: #999;
				display: inline-block;
				margin-left: 10rpx;
			}
			
		}
		
		.week-hour{
			position: relative;
			
			
			.week-hour-chart{
				width: 650rpx;
			}
			
			
		}
		.today-alarm{
			.alarm{
				height: 120rpx;
				background-color: rgba(255,0,0,0.08);
				border-radius: 8rpx;
				padding: 20rpx 0rpx 24rpx 36rpx;
				box-sizing: border-box;
				
				.icon{
					float: left;
					.img{
						width: 80rpx;
						height: 80rpx;
					}
				}
				.num-box{
					float: left;
					margin: 0 20rpx;
					.num{
						color: #F03030;
						margin-top: 12rpx;
					}
				}
				.tip{
					width: 360rpx;
					float: left;
					font-size: 24rpx;
					margin-top: 10rpx;
				}
			}
		}
		.week-alarm{
			position: relative;
			
			.week-alarm-chart{
				width: 650rpx;
			}
			
		}
	}
	
	
</style>