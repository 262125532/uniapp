<template>
	<view class="gunter-component">
		<view class="uni-flex uni-row time">
			<view class="flex1 section">
				<text class="text first">00:00</text>
			</view>
			<view class="flex1 section">
				<text class="text">4:00</text>
			</view>
			<view class="flex1 section">
				<text class="text">8:00</text>
			</view>
			<view class="flex1 section">
				<text class="text">12:00</text>
			</view>
			<view class="flex1 section">
				<text class="text">16:00</text>
			</view>
			<view class="flex1 section">
				<text class="text">20:00</text>
				<text class="text last">24:00</text>
			</view>
		</view>

		<view class="fill-box">
			<view v-for="(item, index) in data" :key="index" class="duration"
				:style="'width: '+item.width+';background-color: ' +item.color + ';left: ' + item.left"></view>
			<!-- <view class="duration" style="width: 50rpx;background-color: rgba(255, 96, 0, 0.69);left: 30%"></view> -->
		</view>

	</view>
</template>


<script>
	export default {
		props: ['data'],
		data() {
			return {

			}
		},
		onLoad() {

		},
		computed: {
			// list() {
			// 	return this.data.map(val => {
			// 		const day = 24 * 60 * 60 ;
			// 		let dayStart = new Date(new Date(this.date).toLocaleDateString()).getTime();
			// 		let itemStart = new Date(val.startTime).getTime();
			// 		let left = ((itemStart - dayStart) / day / 10).toFixed(2) + '%';
			// 		let width = (val.duration / day * 100).toFixed(2) + '%';
			// 		console.log(222, left)
			// 		console.log(333, width)
			// 		return {
			// 			width: width,
			// 			left: left,
			// 			color: val.status == 1 ? '#52C41A' : 'rgba(255, 96, 0, 0.69)'
			// 		}
			// 	})
			// }
		},
		methods: {

		}
	}
</script>


<style scoped lang="scss">
	.gunter-component {
		height: 80rpx;
		padding: 36rpx 0rpx 0 0;
		position: relative;
		box-sizing: border-box;

		.time {
			color: #999;
			font-size: 20rpx;
			position: absolute;
			width: 100%;
			z-index: 10;
		}

		.flex1 {
			-webkit-flex: 1;
			flex: 1;
		}

		.section {
			height: 36rpx;
			position: relative;
			border-left: 1px dashed #999;

			.text {
				position: absolute;
				top: -26rpx;
				left: -30rpx;
				display: inline-block;
				width: 60rpx;
				text-align: center;

			}

			.first {
				left: -6rpx;
			}

			.last {
				left: auto;
				right: -6rpx
			}
		}

		.section:last-child {
			border-right: 1px dashed #999;
		}

		.fill-box {
			height: 24rpx;
			width: 100%;
			position: absolute;
			top: 42rpx;
			// background-color: #ccc;

			.duration {
				position: absolute;
				height: 100%;
			}
		}
	}
</style>