<template>
	<view class="content">
		<navBar :navBar="navBar" />
		<view class="tip">
			以下车辆还未激活，如已绑定终端，请等待终
		</view>

		<scroll-view scroll-y="true" class="list" :refresher-triggered="triggered" :refresher-enabled="true"
			:refresher-threshold="100" refresher-background="lightgreen" @scrolltolower="onPulling"
			@refresherrefresh="refresherrefresh" @refresherrestore="refresherrestore">
			<view class="item" v-for="item in list" @click="goto(item)">
				{{item.plateNo}}
				<view class="dot-box">
					<text class="dot">.</text>
				</view>
				{{item.deviceCode}}
				<view class="link">
					未激活
					<image class="icon" src="../../static/img/right.png" alt="">
				</view>
			</view>
		</scroll-view>

	</view>
</template>


<script>
	import http from '../../common/request';
	import navBar from "../../components/navBar";
	export default {
		data() {
			return {
				list: [],
				pageNum: 1,
				triggered: false,
				navBar: {
					bgcolor: '#FFFFFF', //导航背景颜色，不传默认#F8F8F8
					back: true, //回退箭头，不传默认true
					backcolor: '#333', //回退箭头颜色，不传默认#333
					previousText: '', //回退提示，不传默认直接回退
					title: "未激活车辆", //本页标题，必传
					titlecolor: '#333', //本页标题颜色，不传默认#333
				},
			}
		},
		components: {
			navBar
		},
		onLoad() {
			this.getCarList();
			this._freshing = false;
			setTimeout(() => {
				this.triggered = true;
			}, 1000)
		},
		methods: {
			goto(data) {
				uni.setStorageSync('carInfo', data)
				uni.navigateTo({
					url: '/pages/my/editCar'
				})
			},
			onPulling() {
				this.pageNum = this.pageNum + 1;
				this.getCarList()
			},
			getCarList() {
				let that = this;
				http.post("unActiveCarList", {
					onlineStatus: 2,
					deviceTypeName: "aiboxTerminal"
				}, `?pageNum=${that.pageNum}&pageSize=20`).then(res => {
					that._freshing = false;
					that.triggered = false;
					if (res.code == 200) {
						that.list.push(...res.data.content)
					}
				})
			},
			refresherrefresh() {
				console.log(111)
				let that = this;
				if (this._freshing) return;
				this._freshing = true;
				that.pageNum = 1
				that.list = [];
				that.getCarList();
			},
			refresherrestore() {
				this.triggered = 'restore'; // 需要重置
			},

		}
	}
</script>


<style scoped lang="scss">
	.content {
		background: #F0F2F5;
		// min-height: calc(100vh - 0rpx);
	}

	.tip {
		padding: 30rpx 24rpx;
		background-color: rgba(51, 112, 255, 0.16);
		color: #3370FF;
		font-size: 22rpx;
		margin-bottom: 24rpx;
	}

	.list {
		height: calc(100vh - 200rpx);
		padding: 0 24rpx 24rpx 24rpx;
		border-radius: 16rpx;
		overflow: hidden;
		box-sizing: border-box;

		.item {
			height: 112rpx;
			line-height: 112rpx;
			padding: 0 30rpx 0 24rpx;
			border-bottom: 1px solid #F0F2F5;
			background-color: #fff;

			.dot-box {
				display: inline-block;
				position: relative;
				padding: 0 20rpx;

				.dot {
					position: absolute;
					top: -86rpx;
					font-size: 48rpx;
				}
			}

			.link {
				float: right;
				color: rgba(0, 0, 0, 0.6);
				font-size: 28rpx;

				.icon {
					width: 24rpx;
					height: 24rpx;
					margin-left: 20rpx;
					vertical-align: -4rpx;
				}
			}
		}

		.item:first-child {
			border-top-left-radius: 16rpx;
			border-top-right-radius: 16rpx;
		}

		.item:last-child {
			border-bottom-right-radius: 16rpx;
			border-bottom-left-radius: 16rpx
		}
	}
</style>