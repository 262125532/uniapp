<template>
		<view class="cars">
			<view class="total">
				<view class="qiun-charts">
					<!--#ifdef MP-ALIPAY -->
					<canvas canvas-id="canvasRing" id="canvasRing" class="charts" :width="cWidth*pixelRatio" :height="cHeight*pixelRatio"
					 :style="{'width':cWidth+'px','height':cHeight+'px'}"></canvas>
					<!--#endif-->
					<!--#ifndef MP-ALIPAY -->
					<canvas canvas-id="canvasRing" id="canvasRing" class="charts"></canvas>
					<!--#endif-->
				</view>
				<view class="num">
					{{carCounts.all}}
				</view>
				总车辆
			</view>
			<view class="right">
				<view class="item green">
					<view class="t">
						运行车辆
					</view>
					<view class="num1">
						{{carCounts.running}}
					</view>
					<view class="num2" v-if="!!carCounts.all">
						{{(carCounts.running/carCounts.all*100).toFixed(2)}}%
					</view>
				</view>
				
				<view class="item blue">
					<view class="t">
						静止车辆
					</view>
					<view class="num1">
						{{carCounts.static}}
					</view>
					<view class="num2" v-if="!!carCounts.all">
						{{(carCounts.static/carCounts.all*100).toFixed(2)}}%
					</view>
				</view>
				
				<view class="item orange">
					<view class="t">
						怠速车辆
					</view>
					<view class="num1">
						{{carCounts.idling}}
					</view>
					<view class="num2" v-if="!!carCounts.all">
						{{(carCounts.idling/carCounts.all*100).toFixed(2)}}%
					</view>
				</view>
				
				<!-- <view class="item green1">
					<view class="t">
						行驶车辆
					</view>
					<view class="num1">
						{{carCounts.all}}
					</view>
					<view class="num2" v-if="!!carCounts.all">
						{{(carCounts.running/carCounts.all*100).toFixed(2)}}%
					</view>
				</view> -->
				
				<view class="item gray">
					<view class="t">
						离线车辆
					</view>
					<view class="num1">
						{{carCounts.off}}
					</view>
					<view class="num2" v-if="!!carCounts.all">
						{{(carCounts.off/carCounts.all*100).toFixed(2)}}%
					</view>
				</view>
				
			</view>
			
			
		</view>
		
		
</template>


<script>
	var _self;
	var canvasObj = {};
	import http from '../../common/request';
	import uCharts from '../../components/u-charts/u-charts.js';
	export default {
		props: ['carCounts'],
		data() {
			return {
				pixelRatio: 1,
				cWidth: '',
				cHeight:'',
				Ring: {
					// series: [50, 30, 20,10, 5],
					series: [{
						"name": "运行",
						"data": 50,
						color: '#52C41A'
					}, {
						"name": "静止",
						"data": 30,
						color: '#3370FF'
					}, {
						"name": "怠速",
						"data": 20,
						color: '#FF6000'
					}, {
						"name": "行驶",
						"data": 18,
						color: '#0EC4AC'
					}, {
						"name": "离线",
						"data": 8,
						color: '#666666'
					}]
				},
			}
		},
		mounted() {
			
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
			this.cWidth = uni.upx2px(300);
			this.cHeight = uni.upx2px(300);
			this.showRing("canvasRing", this.Ring);
			
		},
		methods: {
			showRing(canvasId, chartData) {
				let that = this;
				canvasObj[canvasId] = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'ring',
					fontSize: 11,
					padding: [10, 5, 5, 2],
					legend: {
						show: false
					},
					// title: {
					// 	name: '99999',
					// 	color: '#000',
					// 	fontSize: 30 * _self.pixelRatio,
					// },
					extra: {
						pie: {
							lableWidth: 15,
							ringWidth: 14 * _self.pixelRatio, //圆环的宽度
							offsetAngle: -90, //圆环的角度
						}
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					series: chartData.series,
					animation: false,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					disablePieStroke: true,
					dataLabel: false,
					
				});
			
			},
			changeData() {
				canvasObj['canvasRing'].updateData({
					series: _self.serverData.ColumnB.series,
					categories: _self.serverData.ColumnB.categories
				});
			},
			
		}
	}
</script>

<style scoped lang="scss">
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
			position: relative;
			.num{
				width: 100%;
				text-align: center;
				position: absolute;
				top: 130rpx;
				font-size: 48rpx;
				
			}
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
		
	
	
</style>