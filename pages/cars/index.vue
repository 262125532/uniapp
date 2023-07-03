<template>
	<view class="content">
		<navBar :navBar="navBar" />

		<view class="tab">
			<!-- 1运行 、2怠速、3静止、4行驶 、6离线） -->
			<view :class="activeTab ==1? 'item active':'item'" @click="changeTab(1)">
				全部
				<view class="border"></view>
			</view>
			<view :class="activeTab ==2? 'item active':'item'" @click="changeTab(2)">
				运行
				<view class="border"></view>
			</view>
			<view :class="activeTab ==3? 'item active':'item'" @click="changeTab(3)">
				怠速
				<view class="border"></view>
			</view>
			<view :class="activeTab ==4? 'item active':'item'" @click="changeTab(4)">
				静止
				<view class="border"></view>
			</view>
			<view :class="activeTab ==5? 'item active':'item'" @click="changeTab(5)">
				离线
				<view class="border"></view>
			</view>
		</view>

		<view class="total">
			全部状态（{{allNumber}}辆）
		</view>

		<scroll-view scroll-y="true" class="list" :refresher-triggered="triggered" :refresher-enabled="true"
			:refresher-threshold="100" refresher-background="lightgreen" @scrolltolower="onPulling"
			@refresherrefresh="refresherrefresh" @refresherrestore="refresherrestore">

			<view class="item" v-for="(car, index) in carList" :key="index" @click="handleClick(car)">
				<view class="status-box">
					<view class="car-status">
						状态：
						<view :class="`status status${car.status}`">
							{{status[car.status]}}
						</view>
					</view>
					<view class="icons">
						<image class="end" src="../../static/img/终端.png" alt="" v-if="car.alarm">
							<image class="fence" src="../../static/img/围栏.png" alt="" v-if="car.fenceAlarm">
								<view class="electric" v-if="car.hasPower">
									<view class="progress"
										:style="`width: ${car.power}%;background-color: ${car.power<20?'#E50012':'#52C41A'}`">
									</view>
									<image class="img" src="../../static/img/电池.png" alt="">
								</view>
								<text v-if="car.hasPower" style="margin-left: 10rpx;">{{car.power}}%</text>

					</view>
				</view>

				<view class="uni-flex uni-row car-info">
					<view class="text" style="width: 170rpx;">
						<view class="img-box">
							<image :src="car.picUrl" class="img"></image>
							<!-- <image class="img" src="https://ubsense-iot-1254375538.cos.ap-beijing.myqcloud.com/vehicleIcon/originalImage240x240/100003.png"></image> -->
						</view>
					</view>
					<view class="text" style="-webkit-flex: 1;flex: 1;">
						<view class="infos">
							<view class="no">
								{{car.licPlateNum}} · {{car.selfNumber}}
							</view>
							<view class="type">
								{{car.carTypeDesc}}
							</view>
							<view class="company">
								{{car.customerName}}
							</view>
							<view class="gps">
								GPS上报时间：{{car.reportTime}}
							</view>
						</view>
					</view>
				</view>

				<view class="datas ellipsis">
					<image class="img" src="../../static/img/今日里程.png" alt="">
						<text class="title">今日里程</text>
						<text style="color: #52C41A;">{{car.mileage}}公里</text>
						<view class="line"></view>
				</view>
				<view class="datas ellipsis" style="padding-left: 10rpx;">
					<image class="img" src="../../static/img/当前车速.png" alt="">
						<text class="title">当前车速</text>
						<text style="color: #3370FF;" >{{car.speed}}公里/时</text>
				</view>
				<view class="datas ellipsis">
					<image class="img" src="../../static/img/今日工时.png" alt="">
						<text class="title">今日工时</text>
						<text style="color: #52C41A;">{{car.taskTime}}</text>
						<view class="line"></view>
				</view>
				<view class="datas ellipsis" style="padding-left: 10rpx;">
					<image class="img" src="../../static/img/持续运行.png" alt="">
						<text class="title">持续运行</text>
						<text style="color: #3370FF;">{{car.statusDesc}}</text>
				</view>
				<view class="uni-flex uni-row location">
					<view class="text" style="width: 170rpx;">
						<image class="img" src="../../static/img/地理位置.png" alt="">
							<text class="title">地理位置</text>
					</view>
					<view class="text" style="-webkit-flex: 1;flex: 1;">
						<text>{{car.location}}</text>
					</view>
				</view>
			</view>

			<uni-load-more :status="loading"></uni-load-more>

		</scroll-view>


	</view>
</template>


