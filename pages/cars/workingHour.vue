<template>
	<view class="content">
		<!-- <navBar :navBar="navBar" rightText="设置" @clickRight="back" /> -->
		<uni-nav-bar :fixed="true" shadow status-bar left-icon="left" left-text="" title="工时详情" @clickLeft="back"
			rightText="更多" @clickRight="goto('/pages/cars/workingHourMore')" />

		<view class="title">
			当日工时（{{today}}）
		</view>
		<view class="uni-flex uni-row hour-box">
			<view class="item" style="background-color: rgba(51,112,255,0.08);">
				<view class="t">
					工作时长
				</view>
				<view class="value" style="color: #3370FF;">
					{{(dayInfo.workTime/60/60 || 0).toFixed(1)}}<text class="bit">小时</text>
				</view>
			</view>
			<view class="item" style="background-color: rgba(82,196,26,0.08);">
				<view class="t">
					运行时长
				</view>
				<view class="value" style="color: #52C41A;">
					{{(dayInfo.runningTime/60/60|| 0).toFixed(1)}}<text class="bit">小时</text>
				</view>
			</view>
			<view class="item" style="background-color: rgba(250,100,0,0.08)">
				<view class="t">
					怠速时长
				</view>
				<view class="value" style="color: #FA6400;">
					{{(dayInfo.idlingTime/60/60|| 0).toFixed(1)}}<text class="bit">小时</text>
				</view>
			</view>
		</view>
		<view class="title">
			当周工时（{{weekDate.start}} ~ {{weekDate.end}}）
		</view>
		<view class="hour-box">
			<view class="uni-flex uni-row">
				<view class="item">
					<view class="t">
						平均工作时长
					</view>
					<view class="value" style="color: #3370FF;">
						{{(weekInfo.avgWorkTime/60/60|| 0).toFixed(1)}}<text class="bit">小时</text>
					</view>
				</view>
				<view class="item">
					<view class="t">
						平均运行时长
					</view>
					<view class="value" style="color: #52C41A;">
						{{(weekInfo.avgRunningTime/60/60|| 0).toFixed(1)}}<text class="bit">小时</text>
					</view>
				</view>
				<view class="item">
					<view class="t">
						平均怠速时长
					</view>
					<view class="value" style="color: #FA6400;">
						{{(weekInfo.avgIdlingTime/60/60 || 0).toFixed(1)}}<text class="bit">小时</text>
					</view>
				</view>
			</view>

			<view class="uni-flex uni-row">
				<view class="item">
					<view class="t">
						平均利用率
					</view>
					<view class="value" style="color: #000;">
						{{(weekInfo.avgUtil || 0).toFixed(1)}}<text class="bit">%</text>
					</view>
				</view>
				<view class="item">
					<view class="t">
						出勤天数
					</view>
					<view class="value" style="color: #000;">
						{{weekInfo.workDays}}<text class="bit">天</text>
					</view>
				</view>
				<view class="item">
				</view>
			</view>

			<mixChart :data="weekChart" id="carWeek" />
		</view>

		<view class="title">
			当月工时（{{monthDate.start}} ~ {{monthDate.end}}）
		</view>

		<view class="hour-box">
			<view class="uni-flex uni-row">
				<view class="item">
					<view class="t">
						平均工作时长
					</view>
					<view class="value" style="color: #3370FF;">
						{{(monthInfo.avgWorkTime/60/60 || 0).toFixed(1)}}<text class="bit">小时</text>
					</view>
				</view>
				<view class="item">
					<view class="t">
						平均运行时长
					</view>
					<view class="value" style="color: #52C41A;">
						{{(monthInfo.avgRunningTime/60/60 || 0).toFixed(1)}}<text class="bit">小时</text>
					</view>
				</view>
				<view class="item">
					<view class="t">
						平均怠速时长
					</view>
					<view class="value" style="color: #FA6400;">
						{{(monthInfo.avgIdlingTime/60/60 || 0).toFixed(1)}}<text class="bit">小时</text>
					</view>
				</view>
			</view>

			<view class="uni-flex uni-row">
				<view class="item">
					<view class="t">
						平均利用率
					</view>
					<view class="value" style="color: #000;">
						{{(monthInfo.avgUtil || 0).toFixed(1)}}<text class="bit">%</text>
					</view>
				</view>
				<view class="item">
					<view class="t">
						出勤天数
					</view>
					<view class="value" style="color: #000;">
						{{monthInfo.workDays}}<text class="bit">天</text>
					</view>
				</view>
				<view class="item">
				</view>
			</view>
			<mixChart :data="monthChart" id="carMonth" />
		</view>


		<!-- <view class="uni-flex uni-row">
			<view class="text" style="width: 200rpx;">固定宽度</view>
			<view class="text" style="-webkit-flex: 1;flex: 1;">自动占满</view>
			<view class="text" style="width: 200rpx;">固定宽度</view>
		</view>
		<view class="uni-flex uni-row" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
			<view class="text" style="width: 280rpx;">一行显示不全,wrap折行</view>
			<view class="text" style="width: 280rpx;">一行显示不全,wrap折行</view>
			<view class="text" style="width: 280rpx;">一行显示不全,wrap折行</view>
		</view> -->

	</view>
