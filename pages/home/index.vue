<template>
		<view class="home">
			<view class="areaName" @click="showTree">
				{{areaName}}
				
			</view>
			<tki-tree
				ref="tkitree" 
				:selectParent="selectParent" 
				:multiple="multiple"
				:range="orgTree" 
				:foldAll="flod" 
				rangeKey="name" 
				@confirm="treeConfirm"
				@cancel="treeCancel">
			</tki-tree>
			
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
					总车辆
				</view>
				<view class="right">
					<view class="item green">
						<view class="t">
							运行车辆
						</view>
						<view class="num1">
							999
						</view>
						<view class="num2">
							99.99%
						</view>
					</view>
					
					<view class="item blue">
						<view class="t">
							静止车辆
						</view>
						<view class="num1">
							999
						</view>
						<view class="num2">
							99.99%
						</view>
					</view>
					
					<view class="item orange">
						<view class="t">
							怠速车辆
						</view>
						<view class="num1">
							999
						</view>
						<view class="num2">
							99.99%
						</view>
					</view>
					
					<view class="item green1">
						<view class="t">
							行驶车辆
						</view>
						<view class="num1">
							999
						</view>
						<view class="num2">
							99.99%
						</view>
					</view>
					
					<view class="item gray">
						<view class="t">
							离线车辆
						</view>
						<view class="num1">
							999
						</view>
						<view class="num2">
							99.99%
						</view>
					</view>
					
				</view>
				
				
			</view>
			
			<view class="title">
				工时统计
			</view>
			<view class="car-box today-hour">
				<view class="card-title">
					今日工时
				</view>
				
				
				<view class="uni-flex uni-row">
					<view style="-webkit-flex: 1;flex: 1;">
						<view class="card">
							<view class="icon">
								<image class="img" src="../../static/img/开工车辆数.png" alt="">
							</view>
							<view class="sub-t">
								开工车辆数
							</view>
							<view class="num" style="color: #3370FF;">
								99999
								<text class="bit">台</text>
							</view>
						</view>
					</view>
					<view style="-webkit-flex: 1;flex: 1;">
						<view class="card">
							<view class="icon">
								<image class="img" src="../../static/img/未开工车辆数.png" alt="">
							</view>
							<view class="sub-t">
								未开工车辆数
							</view>
							<view class="num">
								99999
								<text class="bit">台</text>
							</view>
						</view>
						
					</view>
				</view>
				
				<view class="uni-flex uni-row">
					<view style="-webkit-flex: 1;flex: 1;">
						<view class="card1" style="background-color: rgba(51,112,255,0.08);">
							<view class="sub-t">
								总工作时长
							</view>
							<view class="num" style="color: #3370FF;">
								99999
								<text class="bit">小时</text>
							</view>
							
						</view>
					</view>
					<view style="-webkit-flex: 1;flex: 1;">
						<view class="card1" style="background-color: rgba(82,196,26,0.08);">
							<view class="sub-t">
								总运行时长
							</view>
							<view class="num" style="color: #52C41A;">
								9999.9
								<text class="bit">小时</text>
							</view>
							
						</view>
					</view>
					<view style="-webkit-flex: 1;flex: 1;">
						<view class="card1" style="background-color: rgba(250,100,0,0.08);">
							<view class="sub-t">
								百公里油耗
							</view>
							<view class="num" style="color: #FF6000;">
								99999
								<text class="bit">小时</text>
							</view>
							
						</view>
					</view>
					
				</view>
				
				<view class="uni-flex uni-row">
					<view style="-webkit-flex: 1;flex: 1;">
						<view class="card1" style="background-color: rgba(51,112,255,0.08);">
							<view class="sub-t">
								平均工作时长
							</view>
							<view class="num" style="color: #3370FF; ">
								99999
								<text class="bit">小时</text>
							</view>
							
						</view>
					</view>
					<view style="-webkit-flex: 1;flex: 1;">
						<view class="card1" style="background-color: rgba(82,196,26,0.08);">
							<view class="sub-t">
								平均运行时长
							</view>
							<view class="num" style="color: #52C41A;">
								99999
								<text class="bit">小时</text>
							</view>
							
						</view>
					</view>
					<view style="-webkit-flex: 1;flex: 1;">
						<view class="card1"  style="background-color: rgba(250,100,0,0.08);">
							<view class="sub-t">
								平均怠速时长
							</view>
							<view class="num" style="color: #FF6000;">
								99999
								<text class="bit">小时</text>
							</view>
							
						</view>
					</view>
				</view>
				
			</view>
			
			<view class="car-box week-hour">
				<view class="card-title">
					本周工时
				</view>
				<view class="tab">
					<view :class="hourActive?'item active':'item'" @click="changeHourActive">
						趋势
					</view>
					<view :class="hourActive?'item':'item active'" @click="changeHourActive">
						TOP5
					</view>
				</view>
				<view class="week-hour-chart" v-if="hourActive">
					<!--#ifdef MP-ALIPAY -->
					<canvas canvas-id="canvasMix" id="canvasMix" class="charts" :width="cWidth1*pixelRatio" :height="cHeight1*pixelRatio"
					 :style="{'width':cWidth1+'px','height':cHeight1+'px'}" disable-scroll=true @touchstart="touchMix" @touchmove="moveMix"
					 @touchend="touchEndMix"></canvas>
					<!--#endif-->
					<!--#ifndef MP-ALIPAY -->
					<canvas canvas-id="canvasMix" id="canvasMix" class="charts" disable-scroll=true @touchstart="touchMix" @touchmove="moveMix"
					 @touchend="touchEndMix"></canvas>
					<!--#endif-->
				</view>
				<weekHourTop5 v-if="!hourActive" />
			</view>
			
			<view class="title">
				报警统计
			</view>
			<view class="car-box today-alarm">
				<view class="card-title">
					今日报警
				</view>
				
				<view class="alarm">
					<view class="icon">
						<image class="img" src="../../static/img/报警总数.png" alt="">
					</view>
					<view class="num-box">
						<view class="t">
							报警总数
						</view>
						
						<view class="num">
							99999
						</view>
						
					</view>
					<view class="tip">
						表示进入违规驶入使出、超速、偏离路线的报警数量
					</view>
				</view>
			</view>
			<view class="car-box week-alarm">
				<view class="card-title">
					本周围栏报警
				</view>
				
				<view class="tab">
					<view :class="weekActive==1 ? 'item active':'item'" @click="changeWeekActive(1)">
						报警趋势
					</view>
					<view :class="weekActive==2 ? 'item active':'item'" @click="changeWeekActive(2)">
						报警分布
					</view>
					<view :class="weekActive==3 ? 'item active':'item'" @click="changeWeekActive(3)">
						TOP5
					</view>
				</view>
				
				<view class="week-alarm-chart" style="background-color: #E5FDC3;" v-if="weekActive==1">
					<!--#ifdef MP-ALIPAY -->
					<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" style="background-color: #E5FDC3;" :width="cWidth1*pixelRatio"
					 :height="cHeight1*pixelRatio" :style="{'width':cWidth1+'px','height':cHeight1+'px'}" @touchstart="touchIt($event,'canvasColumn')"></canvas>
					<!--#endif-->
					<!--#ifndef MP-ALIPAY -->
					<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" style="background-color: #E5FDC3;" @touchstart="touchIt($event,'canvasColumn')"></canvas>
					<!--#endif-->
				</view>
			</view>
			
			<view :class="showAll1?'car-box week-alarm':'car-box week-alarm week-alarm-inline'" >
				<view class="card-title" @click="changeShowAll1()">
					终端电量不足
					<image class="icon" src="../../static/img/right.png" alt="">
				</view>
				
				<view class="uni-flex uni-row list" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
					<view class="text item">N5456R123456678</view>
					<view class="text item">N5456R123456678</view>
					<view class="text item">N5456R123456678</view>
					<view class="text item">N5456R123456678</view>
					<view class="text item">N5456R123456678</view>
					<view class="text item">N5456R123456678</view>
					<view class="text item">京aaa</view>
				</view>
			</view>
			
			<view :class="showAll2?'car-box week-alarm':'car-box week-alarm week-alarm-inline'" >
				<view class="card-title" @click="changeShowAll2()">
					安装异常报警
					<image class="icon" src="../../static/img/right.png" alt="">
				</view>
				
				<view class="uni-flex uni-row list" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
					<view class="text item">N5456R123456678</view>
					<view class="text item">N5456R123456678</view>
					<view class="text item">N5456R123456678</view>
					<view class="text item">N5456R123456678</view>
					<view class="text item">N5456R123456678</view>
					<view class="text item">N5456R123456678</view>
					<view class="text item">京aaa</view>
				</view>
			</view>
			
			<view :class="showAll3?'car-box week-alarm':'car-box week-alarm week-alarm-inline'" >
				<view class="card-title" @click="changeShowAll3()">
					终端拆壳异常
					<image class="icon" src="../../static/img/right.png" alt="">
				</view>
				
				<view class="uni-flex uni-row list" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
					<view class="text item">N5456R123456678</view>
					<view class="text item">N5456R123456678</view>
					<view class="text item">N5456R123456678</view>
					<view class="text item">N5456R123456678</view>
					<view class="text item">N5456R123456678</view>
					<view class="text item">N5456R123456678</view>
					<view class="text item">京aaa</view>
				</view>
			</view>
			
			<view :class="showAll4?'car-box week-alarm':'car-box week-alarm week-alarm-inline'" >
				<view class="card-title" @click="changeShowAll4()">
					终端拆除报警
					<image class="icon" src="../../static/img/right.png" alt="">
				</view>
				
				<view class="uni-flex uni-row list" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
					<view class="text item">N5456R123456678</view>
					<view class="text item">N5456R123456678</view>
					<view class="text item">N5456R123456678</view>
					<view class="text item">N5456R123456678</view>
					<view class="text item">N5456R123456678</view>
					<view class="text item">N5456R123456678</view>
					<view class="text item">京aaa</view>
				</view>
			</view>
		</view>
