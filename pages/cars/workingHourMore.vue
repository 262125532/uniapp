<template>
	<view class="content">
		<navBar :navBar="navBar" />

		<view class="date-select">
			<!-- 2022年7月 -->
			<picker mode="date" :value="time" start="2010-10-01" end="2023-07-01" fields="month"
				@change="bindDateChange">
				<view class="uni-input">
					{{time}}
					<image class="icon" src="../../static/img/right.png" alt=""></image>
				</view>
			</picker>
		</view>
		<view class="title">
			统计指标
		</view>
		<view class="card-box">
			<view class="uni-flex uni-row">
				<view class="item" style="background-color: rgba(51,112,255,0.08);">
					<view class="t">
						平均工作时长
					</view>
					<view class="value" style="color: #3370FF;">
						{{(monthInfo.avgWorkTime/60/60 || 0).toFixed(1)}}<text class="bit">小时</text>
					</view>
				</view>
				<view class="item" style="background-color: rgba(82,196,26,0.08);">
					<view class="t">
						平均运行时长
					</view>
					<view class="value" style="color: #52C41A;">
						{{(monthInfo.avgRunningTime/60/60 || 0).toFixed(1)}}<text class="bit">小时</text>
					</view>
				</view>
				<view class="item" style="background-color: rgba(250,100,0,0.08)">
					<view class="t">
						平均怠速时长
					</view>
					<view class="value" style="color: #FA6400;">
						{{(monthInfo.avgIdlingTime/60/60 || 0).toFixed(1)}}<text class="bit">小时</text>
					</view>
				</view>
			</view>

			<view class="uni-flex uni-row">
				<view class="text" style="-webkit-flex: 1;flex: 1;">
					<view class="uni-flex uni-row item" style="background-color: #F4F7FA">
						<view class="left-icon">
							<image class="img" src="../../static/img/累计工作.png"></image>
						</view>
						<view class="">
							<view style="background-color: #F4F7FA;">
								<view class="t">
									平均利用率
								</view>
								<view class="value" style="color: #000;">
									{{(monthInfo.avgUtil || 0).toFixed(1)}}<text class="bit">%</text>
								</view>
							</view>
						</view>
					</view>
				</view>

				<view class="text" style="-webkit-flex: 1;flex: 1;">
					<view class="uni-flex uni-row item" style="background-color: #F4F7FA">
						<view class="left-icon">
							<image class="img" src="../../static/img/累计出勤.png"></image>
						</view>
						<view class="">
							<view style="background-color: #F4F7FA;">
								<view class="t">
									出勤天数
								</view>
								<view class="value" style="color: #000;">
									{{monthInfo.workDays}}<text class="bit">天</text>
								</view>
							</view>
						</view>

					</view>

				</view>
			</view>
		</view>




		<view class="title">
			每日详情
		</view>

		<view class="card-box">
			<view class="day-row" v-for="item in daysInfo">
				<view class="date">
					{{item.day}}
				</view>
				<view class="uni-flex uni-row day-detail">
					<view class="value">
						<image class="img" src="../../static/img/今日工时.png"></image>
						<text>运行时长:</text>
						<text class="val" style="color: #52C41A;">
							{{(item.runningTime/60/60 || 0).toFixed(1)}}小时
						</text>
					</view>
					<view class="value">
						<image class="img" src="../../static/img/今日工时.png"></image>
						<text>怠速时长:</text>
						<text class="val" style="color: #FF6000;">
							{{(item.idlingTime/60/60 || 0).toFixed(1)}}小时
						</text>
					</view>
				</view>
				<gunter :data="item.workList" />

			</view>


		</view>
	</view>
</template>


