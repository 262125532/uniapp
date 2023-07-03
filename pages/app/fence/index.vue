<template>
	<view class="content">
		<navBar :navBar="navBar" />
		<scroll-view class="list" scroll-y="true" refresher-enabled="true" :refresher-triggered="triggered"
			:refresher-threshold="100" refresher-background="lightgreen" @refresherpulling="onPulling"
			@refresherrefresh="onRefresh" @refresherrestore="onRestore" @refresherabort="onAbort">
			<view class="box" v-for="(fence, index) in fenceList" :key="index">
				<view class="uni-flex uni-row title">
					<view class="column name">围栏名称</view>
					<view class="column type">围栏形状</view>
					<view class="column condition" style="">触发报警条件</view>
					<view class="column num" style="width: 150rpx;">车辆数<text class="bit">(辆)</text></view>
				</view>

				<view class="uni-flex uni-row">
					<view class="column name ellipsis">{{fence.fenceName}}</view>
					<view class="column type">{{fenceType[fence.fenceType]}}</view>
					<view class="column condition" style="">{{alarmCondition[fence.alarmCondition]}}</view>
					<view class="column num car-num">{{fence.vehicleNum}}</view>
					<view class="column action" @click="toggleChange(fence.id,index)">
						<image :class="fence.visible?'img img-up':'img'" src="../../../static/img/right.png" alt="">
					</view>
				</view>
				<view class="car-list" v-if="fence.visible">
					<view class="uni-flex uni-row header">
						<view class="car-row">车牌号</view>
						<view class="car-row">车辆类型</view>
					</view>
					<view class="uni-flex uni-row " v-for="car in fence.carList">
						<view class="car-row ellipsis">{{car.plateNo}}</view>
						<view class="car-row">{{car.vehicleType}}</view>
					</view>
				</view>
			</view>
			<uni-load-more :status="loading"></uni-load-more>

		</scroll-view>



	</view>
</template>


<script>
	import http from '../../../common/request';
	import navBar from "../../../components/navBar";
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
				fenceList: [],
				fenceType: ['路线', '圆形', '矩形', '多边形'],
				alarmCondition: ['路线偏移', '禁止驶入', '禁止驶出', '禁止超速'],
				pageNum: 1

			}
		},
		components: {
			navBar
		},
		onLoad() {

			this.getData()
		},
		methods: {
			getData() {
				let that = this;
				let params = {
					pageNum: that.pageNum,
					pageSize: 20
				}
				http.post("fenceList", params).then(res => {
					let _list = that.fenceList.concat(res.data)
					that.$set(that, 'fenceList', _list)
					if(that.fenceList.length == res.totalCount) {
						this.loading = "noMore"
					}
					
					this.triggered = false;
					this._freshing = false;

				})

			},
			getCarList(id, index) {
				let params = {
					fenceId: id,
					type: 0 //写死0,表示关联的
				}
				http.post("carListInFence", params).then(res => {
					if (res.code == 200) {
						this.$set(this.fenceList[index], 'carList', res.data);
					}

				})
			},
			toggleChange(id, index) {
				if (!this.fenceList[index].visible && !this.fenceList[index].carList) {
					this.getCarList(id, index)
				}
				this.$set(this.fenceList[index], 'visible', !this.fenceList[index].visible);

			},
			onPulling(e) {
				if(this.loading == 'more') {
					this.pageNum = this.pageNum + 1;
					this.getData();
				}
			},
			onRefresh() {
				if (this._freshing) return;
				this._freshing = true;
				this.pageNum = 1;
				this.fenceList = [];
				this.getData();
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

		.list {
			height: calc(100vh - 100rpx);
		}

		.box {
			border-bottom: 1px solid #E4E5E8;
			margin: 24rpx;
			border-radius: 16rpx;
			background-color: #fff;
			padding:04rpx 24rpx 0 24rpx;
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

		.car-num {
			color: #3370FF;
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