</template>


<script>
	import http from '../../common/request';
	import tkiTree from '@/components/tki-tree/tki-tree.vue';
	import uCharts from '../../components/u-charts/u-charts.js';
	import weekHourTop5 from './weekHourTop5.vue'
	var _self;
	var canvasObj = {};
	export default {
		data() {
			return {
				pixelRatio: 1,
				cWidth: '',
				cHeight:'',
				cWidth1: '',
				cHeight1:'',
				areaId: 1,
				areaName: '全部',
				orgTree: [],
				multiple: false,
				selectParent: true,
				flod: false,
				hourActive: true,
				weekActive: 1,
				showAll: [true, false, false, false,],
				showAll1: false,
				showAll2: false,
				showAll3: false,
				showAll4: false,
				"Mix": {
					"categories":["6.1", "6.2", "6.3", "6.4", "6.5", "6.6", '6.7'],
					"series": [{
						"name": "总运行时长",
						"data": [40, 30, 55, 110, 24, 58, 44],
						"type": "column",
						legendShape: 'line',
						color: '#52C41A'
					}, {
						"name": "总怠速时长",
						"data": [50, 20, 75, 60, 34, 38, 44],
						"type": "column",
						legendShape: 'line',
						color: '#FF6000'
					}, {
						"name": "平均工作时长",
						"data": [70, 50, 85, 130, 64, 88, 44],
						"type": "line",
						// "style": "curve",
						"color": "#FFC200",
						legendShape: 'line',
						pointShape: 'circle',
						addPoint: true
					}, {
						"name": "平均运行时长",
						"data": [120, 140, 105, 170, 95, 160, 44],
						"type": "line",
						"color": "#0080FF",
						legendShape: 'line',
						pointShape: 'circle',
						addPoint: true
					}, {
						"name": "平均怠速时长",
						"data": [120, 140, 105, 170, 95, 160, 44],
						"type": "line",
						"color": "#7166E4",
						legendShape: 'line',
						pointShape: 'circle',
						addPoint: true
					}]
				},
				Ring: {
					"series": [{
						"name": "一班",
						"data": 50,
						color: '#52C41A'
					}, {
						"name": "二班",
						"data": 30,
						color: '#3370FF'
					}, {
						"name": "三班",
						"data": 20,
						color: '#FF6000'
					}, {
						"name": "四班",
						"data": 18,
						color: '#0EC4AC'
					}, {
						"name": "五班",
						"data": 8,
						color: '#666666'
					}]
				},
				Column: {
					"categories": ["6.1", "6.2", "6.3", "6.4", "6.5", "6.6"],
					"series": [{
						"name": "成交量1",
						color: '#FFA4AC',
						"data": [15, 20, 45, 37, 43, 34]
					}]
				},

			}
		},
		onLoad() {
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
			this.cWidth1 = uni.upx2px(650);
			this.cHeight1 = uni.upx2px(300);
			
			this.init()
			this.showRing("canvasRing", this.Ring);
			this.showMix("canvasMix", this.Mix);
			this.showColumn("canvasColumn", this.Column);
			
			
		},
		components: {  tkiTree, weekHourTop5 },
		methods: {
			init() {
				let that = this;
				//获取组织列表
				http.get("org").then( res => {
					that.orgTree = res.data[0].children;
					that.setTreeChecked(that.orgTree, that.areaId )
					
				})
				
			},
			changeShowAll1() {
				this.showAll1 = !this.showAll1;
			},
			changeShowAll2() {
				this.showAll2 = !this.showAll2;
			},
			changeShowAll3() {
				this.showAll3 = !this.showAll3;
			},
			changeShowAll4() {
				this.showAll4 = !this.showAll4;
			},
			changeHourActive() {
				this.hourActive = !this.hourActive
			},
			changeWeekActive(index) {
				this.weekActive = index
				
			},
			showTree() {
				this.$refs.tkitree._show();
			},
			treeConfirm(e) {
				console.log(e)
				this.areaId = e[0].id;
				this.areaName= e[0].name;
			},
			treeCancel() {
				
			},
			setTreeChecked(tree, checkedId) {
				let that = this;
				tree.forEach(val => {
					if(val.id == checkedId) {
						val.checked = true;
						that.carInfo.areaName = val.name;
					}
					
					if(val.children && val.children.length) {
						that.setTreeChecked(val.children, checkedId)
					}
				})
				
				
			},
			touchMix(e) {
				canvasObj['canvasMix'].scrollStart(e);
			},
			moveMix(e) {
				canvasObj['canvasMix'].scroll(e);
			},
			touchEndMix(e) {
				canvasObj['canvasMix'].scrollEnd(e);
				canvasObj['canvasMix'].touchLegend(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
				canvasObj['canvasMix'].showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			},
			showRing(canvasId, chartData) {
				canvasObj[canvasId] = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'ring',
					fontSize: 11,
					padding: [10, 5, 5, 10],
					legend: {
						show: false
					},
					title: {
						name: '99999',
						color: '#000',
						fontSize: 30 * _self.pixelRatio,
					},
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
			showMix(canvasId, chartData) {
				canvasObj[canvasId] = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'mix',
					fontSize: 11,
					padding: [15, 15, 0, 15],
					legend: {
						show: true,
						padding: 5,
						lineHeight: 11,
						margin: 6,
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: false,
					// enableScroll: true, //开启图表拖拽功能
					xAxis: {
						disableGrid: false,
						type: 'grid',
						gridType: 'dash',
						itemCount: 4,
						scrollShow: true,
						scrollAlign: 'left',
					},
					yAxis: {
						gridType: 'dash',
						dashLength: 4,
						splitNumber: 5,
						min: 10,
						max: 180,
						format: (val) => {
							return val.toFixed(0)
						}
					},
					width: _self.cWidth1 * _self.pixelRatio,
					height: _self.cHeight1 * _self.pixelRatio,
					dataLabel: false,
					dataPointShape: false,
					extra: {
						bar: {
							type: 'stack',
						},
						column: {
							type: "stack",
							width: 10 * _self.pixelRatio
						},
						line: {
							activeType: 'hollow'
						},
						lineStyle: 'straight',
						tooltip: {
							bgColor: '#000000',
							bgOpacity: 0.7,
							gridType: 'dash',
							dashLength: 8,
							gridColor: '#1890ff',
							fontColor: '#FFFFFF',
							horizentalLine: true,
							xAxisLabel: true,
							yAxisLabel: true,
							labelBgColor: '#DFE8FF',
							labelBgOpacity: 0.95,
							labelAlign: 'left',
							labelFontColor: '#666666'
						}
					},
				});
			},
			showColumn(canvasId, chartData) {
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
					dataLabel: false,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						column: {
							// type: 'group',
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
		background-color: #F0F2F5;
			
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
			.icon{
				width: 24rpx;
				height: 24rpx;
				transform: rotate(-90deg);
				margin-left: 16rpx;
				transition: all .3s;
				
			}
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
				height: 126rpx;
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
				margin-top: 8rpx;
				.img{
					
					width: 100%;
					height: 100%;
				}
			}
			.num{
				font-size: 36rpx;
				margin-top: 0rpx;
				word-break: keep-all;
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
			transition: all .3s;
			
			.week-alarm-chart{
				width: 650rpx;
			}
			
		}
		.week-alarm-inline{
			height: 136rpx;
			overflow: hidden;
			.card-title{
				.icon{
					transform: rotate(90deg);
				}
			}
		}
		.list{
			.item{
				width: 212rpx;
				height: 96rpx;
				background-color: #F4F7FA;
				border-radius: 8rpx;
				display: inline-block;
				padding: 12rpx 24rpx;
				box-sizing: border-box;
				margin: 0 16rpx 16rpx 0;
				overflow: hidden;
				font-size: 28rpx;
				word-break: break-all;
				line-height: 40rpx;
				
			}
			.item:nth-child(3n) {
				margin: 0 0rpx 16rpx 0;
			}
		}
		
	}
	
	
</style>