<script>
	import date from '../../common/date'
	import http from '../../common/request';
	import navBar from "../../components/navBar";
	import mixChart from '@/components/mixChart.vue'
	import gunter from "../../components/gunter.vue"
	export default {
		components: {
			navBar,
			mixChart,
			gunter,
		},
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				triggered: true,
				navBar: {
					bgcolor: '#F8F8F8', //导航背景颜色，不传默认#F8F8F8
					back: true, //回退箭头，不传默认true
					backcolor: '#333', //回退箭头颜色，不传默认#333
					previousText: '', //回退提示，不传默认直接回退
					title: "工时详情", //本页标题，必传
					titlecolor: '#333', //本页标题颜色，不传默认#333
				},
				carInfo: {},
				monthInfo: {},
				daysInfo: [],
				monthDate: date.getMonthDate(),
				time: currentDate

			}
		},
		onLoad() {
			this.carInfo = uni.getStorageSync('carInfo');
			this.getData()
		},
		methods: {
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}`;
				// return `${year}-${month}-${day}`;
			},
			bindDateChange: function(e) {
				this.time = e.detail.value;
				console.log(333, e.detail.value)
				this.monthDate = date.getMonthDate(e.detail.value)
				this.getData()
			},
			getData() {
				http.get('carWorkingHour', '',
					`?carId=${this.carInfo.carId}&startDay=${this.monthDate.start}&endDay=${this.monthDate.end}`).then(
					res => {
						this.monthInfo = res.data
					})
				
				http.post('carWorkingMore', '',
					`?carId=${this.carInfo.carId}&startDay=${this.monthDate.start}&endDay=${this.monthDate.end}&pageNum=1&pageSize=100`
				).then(res => {
					this.daysInfo = res.data.list.map(it => {
						let _workList = it.workList.map(val => {
							const day = 24 * 60 * 60;
							let dayStart = new Date(new Date(it.date).toLocaleDateString())
								.getTime();
							let itemStart = new Date(val.startTime).getTime();
							let left = ((itemStart - dayStart) / day / 10).toFixed(2) + '%';
							let width = (val.duration / day * 100).toFixed(2) + '%';
							return {
								width: width,
								left: left,
								color: val.status == 1 ? '#52C41A' : 'rgba(255, 96, 0, 0.69)'
							}
						})
						return {
							...it,
							workList: _workList
							// runningTime: date.shiftTimeStamp(val.runningTime),
							// idlingTime: date.shiftTimeStamp(val.idlingTime),
						}
					});
				})
			}


		}
	}
</script>


<style scoped lang="scss">
	.content {
		background: #F0F2F5;
		min-height: calc(100vh - 0rpx);
		box-sizing: border-box;
	}

	.date-select {
		height: 112rpx;
		line-height: 112rpx;
		padding: 0 24rpx;
		background-color: #fff;
		text-align: right;
		padding-top: 20rpx;
		box-sizing: border-box;
		
		.icon {
			width: 24rpx;
			height: 24rpx;
			transform: rotate(90deg);
			margin-left: 10rpx;
		}
	}

	.title {
		height: 96rpx;
		line-height: 96rpx;
		font-size: 28rpx;
		padding-left: 24rpx;
	}

	.card-box {
		background-color: #fff;
		border-radius: 16rpx;
		padding: 24rpx 10rpx;
		box-sizing: border-box;
		margin: 0 24rpx;

		.item {
			border-radius: 16rpx;
			padding: 20rpx 0 20rpx 24rpx;
			-webkit-flex: 1;
			flex: 1;
			margin: 10rpx;

			.t {
				font-size: 28rpx;
				margin-bottom: 10rpx;
			}

			.value {
				font-size: 36rpx;

				.bit {
					color: #999;
					font-size: 28rpx;
					margin-left: 10rpx;
				}
			}

		}

		.left-icon {
			.img {
				width: 80rpx;
				height: 80rpx;
				margin-right: 16rpx;
				margin-top: 6rpx;
			}
		}

		.day-row {
			border-bottom: 1px solid #E4E5E8;
			padding-bottom: 50rpx;
			margin-bottom: 34rpx;
		}

		.day-row:last-child {
			border: none;
			margin-bottom: 0rpx;
		}

		.day-detail {
			.value {
				height: 56rpx;
				line-height: 56rpx;
				-webkit-flex: 1;
				flex: 1;
				margin: 0 8rpx;
				background-color: #F4F7FA;
				padding-left: 24rpx;
				font-size: 28rpx;

				.val {
					margin-left: 10rpx;
				}

				.img {
					width: 32rpx;
					height: 32rpx;
					vertical-align: sub;
					margin-right: 14rpx;
				}
			}
		}

		.date {
			padding-left: 10rpx;
			margin: 0rpx 0 32rpx 0;
			font-size: 32rpx;
		}
	}
</style>