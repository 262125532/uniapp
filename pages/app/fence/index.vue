<template>
	<view class="content">
		<navBar :navBar="navBar" />

		<view class="list">
			<view class="box">
				<view class="uni-flex uni-row title">
					<view class="column name">围栏名称</view>
					<view class="column type">围栏形状</view>
					<view class="column condition" style="">触发报警条件</view>
					<view class="column num" style="width: 150rpx;">车辆数<text class="bit">(辆)</text></view>
				</view>

				<view class="uni-flex uni-row">
					<view class="column name ellipsis">超速报警超速报警超速报警超速报警</view>
					<view class="column type">圆形</view>
					<view class="column condition" style="">禁止超速</view>
					<view class="column num">999</view>
					<view class="column action" @click="toggleChange">
						<image :class="visible?'img img-up':'img'" src="../../../static/img/right.png" alt="">
					</view>
				</view>
				<view class="car-list" v-if="visible">
					<view class="uni-flex uni-row header">
						<view class="car-row ellipsis">车牌号</view>
						<view class="car-row">车辆类型</view>
					</view>
					<view class="uni-flex uni-row ">
						<view class="car-row">京ASANY1</view>
						<view class="car-row">搅拌车</view>
					</view>
				</view>
			</view>


		</view>

	</view>
</template>


<script>
	import http from '../../../common/request';
	import navBar from "../../../components/navBar";
	export default {
		data() {
			return {
				navBar: {
					bgcolor: '#F8F8F8', //导航背景颜色，不传默认#F8F8F8
					back: true, //回退箭头，不传默认true
					backcolor: '#333', //回退箭头颜色，不传默认#333
					previousText: '', //回退提示，不传默认直接回退
					title: "电子围栏", //本页标题，必传
					titlecolor: '#333', //本页标题颜色，不传默认#333
				},
				visible: false,

			}
		},
		components: {
			navBar
		},
		onLoad() {

		},
		methods: {
			toggleChange() {
				this.visible = !this.visible;

			}

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

		.box {
			border-bottom: 1px solid #E4E5E8;
		}

		.box:last-child {
			border: none;
		}

		.uni-row {
			height: 110rpx;
			line-height: 110rpx;
			font-size: 28rpx;
		}



		.title {
			font-size: 28rpx;
			font-weight: bold;
		}

		.column {
			padding-right: 10rpx;
		}

		.name {
			width: 160rpx;
		}

		.type {
			width: 130rpx;
		}

		.condition {
			-webkit-flex: 1;
			flex: 1;
		}

		.num {
			width: 100rpx;

		}

		.bit {
			font-size: 24rpx;
		}

		.action {
			width: 40rpx;

			.img {
				width: 32rpx;
				height: 32rpx;
				transform: rotate(90deg);
				transition: all .3s;
			}

			.img-up {
				transform: rotate(-90deg);
			}
		}

		.car-list {
			border-radius: 16rpx;
			background-color: #F8FAFC;

			.uni-row {
				height: 88rpx;
				line-height: 88rpx;
			}

			.header {
				background-color: #F0F2F5;
				border-radius: 16rpx 16rpx 0 0;
				border: none
			}

			.car-row {
				padding: 0 32rpx;
				-webkit-flex: 1;
				flex: 1;
			}
		}

	}
</style>