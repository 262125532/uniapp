<template>
	<view class="content">
		<navBar :navBar="navBar" />

		<view class="uni-flex uni-row tab-box">
			<view class="flex1">
				<view :class="activeTab?'tab active':'tab'" @click="changeActive">
					工时画像
				</view>
			</view>
			<view class="flex1">
				<view :class="activeTab?'tab':'tab active'" @click="changeActive">
					报警画像
				</view>
			</view>
		</view>

		<view v-if="activeTab">
			<view class="title">
				工时统计
			</view>
			<view class="uni-flex uni-row values">
				<view class="flex1 item" style="background-color: rgba(51,112,255,0.08);">
					<view class="value" style="color: #3370FF;">
						{{(datas.workTime/60/60 || 0).toFixed(1)}}
					</view>
					<view class="t">
						累计工作
					</view>
					<view class="bit">
						（小时）
					</view>
				</view>
				<view class="flex1 item" style="background-color: rgba(82,196,26,0.08);">
					<view class="value" style="color: #52C41A;">
						{{(datas.runningTime/60/60 || 0).toFixed(1)}}
					</view>
					<view class="t">
						累计运行
					</view>
					<view class="bit">
						（小时）
					</view>
				</view>
				<view class="flex1 item" style="background-color: rgba(250,100,0,0.08);">
					<view class="value" style="color: #FA6400;">
						{{(datas.idlingTime/60/60 || 0).toFixed(1)}}
					</view>
					<view class="t">
						累计怠速
					</view>
					<view class="bit">
						（小时）
					</view>
				</view>
				<view class="flex1 item" style="background-color: rgba(113,102,228,0.08);">
					<view class="value" style="color: #7166E4;">
						{{datas.workDays || 0}}
					</view>
					<view class="t">
						累计出勤
					</view>
					<view class="bit">
						（天）
					</view>
				</view>
			</view>
			<carWorkingHout />
		</view>

		<view v-if="!activeTab">
			<view class="alarm-box">
				<view class="title">
					围栏报警分布
				</view>
				<ring :data="fenceAlarm" />
			</view>
			<view class="alarm-box">
				<view class="title">
					终端报警分布
				</view>
				<column :data="terminalAlarm" />
			</view>
		</view>







	</view>
</template>


<script>
	import http from '../../common/request';
	import navBar from "../../components/navBar";
	import carWorkingHout from '@/components/carWorkingHour.vue'
	import ring from '@/components/ring.vue'
	import column from '@/components/column.vue'
	export default {
		data() {
			return {
				triggered: true,
				navBar: {
					bgcolor: '#F8F8F8', //导航背景颜色，不传默认#F8F8F8
					back: true, //回退箭头，不传默认true
					backcolor: '#333', //回退箭头颜色，不传默认#333
					previousText: '', //回退提示，不传默认直接回退
					title: "车辆画像", //本页标题，必传
					titlecolor: '#333', //本页标题颜色，不传默认#333
				},
				activeTab: true,
				carInfo: {},
				datas: {},
				fenceAlarm: [{
					"alarmMessage": "禁止超速报警",
					"number": 5
				}],
				terminalAlarm: {}
			}
		},
		components: {
			navBar,
			carWorkingHout,
			ring,
			column
		},
		onLoad() {
			this.carInfo = uni.getStorageSync('carInfo');
			this.getData()
			console.log(111, this.carInfo)
		},
		methods: {
			changeActive() {
				this.activeTab = !this.activeTab
			},
			getData() {
				let that = this;
				let params = {
					carId: this.carInfo.carId,
					startDay: '',
					endDay: '',
				}
				http.get('carWorkingHour', params).then(res => {
					that.datas = res.data

				})

				let params1 = {
					carId: that.carInfo.carId,
					kind: 2
				}

				http.get('paintingAlarms', params1).then(res => {

					let _categories = [];
					let _number = []
					res.data.list.forEach(val => {
						_categories.push(val.alarmMessage)
						_number.push(val.number)

					})

					that.terminalAlarm = {
						categories: _categories,
						series: [{
							name: '报警数量',
							data: _number
						}]
					}

				})
			}

		}
	}
</script>


<style scoped lang="scss">
	.content {
		background: #F0F2F5;
		min-height: calc(100vh - 0rpx);

		.flex1 {

			-webkit-flex: 1;
			flex: 1;
		}

		.title {
			height: 100rpx;
			line-height: 100rpx;
			padding-left: 24rpx;
			color: #666;
			font-size: 28rpx;

		}

		.tab-box {
			background-color: #fff;
			padding: 24rpx 12rpx;


			.tab {
				height: 72rpx;
				line-height: 72rpx;
				margin: 0 12rpx;
				text-align: center;
				border-radius: 16rpx;
				background-color: #F4F7FA;
			}

			.active {
				background-color: #3370FF;
				color: #fff;
			}

		}

		.values {
			text-align: center;
			margin: 0 24rpx;
			border-radius: 16rpx;
			background-color: #fff;
			padding: 24rpx 12rpx;


			.item {
				padding: 20rpx 0;
				box-sizing: border-box;
				border-radius: 16rpx;
				margin: 0 12rpx;

			}

			.value {
				font-size: 36rpx;
			}

			.t {
				font-size: 24rpx;
			}

			.bit {
				font-size: 24rpx;

			}
		}

		.alarm-box {
			border-radius: 16rpx;
			margin: 24rpx;
			background-color: #fff;
			padding: 0 24rpx 24rpx 24rpx;

			.title {
				font-size: 32rpx;
				padding-left: 0;
			}

			.chart {
				height: 350rpx;
			}
		}


	}
</style>