</template>


<script>
	import date from "../../common/date.js"
	import http from '../../common/request';
	import navBar from "../../components/navBar";
	import mixChart from '@/components/mixChart.vue'
	export default {
		components: {
			navBar,
			mixChart
		},
		data() {
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
				dayInfo: {},
				weekInfo: {},
				monthInfo: {},
				weekChart: [],
				monthChart: [],
				today: date.getCurrentDate(new Date().getTime()),
				weekDate : date.getWeekDate(),
				monthDate: date.getMonthDate()
				
			}
		},
		onLoad() {
			this.carInfo = uni.getStorageSync('carInfo');
			this.getData();
			console.log(date.getMonthDate())
		},
		methods: {
			goto(url) {
				uni.navigateTo({
					url: url
				})
			},
			getData() {
				let that = this;
				http.get('carWorkingHour', '', `?carId=${this.carInfo.carId}&startDay=${this.today}&endDay=${this.today}`).then(
					res => {
						this.dayInfo = res.data

					})
				
				http.get('carWorkingHour', '', `?carId=${this.carInfo.carId}&startDay=${this.weekDate.start}&endDay=${this.weekDate.end}`).then(
					res => {
						this.weekInfo = res.data
				
					})
					
				http.get('carWorkingHour', '', `?carId=${this.carInfo.carId}&startDay=${this.monthDate.start}&endDay=${this.monthDate.end}`).then(
					res => {
						this.monthInfo = res.data
				
					})

				http.get('carWorkingHourChart', '', `?carId=${this.carInfo.carId}&startDay=${this.weekDate.start}&endDay=${this.weekDate.end}`)
					.then(res => {
						if (res.code == 200) {
							let _categories = [];
							let _totalRunningTimes = [];
							let _totalIdlingTimes = [];
							let _lineSeries = [];

							res.data.list.forEach(val => {
								_categories.push(val.date.slice(5));
								_totalRunningTimes.push((val.runningTime / 60 / 60).toFixed(1) - 0)
								_totalIdlingTimes.push((val.idlingTime / 60 / 60).toFixed(1) - 0)
								_lineSeries.push((val.workTime / 60 / 60).toFixed(1) - 0 || null)
							})

							that.weekChart = {
								categories: _categories,
								columnSeries: [{
										name: "运行时长",
										textColor: "#FFFFFF",
										data: _totalRunningTimes
									},
									{
										name: "怠速时长",
										textColor: "#FFFFFF",
										data: _totalIdlingTimes
									},
								],
								lineSeries: [{
									name: "工作时长",
									data: _lineSeries
								}]
							}

						}
					})
				http.get('carWorkingHourChart', '', `?carId=${this.carInfo.carId}&startDay=${this.monthDate.start}&endDay=${this.monthDate.end}`)
					.then(res => {
						if (res.code == 200) {
							let _categories = [];
							let _totalRunningTimes = [];
							let _totalIdlingTimes = [];
							let _lineSeries = [];

							res.data.list.forEach(val => {
								_categories.push(val.date.slice(5));
								_totalRunningTimes.push((val.runningTime / 60 / 60).toFixed(1) - 0)
								_totalIdlingTimes.push((val.idlingTime / 60 / 60).toFixed(1) - 0)
								_lineSeries.push((val.workTime / 60 / 60).toFixed(1) - 0 || null)
							})

							that.monthChart = {
								categories: _categories,
								columnSeries: [{
										name: "运行时长",
										textColor: "#FFFFFF",
										data: _totalRunningTimes
									},
									{
										name: "怠速时长",
										textColor: "#FFFFFF",
										data: _totalIdlingTimes
									},
								],
								lineSeries: [{
									name: "工作时长",
									data: _lineSeries
								}]
							}

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
		padding: 0 24rpx;
		box-sizing: border-box;
	}

	.title {
		height: 96rpx;
		line-height: 96rpx;
		font-size: 28rpx;
	}

	.hour-box {
		background-color: #fff;
		border-radius: 16rpx;
		padding: 24rpx 10rpx;
		box-sizing: border-box;

		.item {
			border-radius: 16rpx;
			padding: 20rpx 0 20rpx 24rpx;
			-webkit-flex: 1;
			flex: 1;
			margin: 10rpx;

			.t {
				font-size: 30rpx;
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
	}
</style>