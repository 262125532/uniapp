<template>
	<view class="content">
		<uni-nav-bar :fixed="true" shadow status-bar left-icon="left" left-text="" title="车辆报警" @clickLeft="back"
			rightText="筛选" @clickRight="showFilter" />
		<view class="uni-flex uni-row tab-box">
			<view class="flex1">
				<view :class="activeTab?'tab active':'tab'" @click="changeActive">
					实时报警
				</view>
			</view>
			<view class="flex1">
				<view :class="activeTab?'tab':'tab active'" @click="changeActive">
					历史报警
				</view>
			</view>
		</view>

		<scroll-view class="scroll-list" scroll-y="true" refresher-enabled="true" :refresher-triggered="triggered"
			:refresher-threshold="100" refresher-background="lightgreen" @refresherpulling="onPulling"
			@refresherrefresh="onRefresh" @refresherrestore="onRestore" @refresherabort="onAbort">
			<view class="item" v-for="(item, index) in list" :key="index">
				<view class="uni-flex uni-row car-info">
					<view class="img-box">
						<image class="img"
							src="https://ubsense-iot-1254375538.cos.ap-beijing.myqcloud.com/vehicleIcon/originalImage240x240/100003.png">
						</image>
					</view>
					<view class="info flex1">
						<view class="car-number">
							{{item.licPlateNum}}
							<text class="dot">.</text>
							{{item.selfNumber}}
						</view>
						<view class="type">
							{{item.carTypeDesc}}
						</view>
					</view>
				</view>
				<view class="uni-flex uni-row values">
					<view class="flex1 speed">
						<text class="t">报警时车速</text>
						<text class="val">{{item.mileage}}km/h</text>
					</view>
					<view class="flex1">
						<text class="t">报警类型</text>
						<text class="val">{{item.alarmType}}</text>
					</view>

				</view>

				<view class="alarm-content">
					{{item.alarmMessage}}
				</view>
				<view class="time">
					<image class="icon" src='../../static/img/复位时间.png'></image>
					报警时间：{{item.createAt}}
				</view>
				<view class="time" v-if="!activeTab">
					<image class="icon" src='../../static/img/复位时间.png'></image>
					复位时间：{{item.updateAt}}
				</view>
				<view class="uni-flex uni-row location ">
					<view class="">
						<image class="icon" src='../../static/img/定位.png'></image>
						地理位置：
					</view>
					<view class="flex1">
						{{item.location}}
					</view>
				</view>
			</view>
			<uni-load-more :status="status"></uni-load-more>
		</scroll-view>
		

		<uni-drawer ref="showRight" mode="right" :width="320" :mask-click="false">
			<view class="close-box">
				<uni-icons class="btn" type="clear" size="20" @click="closeDrawer"></uni-icons>
			</view>
			<scroll-view style="height: calc(100% - 96rpx);position: relative;" scroll-y="true" class="filter">
				<view class="uni-flex uni-row title" @click="goto('/pages/my/carType')">
					<view class="left">
						车辆类型
					</view>
					<view class=" flex1 right">
						<text>{{search.name}}</text>
						<uni-icons class="icon" type="forward"></uni-icons>
					</view>
				</view>
				<view class="title">
					应用报警
				</view>
				<view class="list-box">
					<view :class="it.active?'item active':'item'" v-for="(it, index) in appAlarms" :key="index" @click="handleClick(index)">
						{{it.name}}
					</view>
					<div class="clear"></div>
				</view>
				<view class="title">
					终端报警
				</view>
				<view class="terminal-alarm">
					<view :class="it.active?'item active':'item'" v-for="(it, index) in terminalAlarm" :key="index" @click="handleClick1(index)">
						{{it.name}}
					</view>
					<div class="clear"></div>
				</view>
				<view class="title">
					报警时间
				</view>
				<uni-datetime-picker class="picker" v-model="range" type="daterange" @maskClick="maskClick" />
				
				<view class="uni-flex uni-row footer">
					<view class="flex1 reset">
						重置
					</view>
					<view class="flex1 ok">
						确定
					</view>
					
				</view>



			</scroll-view>
		</uni-drawer>

	</view>
