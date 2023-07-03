<template>
	<view class="content">
		<navBar :navBar="navBar" />
		<scroll-view class="list-box" scroll-y="true" refresher-enabled="true" :refresher-triggered="triggered"
			:refresher-threshold="100" refresher-background="lightgreen" @refresherpulling="onPulling"
			@refresherrefresh="onRefresh" @refresherrestore="onRestore" @refresherabort="onAbort">
			<view class="list">
				<view class="uni-flex uni-row title">
					<view class="column" style="width: 200rpx;">围栏名称</view>
					<view class="column" style="width: 150rpx;">围栏形状</view>
					<view class="column" style="-webkit-flex: 1;flex: 1;">触发报警条件</view>
				</view>
				<view class="uni-flex uni-row" v-for="fence in fenceList">
					<view class="column ellipsis" style="width: 200rpx;">{{fence.fenceName}}</view>
					<view class="column" style="width: 150rpx;">{{fenceType[fence.fenceType]}}</view>
					<view class="column" style="-webkit-flex: 1;flex: 1;">{{alarmCondition[fence.alarmCondition]}}
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
				loading: 'more',
				triggered: true,
				navBar: {
					bgcolor: '#F8F8F8', //导航背景颜色，不传默认#F8F8F8
					back: true, //回退箭头，不传默认true
					backcolor: '#333', //回退箭头颜色，不传默认#333
					previousText: '', //回退提示，不传默认直接回退
					title: "电子围栏", //本页标题，必传
					titlecolor: '#333', //本页标题颜色，不传默认#333
				},
				carInfo: {},
				pageNum: 1,
				fenceList: [],
				fenceType: ['路线', '圆形', '矩形', '多边形'],
				alarmCondition: ['路线偏移', '禁止驶入', '禁止驶出', '禁止超速'],
			}
		},
		components: {
			navBar
		},
		onLoad() {
			this.carInfo = uni.getStorageSync('carInfo');
			this.getFenceList()
		},
		methods: {
			getFenceList() {
				let that = this;
				let params = {
					vehicleName: that.carInfo.licPlateNum,
					pageSize: 20,
					pageNum: that.pageNum
				}
				http.post("fenceList", params).then(res => {
					if (res.code == 200) {
						let _list = that.fenceList.concat(res.data)
						that.$set(that, 'fenceList', _list)
						if (that.fenceList.length == res.totalCount) {
							this.loading = "noMore"
						}

						this.triggered = false;
						this._freshing = false;
					}
				})
			},
			onPulling(e) {
				console.log("onpulling", e);
			},
			onRefresh() {
				if (this._freshing) return;
				this._freshing = true;
				this.pageNum = 1;
				this.fenceList = [];
				this.getFenceList();
			},
			onRestore() {
				this.triggered = 'restore'; // 需要重置
				console.log("onRestore");
			},
			onAbort() {
				console.log("onAbort");
			}


		}
	}
</script>


<style scoped lang="scss">
	.content {
		background: #F0F2F5;
		min-height: calc(100vh - 0rpx);
		.list-box{
			min-height: calc(100vh - 100rpx);
		}

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

		.title {
			font-size: 28rpx;
			font-weight: bold;
		}

		.column {
			padding-right: 10rpx;
		}
	}
</style>