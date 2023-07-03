<template>
	<view class="content">
		<!-- <navBar :navBar="navBar" rightText="设置" @clickRight="back" /> -->
		<uni-nav-bar :fixed="true" shadow  status-bar left-icon="left" left-text=""
			title="工时详情" @clickLeft="back" rightText="更多" @clickRight="goto('/pages/cars/workingHourMore')"/>

		<view class="title">
			当时工时（2022-11-20）
		</view>
		<view class="uni-flex uni-row hour-box">
			<view class="item" style="background-color: rgba(51,112,255,0.08);">
				<view class="t">
					工作时长
				</view>
				<view class="value" style="color: #3370FF;">
					999<text class="bit">小时</text>
				</view>
			</view>
			<view class="item" style="background-color: rgba(82,196,26,0.08);">
				<view class="t">
					运行时长
				</view>
				<view class="value" style="color: #52C41A;">
					999<text class="bit">小时</text>
				</view>
			</view>
			<view class="item" style="background-color: rgba(250,100,0,0.08)">
				<view class="t">
					怠速时长
				</view>
				<view class="value" style="color: #FA6400;">
					999<text class="bit">小时</text>
				</view>
			</view>
		</view>
		<view class="title">
			当周工时（2022-11-14 ~ 2022-11-20）
		</view>
		<view class="hour-box">
			<view class="uni-flex uni-row">
				<view class="item">
					<view class="t">
						平均工作时长
					</view>
					<view class="value" style="color: #3370FF;">
						999<text class="bit">小时</text>
					</view>
				</view>
				<view class="item">
					<view class="t">
						平均运行时长
					</view>
					<view class="value" style="color: #52C41A;">
						999<text class="bit">小时</text>
					</view>
				</view>
				<view class="item">
					<view class="t">
						平均怠速时长
					</view>
					<view class="value" style="color: #FA6400;">
						999<text class="bit">小时</text>
					</view>
				</view>
			</view>

			<view class="uni-flex uni-row">
				<view class="item">
					<view class="t">
						平均利用率
					</view>
					<view class="value" style="color: #000;">
						99<text class="bit">%</text>
					</view>
				</view>
				<view class="item">
					<view class="t">
						出勤天数
					</view>
					<view class="value" style="color: #000;">
						30<text class="bit">天</text>
					</view>
				</view>
				<view class="item">
				</view>
			</view>

			<mixChart :data="mixChartData" />
		</view>

		<view class="title">
			当月工时（2022-11-01 ~ 2022-11-30）
		</view>

		<view class="hour-box">
			<view class="uni-flex uni-row">
				<view class="item">
					<view class="t">
						平均工作时长
					</view>
					<view class="value" style="color: #3370FF;">
						999<text class="bit">小时</text>
					</view>
				</view>
				<view class="item">
					<view class="t">
						平均运行时长
					</view>
					<view class="value" style="color: #52C41A;">
						999<text class="bit">小时</text>
					</view>
				</view>
				<view class="item">
					<view class="t">
						平均怠速时长
					</view>
					<view class="value" style="color: #FA6400;">
						999<text class="bit">小时</text>
					</view>
				</view>
			</view>

			<view class="uni-flex uni-row">
				<view class="item">
					<view class="t">
						平均利用率
					</view>
					<view class="value" style="color: #000;">
						99<text class="bit">%</text>
					</view>
				</view>
				<view class="item">
					<view class="t">
						出勤天数
					</view>
					<view class="value" style="color: #000;">
						30<text class="bit">天</text>
					</view>
				</view>
				<view class="item">
				</view>
			</view>
			<mixChart :data="mixChartData" />
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
				mixChartData: [{
					"totalIdlingTime": 296394,
					"date": "2023-07-03",
					"avgRunningTime": 3195,
					"totalWorkTime": 1571275,
					"notWorkCars": 9962,
					"totalDrivingTime": 1105513,
					"avgWorkTime": 29645,
					"totalRunningTime": 169368,
					"workCars": 38,
					"avgDrivingTime": 20858,
					"avgIdlingTime": 5592
				}, {
					"totalIdlingTime": 0,
					"date": "2023-07-04",
					"avgRunningTime": 0,
					"totalWorkTime": 0,
					"notWorkCars": 10000,
					"totalDrivingTime": 0,
					"avgWorkTime": 0,
					"totalRunningTime": 0,
					"workCars": 0,
					"avgDrivingTime": 0,
					"avgIdlingTime": 0
				}, {
					"totalIdlingTime": 0,
					"date": "2023-07-05",
					"avgRunningTime": 0,
					"totalWorkTime": 0,
					"notWorkCars": 10000,
					"totalDrivingTime": 0,
					"avgWorkTime": 0,
					"totalRunningTime": 0,
					"workCars": 0,
					"avgDrivingTime": 0,
					"avgIdlingTime": 0
				}, {
					"totalIdlingTime": 0,
					"date": "2023-07-06",
					"avgRunningTime": 0,
					"totalWorkTime": 0,
					"notWorkCars": 10000,
					"totalDrivingTime": 0,
					"avgWorkTime": 0,
					"totalRunningTime": 0,
					"workCars": 0,
					"avgDrivingTime": 0,
					"avgIdlingTime": 0
				}, {
					"totalIdlingTime": 0,
					"date": "2023-07-07",
					"avgRunningTime": 0,
					"totalWorkTime": 0,
					"notWorkCars": 10000,
					"totalDrivingTime": 0,
					"avgWorkTime": 0,
					"totalRunningTime": 0,
					"workCars": 0,
					"avgDrivingTime": 0,
					"avgIdlingTime": 0
				}, {
					"totalIdlingTime": 0,
					"date": "2023-07-08",
					"avgRunningTime": 0,
					"totalWorkTime": 0,
					"notWorkCars": 10000,
					"totalDrivingTime": 0,
					"avgWorkTime": 0,
					"totalRunningTime": 0,
					"workCars": 0,
					"avgDrivingTime": 0,
					"avgIdlingTime": 0
				}, {
					"totalIdlingTime": 0,
					"date": "2023-07-09",
					"avgRunningTime": 0,
					"totalWorkTime": 0,
					"notWorkCars": 10000,
					"totalDrivingTime": 0,
					"avgWorkTime": 0,
					"totalRunningTime": 0,
					"workCars": 0,
					"avgDrivingTime": 0,
					"avgIdlingTime": 0
				}]
			}
		},
		onLoad() {

		},
		methods: {
			goto(url) {
				uni.navigateTo({
					url: url
				})
			},


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