</template>


<script>
	import http from '../../common/request';
	import navBar from "../../components/navBar";
	export default {
		data() {

			return {
				triggered: true,
				status: "loading",
				navBar: {
					bgcolor: '#F8F8F8', //导航背景颜色，不传默认#F8F8F8
					back: true, //回退箭头，不传默认true
					backcolor: '#333', //回退箭头颜色，不传默认#333
					previousText: '', //回退提示，不传默认直接回退
					title: "车辆报警", //本页标题，必传
					titlecolor: '#333', //本页标题颜色，不传默认#333
				},
				carInfo: {},
				activeTab: true,
				list: [],
				range: [],
				search: {
					name: '全部',
					carType: '',
					timeRange: ''
				},
				appAlarms: [{
						name: '驶出电子围栏',
						key: 1,
						active: true
					},
					{
						name: '驶入电子围栏',
						key: 2
					},
					{
						name: '超速报警',
						key: 3
					},
					{
						name: '路线偏移',
						key: 4
					},
				],
				terminalAlarm: [{
						name: '终端离线',
						key: 1,
						active: true
					},
					{
						name: '拆除报警',
						key: 2
					},
					{
						name: '拆壳报警',
						key: 3
					},
					{
						name: '温度过高',
						key: 4
					},
					{
						name: '湿度过高',
						key: 5
					},

				]
			}
		},
		components: {
			navBar
		},
		onLoad() {
			this.carInfo = uni.getStorageSync('carInfo');
			this.getData()


		},
		mounted() {
			// this.$refs.showRight.open();
		},
		watch: {
			activeTab() {
				this.getData()
			}
		},
		onShow() {
			let that = this;
			uni.$on('updateCarType', function(data) {
				that.search.name = data.name;
				that.search.carType = data.code;
			})
		},
		methods: {
			handleClick(index) {
				this.$set(this.appAlarms[index], 'active', !this.appAlarms[index].active)
			},
			handleClick1(index) {
				this.$set(this.terminalAlarm[index], 'active', !this.terminalAlarm[index].active)
			},
			goto(url) {
				uni.navigateTo({
					url: url
				})
			},
			showFilter() {
				this.$refs.showRight.open();
			},
			closeDrawer() {
				this.$refs.showRight.close();
			},
			changeActive() {
				this.list = []
				this.activeTab = !this.activeTab;
			},
			getData() {
				let params = {
					licPlateNum: this.carInfo.licPlateNum,
					// alarmKind: 1
				}
				this.status = 'loading';
				this.activeTab && http.post('realTimeAlarmList', params).then(res => {
					this.list = res.data.list;
					this.status = 'noMore';
				});

				!this.activeTab && http.post('historyAlarmList', params).then(res => {
					this.list = res.data.list;
					this.status = 'noMore';

				});

			},
			onPulling(e) {
				console.log("onpulling", e);
			},
			onRefresh() {
				if (this._freshing) return;
				this._freshing = true;
				setTimeout(() => {
					this.triggered = false;
					this._freshing = false;
				}, 3000)
			},
			onRestore() {
				this.triggered = 'restore'; // 需要重置
				console.log("onRestore");
			},
			onAbort() {
				console.log("onAbort");
			},
			maskClick(e) {
				console.log('----maskClick事件:', e);
			}


		}
	}
</script>


