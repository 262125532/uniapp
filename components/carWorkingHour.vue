<template>
	<view class="car-working-hour">
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
	</view>
</template>


<script>
	import date from "../common/date.js"
	import http from '../common/request';
	import mixChart from './mixChart.vue'
	export default {
		components: {
			mixChart
		},
		data() {
			return {
				carInfo: {},
				weekInfo: {},
				monthInfo: {},
				weekChart: [],
				monthChart: [],
				today: date.getCurrentDate(new Date().getTime()),
				weekDate : date.getWeekDate(),
				monthDate: date.getMonthDate()
				
			}
		},
		mounted() {
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
	.car-working-hour {
		margin: 0 24rpx;
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