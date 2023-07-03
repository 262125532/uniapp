<template>
	<view class="content">
		<navBar :navBar="navBar" />

		<view class="box">
			<view class="uni-flex uni-row item car-img">
				<view class="text" style="width: 200rpx;">车辆图片</view>
				<view class="text value" style="-webkit-flex: 1;flex: 1;">
					<image class="img" :src="carInfo.picUrl">
					</image>
					<!-- <image class="img"
						src="https://ubsense-iot-1254375538.cos.ap-beijing.myqcloud.com/vehicleIcon/originalImage240x240/100003.png">
					</image> -->
				</view>
			</view>
			<view class="uni-flex uni-row item">
				<view class="text" style="width: 200rpx;">车辆类型</view>
				<view class="text value" style="-webkit-flex: 1;flex: 1;">
					{{carInfo.carTypeDesc}}
				</view>
			</view>
			<view class="uni-flex uni-row item">
				<view class="text" style="width: 200rpx;">车牌号</view>
				<view class="text value " style="-webkit-flex: 1;flex: 1;">
					{{carInfo.licPlateNum}}
				</view>
			</view>
			<view class="uni-flex uni-row item">
				<view class="text" style="width: 200rpx;">品牌型号</view>
				<view class="text value" style="-webkit-flex: 1;flex: 1;">
					{{carInfo.brandTypeDesc}}
				</view>
			</view>
			<view class="uni-flex uni-row item">
				<view class="text" style="width: 200rpx;">自编号</view>
				<view class="text value" style="-webkit-flex: 1;flex: 1;">
					{{carInfo.selfNumber}}
				</view>
			</view>
			<view class="uni-flex uni-row item">
				<view class="text" style="width: 200rpx;">所属企业</view>
				<view class="text value" style="-webkit-flex: 1;flex: 1;">
					{{carInfo.customerName}}
				</view>
			</view>

		</view>

		<view class="box">
			<view class="uni-flex uni-row item" v-for="terminal in carInfo.terminalList">
				<view class="text" style="width: 200rpx;">终端编号</view>
				<view class="text value" style="-webkit-flex: 1;flex: 1;">
					{{terminal.number}}
				</view>
			</view>
		</view>

		<view class="box">
			<view class="uni-flex uni-row detail">
				<view class="text" style="width: 200rpx;">详情分析</view>
				<view class="text value" style="-webkit-flex: 1;flex: 1;">
				</view>
			</view>
			<view class="uni-flex uni-row detail-list">
				<view class="kind" style="-webkit-flex: 1;flex: 1;" @click="goto('/pages/cars/workingHour')">
					<image class="icon" src='../../static/img/工时管理-icon.png'></image>
					<view>工时详情</view>
				</view>
				<view class="kind" style="-webkit-flex: 1;flex: 1;">
					<image class="icon" src='../../static/img/轨迹回放-icon.png'></image>
					<view>轨迹回放</view>
				</view>
				<view class="kind" style="-webkit-flex: 1;flex: 1;" @click="goto('/pages/cars/fence')">
					<image class="icon" src='../../static/img/电子围栏-icon.png'></image>
					<view>电子围栏</view>
				</view>
				<view class="kind" style="-webkit-flex: 1;flex: 1;">
					<image class="icon" src='../../static/img/报警推送管理-icon.png'></image>
					<view>车辆报警</view>
				</view>
				<view class="kind" style="-webkit-flex: 1;flex: 1;">
					<image class="icon" src='../../static/img/车辆画像-icon.png'></image>
					<view>车辆画像</view>
				</view>
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
				navBar: {
					bgcolor: '#F8F8F8', //导航背景颜色，不传默认#F8F8F8
					back: true, //回退箭头，不传默认true
					backcolor: '#333', //回退箭头颜色，不传默认#333
					previousText: '', //回退提示，不传默认直接回退
					title: "车辆详情", //本页标题，必传
					titlecolor: '#333', //本页标题颜色，不传默认#333
				},
				carInfo: {},
				fenceList: []
			}
		},
		components: {
			navBar
		},
		onLoad() {
			this.carInfo = uni.getStorageSync('carInfo');
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

		.box {
			margin: 24rpx 24rpx;
			padding-left: 24rpx;
			background-color: #fff;
			border-radius: 16rpx;

			.item {
				height: 110rpx;
				line-height: 110rpx;
				border-bottom: 1px solid #E4E5E8;
				padding-right: 24rpx;

				.value {
					color: #666;
					text-align: right;


				}
			}

			.car-img {
				height: 160rpx;
				line-height: 160rpx;

				.img {
					width: 120rpx;
					height: 120rpx;
					margin-top: 20rpx;

				}

			}

			.item:last-child {
				border: none;

			}

			.detail {
				height: 110rpx;
				line-height: 110rpx;
				padding-right: 24rpx;

			}

			.detail-list {
				font-size: 24rpx;

				.kind {
					padding: 20rpx 0 40rpx 0;
					text-align: center;

					.icon {
						width: 48rpx;
						height: 48rpx;
					}
				}
			}
		}
	}
</style>