<style scoped lang="scss">
	.content {
		background: #F0F2F5;
		min-height: calc(100vh - 0rpx);

		.flex1 {

			-webkit-flex: 1;
			flex: 1;
		}

		.tab-box {
			background-color: #fff;
			padding: 24rpx 12rpx;


			.tab {
				height: 72rpx;
				line-height: 72rpx;
				margin: 0 12rpx;
				text-align: center;
				border-radius: 16rpx;
				background-color: #F4F7FA;
			}

			.active {
				background-color: #3370FF;
				color: #fff;
			}

		}

		.scroll-list {
			height: calc(100vh - 120rpx);

			.item {
				margin: 24rpx 24rpx;
				background-color: #fff;
				border-radius: 16rpx;
				padding: 24rpx;

				.car-info {
					.img-box {
						margin-right: 24rpx;

						.img {
							width: 120rpx;
							height: 120rpx;
						}
					}

					.car-number {
						font-size: 32rpx;

						.dot {
							height: 36rpx;
							line-height: 36rpx;
							font-size: 40rpx;
							display: inline-block;
							vertical-align: 8rpx;
							padding: 0 10rpx
						}
					}

					.type {
						height: 40rpx;
						line-height: 40rpx;
						display: inline-block;
						font-size: 24rpx;
						padding: 0 24rpx;
						background-color: #F0F2F5;
						border-radius: 8rpx;
						color: #666;
						margin-top: 20rpx;
					}
				}

				.values {
					font-size: 28rpx;
					margin-top: 10rpx;

					.speed {
						border-right: 1px solid #E4E5E8;
						margin-right: 24rpx;
					}

					.t {
						margin-right: 16rpx;
					}

					.val {
						color: #F03030
					}
				}

				.alarm-content {
					height: 80rpx;
					line-height: 80rpx;
					background: rgba(255, 0, 0, 0.08);
					border-radius: 8rpx;
					color: #F03030;
					font-size: 24rpx;
					padding: 0 24rpx;
					margin: 16rpx 0 24rpx 0;
				}

				.time {
					font-size: 24rpx;
					margin-bottom: 16rpx;

					.icon {
						width: 24rpx;
						height: 24rpx;
						margin-right: 16rpx;
					}
				}

				.location {
					font-size: 24rpx;

					.icon {
						width: 24rpx;
						height: 24rpx;
						margin-right: 16rpx;
					}

				}
			}
		}

		.close-box {
			height: 96rpx;
			text-align: right;
			padding: 32rpx;
			box-sizing: border-box;
			border-bottom: 1px solid #E4E5E8;

			.btn {
				color: #999 !important;
			}
		}

		.filter {
			

			.title {
				height: 96rpx;
				line-height: 96rpx;
				font-size: 32rpx;
				margin-left: 32rpx;

				.right {
					text-align: right;
					padding-right: 40rpx;
					font-size: 28rpx;
					color: #999;
					line-height: 96rpx;

					.icon {
						margin-left: 10rpx;
					}
				}
			}

			.title:first-child {
				border-bottom: 1px solid #E4E5E8;
			}
			
			.picker{
				margin: 0 32rpx;
				width: calc(100% - 64rpx);
			}

			.list-box {
				margin-left: 32rpx;
				.item {
					width: 272rpx;
					height: 72rpx;
					line-height: 72rpx;
					background: #F4F7FA;
					border-radius: 8rpx;
					float: left;
					margin-right: 16rpx;
					margin-bottom: 16rpx;
					text-align: center;
					font-size: 28rpx;
				}

				.active {
					color: #3370FF;
					background-color: rgba(51, 112, 255, 0.16);
				}
			}
			.terminal-alarm{
				margin-left: 32rpx;
				.item {
					width: 176rpx;
					height: 72rpx;
					line-height: 72rpx;
					background: #F4F7FA;
					border-radius: 8rpx;
					float: left;
					margin-right: 16rpx;
					margin-bottom: 16rpx;
					text-align: center;
					font-size: 28rpx;
				}
				
				.active {
					color: #3370FF;
					background-color: rgba(51, 112, 255, 0.16);
				}
				
			}
			
			.footer{
				width: 100%;
				border-top: 1px solid #E4E5E8;
				padding: 24rpx 20rpx 24rpx 8rpx;
				box-sizing: border-box;
				position: absolute;
				bottom: 0;
				.reset{
					height: 88rpx;
					line-height: 88rpx;
					background-color: #F4F7FA;
					text-align: center;
					font-size: 36rpx;
					margin: 0 24rpx;
					border-radius: 16rpx;
				}
				.ok{
					height: 88rpx;
					line-height: 88rpx;
					background-color: #3370FF;
					text-align: center;
					font-size: 36rpx;
					margin: 0 24rpx;
					color: #fff;
					border-radius: 16rpx;
				}
			}
		}
	}
</style>