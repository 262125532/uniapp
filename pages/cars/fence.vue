<template>
	<view class="content">
		<navBar :navBar="navBar" />

		<view class="list">
			<view class="uni-flex uni-row title">
				<view class="column" style="width: 150rpx;">围栏名称</view>
				<view class="column" style="width: 150rpx;">围栏形状</view>
				<view class="column" style="-webkit-flex: 1;flex: 1;">触发报警条件</view>
			</view>

			<view class="uni-flex uni-row">
				<view class="column ellipsis" style="width: 150rpx;">超速报警超速报警超速报警超速报警</view>
				<view class="column" style="width: 150rpx;">圆形</view>
				<view class="column" style="-webkit-flex: 1;flex: 1;">禁止超速</view>
			</view>

		</view>

	</view>
</template>


<script>
	import http from '../../common/request';
	import navBar from "../../components/navBar";
	export default {
		data() {
			return {
				triggered: true,
				navBar: {
					bgcolor: '#F8F8F8', //导航背景颜色，不传默认#F8F8F8
					back: true, //回退箭头，不传默认true
					backcolor: '#333', //回退箭头颜色，不传默认#333
					previousText: '', //回退提示，不传默认直接回退
					title: "电子围栏", //本页标题，必传
					titlecolor: '#333', //本页标题颜色，不传默认#333
				},
			}
		},
		components: {
			navBar
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>


<style scoped lang="scss">
	.content {
		background: #F0F2F5;
		min-height: calc(100vh - 0rpx);

		.list {
			padding: 24rpx 24rpx 0 24rpx;
			background-color: #fff;
			border-radius: 16rpx;
			margin: 24rpx;
		}

		.uni-row {
			height: 110rpx;
			line-height: 110rpx;
			border-bottom: 1px solid #E4E5E8;
			font-size: 28rpx;
		}

		.uni-row:last-child {
			border: none;
		}
		
		.title{
			font-size: 28rpx;
			font-weight: bold;
		}

		.column {
			padding-right: 10rpx;
		}
	}
</style>