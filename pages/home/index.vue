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
			
			<carCount :carCounts="carCounts" />
			
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
								{{dataHourDatas.workCars}}
								<text class="bit">辆</text>
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
								{{dataHourDatas.notWorkCars}}
								<text class="bit">辆</text>
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
								{{(dataHourDatas.totalWorkTime/60/60).toFixed(1)}}
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
								{{(dataHourDatas.totalRunningTime/60/60).toFixed(1)}}
								<text class="bit">小时</text>
							</view>
							
						</view>
					</view>
					<view style="-webkit-flex: 1;flex: 1;">
						<view class="card1" style="background-color: rgba(250,100,0,0.08);">
							<view class="sub-t">
								总怠速时长
							</view>
							<view class="num" style="color: #FF6000;">
								{{(dataHourDatas.totalIdlingTime/60/60).toFixed(1)}}
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
								{{(dataHourDatas.avgWorkTime/60/60).toFixed(1)}}
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
								{{(dataHourDatas.avgRunningTime/60/60).toFixed(1)}}
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
								{{(dataHourDatas.avgIdlingTime/60/60).toFixed(1)}}
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
				<mixChart v-if="hourActive" :data="mixChartData" />
				<stactBar :data="weekHourTop5Data" v-if="!hourActive"  />
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
							{{dayTotalAlarm}}
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
				
				<column v-if="weekActive==1" :data="weekAlarmByDay" />
				<ring v-if="weekActive==2" :data="weekAlarmByMessage" />
				<bar v-if="weekActive==3" :data="weekAlarmTop5" />
			</view>
			
			
			<view :class="showAll[index]?'car-box week-alarm':'car-box week-alarm week-alarm-inline'" v-for="(item, index) in alarmList" >
				<view class="card-title" @click="changeShowAll(index)">
					{{item.alarmMessage}}
					<image class="icon" src="../../static/img/right.png" alt="">
				</view>
				
				<view class="uni-flex uni-row list" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
					<view class="text item" v-for="device in item.licPlateNums">{{device}}</view>
				</view>
			</view>
		</view>
</template>


<script>
	import http from '../../common/request';
	import tkiTree from '@/components/tki-tree/tki-tree.vue';
	import uCharts from '../../components/u-charts/u-charts.js';
	import carCount from './carCount.vue'
	import mixChart from '@/components/mixChart.vue'
	import stactBar from '@/components/stactBar.vue'
	import column from '@/components/column.vue'
	import ring from '@/components/ring.vue'
	import bar from '@/components/bar.vue'
	var _self;
	var canvasObj = {};
	export default {
		components: {  tkiTree, carCount, mixChart, stactBar, column, ring, bar },
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
				showAll: [false, false, false, false,],
				carCounts: {
					"all": 0,
					"running": 0,
					"idling": 0,
					"static": 0,
					"off": 0
				},
				dataHourDatas: {},
				weekHourTop5Data: [],
				mixChartData: [],
				dayTotalAlarm: 0,
				weekAlarmByDay: [],
				weekAlarmByMessage: [],
				weekAlarmTop5: [],
				alarmList: []
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
		},
		
		methods: {
			init() {
				let that = this;
				//获取组织列表
				http.get("org").then( res => {
					if(res.data[0].id == 1) {
						res.data[0].name == "全部"
						that.orgTree = [
							{
								id: 1,
								name: "全部",
								children: res.data[0].children
							}
						];
					}else{
						that.orgTree = res.data
					}
					
					that.areaId = res.data[0].id;
					that.setTreeChecked(that.orgTree, that.areaId )
					
				})
				
				
				that.getDatas()
				
			},
			getDatas() {
				let that = this;
				
				//获取车辆数
				http.get("countByStatus", "", "?areaId=" + that.areaId).then( res => {
					if(res.code == 200 ){
						that.carCounts = res.data
					}
				})
				
				//今日工时统计
				http.get("dayHourStatistic").then( res => {
					res.code==200 && (that.dataHourDatas = res.data)
				})
				// 获取本周工时top5
				http.get("weekHourTop5", "", "?areaId=" + that.areaId).then(res => {
					res.code==200 &&  (that.weekHourTop5Data = res.data.list)
				})
				
				//获取本周工时趋势
				http.get("weekHourStatistic", "", "?areaId=" + that.areaId).then(res => {
					res.code==200 && (that.mixChartData = res.data.list)
				})
				
				//今日报警--报警总数
				http.get("dayAlarm", "", "?areaId=1").then( res => {
					res.code==200 && (that.dayTotalAlarm = res.data)
				})
				
				http.get("weekAlarmByDay", "", "?areaId=" + that.areaId).then( res => {
					res.code==200 && (that.weekAlarmByDay = res.data.list)
				})
				
				http.get("weekAlarmByMessage", "", "?areaId=" + that.areaId).then( res => {
					res.code==200 && (that.weekAlarmByMessage = res.data.list)
				})
				
				http.get("weekAlarmTop5", "", "?areaId=" + that.areaId).then( res => {
					res.code==200 && (that.weekAlarmTop5 = res.data.list)
				})
				http.get("deviceAlarmList", "", "?areaId=" + that.areaId).then( res=> {
					res.code==200 && (that.alarmList = res.data.list)
				})
				
				
			},
			changeShowAll(index) {
				this.showAll[index] = this.$set(this.showAll, index, !this.showAll[index])
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
						that.areaName = val.name;
					}
					
					if(val.children && val.children.length) {
						that.setTreeChecked(val.children, checkedId)
					}
				})
				
				
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
				padding: 24rpx 0 24rpx 24rpx;
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
				margin-top: 0rpx;
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
				height: 130rpx;
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