<script>
	import http from '../../common/request';
	import navBar from "../../components/navBar";

	export default {
		data() {
			return {
				triggered: false,
				activeTab: 1,
				allNumber: 0,
				percent: 100,
				navBar: {
					bgcolor: '#F8F8F8', //导航背景颜色，不传默认#F8F8F8
					back: false, //回退箭头，不传默认true
					backcolor: '#FFF', //回退箭头颜色，不传默认#333
					previousText: '', //回退提示，不传默认直接回退
					title: "车辆", //本页标题，必传
					titlecolor: '#333', //本页标题颜色，不传默认#333
				},
				status: ["", "运行", "怠速", "静止", "形式", "", "离线"],
				allList: [],
				carList: [],
				pageNum: 1,
				loading: "more"

			}
		},
		components: {
			navBar
		},
		onLoad() {
			this.getData()
		},
		methods: {
			handleClick(car) {
				uni.setStorageSync('carInfo', car);
				uni.navigateTo({
					url: "/pages/cars/detail"
				})
			},
			getData() {
				let that = this;
				http.post("getCarList", "", `?pageNum=${that.pageNum}&pageSize=20`).then(res => {
					if (res.code == 200) {
						that._freshing = false;
						that.triggered = false;
						that.allNumber = res.data.allNumber;
						that.allList = res.data.children;
						let _list = that.carList.concat(that.formatterDate(res.data.children))
						that.$set(that, "carList", _list)
					}

				})
			},
			formatterDate(list) {
				return list.map(val => {
					let power = 0;
					let hasPower = false
					val.terminalList && val.terminalList.forEach(v => {
						if (v.type == 2) {
							hasPower = true;
							power = v.power;
						}
					})
					return {
						...val,
						hasPower,
						power,

					}
				})

			},
			changeTab(cur) {
				console.log(222, cur)
				this.activeTab = cur;
			},
			onPulling() { //加载下一页
				if (this.pageNum * 20 < tihs.allNumber) {
					this.pageNum = this.pageNum + 1;
					this.getData()
				} else {
					this.loading = "noMore"
				}
			},
			refresherrefresh() {
				let that = this;
				if (this._freshing) return;
				this._freshing = true;
				that.pageNum = 1
				that.list = [];
				that.init();
			},
			refresherrestore() {
				this.triggered = 'restore'; // 需要重置
			},


		}
	}
</script>

<style scoped lang="scss">
	.content {
		background-color: #F4F7FA;

		.tab {
			height: 88rpx;
			line-height: 88rpx;
			background-color: #fff;

			.item {
				float: left;
				display: inline-block;
				margin: 0 20rpx;
				position: relative;

				.border {
					background-color: #fff;
				}
			}

			.active {
				.border {
					width: 32rpx;
					height: 6rpx;
					background-color: #3370FF;
					position: absolute;
					bottom: 12rpx;
					left: 50%;
					margin-left: -16rpx;
				}

			}
		}

		.total {
			margin: 24rpx;
			font-size: 28rpx;
			color: #666;
		}

		.list {
			height: calc(100vh - 370rpx);

			.item {
				margin: 24rpx;
				background-color: #fff;
				border-radius: 16rpx;
				padding: 32rpx 24rpx;
				position: relative;



				.car-status {
					.status {
						height: 40rpx;
						line-height: 40rpx;
						display: inline-block;
						background-color: rgba(82, 196, 26, 0.08);
						color: #52C41A;
						padding: 0 12rpx;
						font-size: 24rpx;

						border-radius: 8rpx;

					}

					// （1运行 、2怠速、3静止、4行驶 、6离线）
					.status1 {
						background-color: rgba(82, 196, 26, 0.08);
						color: #52C41A;

					}

					.status2 {
						background-color: rgba(255, 96, 0, 0.16);
						color: #FF6000;

					}

					.status3 {
						background-color: rgba(51, 112, 255, 0.16);
						color: #3370FF;

					}

					.status4 {
						background-color: rgba(82, 196, 26, 0.08);
						color: #52C41A;

					}

					.status5 {
						background-color: rgba(82, 196, 26, 0.08);
						color: #52C41A;

					}

					.status6 {
						background-color: rgba(0, 0, 0, 0.16);
						color: #666;

					}

				}

				.icons {
					position: absolute;
					right: 32rpx;
					top: 34rpx;
					font-size: 24rpx;

					.end {
						width: 32rpx;
						height: 32rpx;
						vertical-align: sub;
						margin-right: 10rpx;
					}

					.fence {
						width: 32rpx;
						height: 32rpx;
						vertical-align: sub;
						margin-right: 10rpx;
					}

					.electric {
						width: 40rpx;
						height: 20rpx;
						display: inline-block;
						margin-right: 4rpx;
						position: relative;

						.img {
							width: 40rpx;
							height: 20rpx;
							position: absolute;
							top: 0rpx;
							left: 0rpx;
							margin-right: 10rpx;
						}

						.progress {
							position: absolute;
							background: #52C41A;
							max-width: 80%;
							height: 16rpx;
							top: 1rpx;
							left: 2rpx;
						}
					}
				}

				.car-info {
					height: 200rpx;
					margin-top: 32rpx;
					margin-bottom: 40rpx;

					.img-box {
						width: 160rpx;
						height: 160rpx;
						float: left;
						// background-color: #666;
						border-radius: 16rpx;

						.img {
							width: 100%;
							height: 100%;
							border-radius: 16rpx;
						}
					}

					.infos {
						float: left;
						font-size: 28rpx;
						margin-left: 24rpx;
						color: #999;

						.no {
							font-size: 32rpx;
							color: #000;
						}

						.type {
							height: 36rpx;
							line-height: 36rpx;
							background-color: #F0F2F5;
							padding: 0 12rpx;
							margin: 10rpx 0;
							display: inline-block;

						}

						.company {}

						.gps {}
					}


				}

				.datas {
					width: 50%;
					font-size: 28rpx;
					float: left;
					box-sizing: border-box;
					margin-bottom: 16rpx;
					position: relative;

					.title {
						margin-right: 18rpx;
					}

					.img {
						width: 24rpx;
						height: 24rpx;
						vertical-align: middle;
						margin-right: 16rpx;
					}

					.line {
						position: absolute;
						width: 2rpx;
						height: 28rpx;
						top: 10rpx;
						right: 10rpx;
						background-color: #ccc;
					}

				}

				.location {
					font-size: 28rpx;
					margin-top: 154rpx;

					.title {
						// margin-right: 24rpx;
					}

					.img {
						width: 24rpx;
						height: 24rpx;
						vertical-align: middle;
						margin-right: 16rpx;
					}
				}

			}
		}


	}
</style>