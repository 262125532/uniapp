<template>
	<view class="content">
		<navBar :navBar="navBar" />
		<view class="item">
			车辆照片
			<image :src="image" class="img"></image>
		</view>
		<view class="item">
			车辆型号
			<view class="value" @click="goto('/pages/my/carType?code=' + carInfo.var1)">
				{{carInfo.vehicleType}}
				<image class="icon" src="../../static/img/right.png" alt="">
			</view>
		</view>
		<view class="item" @click="goto(`/pages/my/carBrand?var1=${carInfo.var1}&bandType=${carInfo
		.bandType}`)">
			品牌型号
			<view class="value">
				{{carInfo.bandType}}
				<image class="icon" src="../../static/img/right.png" alt="">
			</view>
		</view>
		<view class="item">
			车牌号
			<view class="value">
				<input :class="focus1?'uni-input uni-input-focus':'uni-input'" name="plateNo" @focus="toggleFocus1"
					@blur="toggleFocus1" v-model="carInfo.plateNo" placeholder="请输入品牌型号" />
			</view>
		</view>
		<view class="item" @click="showTree">
			所属企业
			<view class="value">
				{{carInfo.areaName}}
				<image class="icon" src="../../static/img/right.png" alt="">
			</view>
		</view>
		<view class="item">
			终端编号
			<view class="value">
				<image class="scan-icon" src="../../static/img/scan.png" alt="" @click="handleScanCode">
					<input :class="focus2?'uni-input uni-input-focus':'uni-input'" @focus="toggleFocus2"
						@blur="toggleFocus2" name="plateNo" placeholder="请输入终端编号" />

			</view>
		</view>

		<view class="submit-btn" @click="handleSave">
			确定
		</view>
		<tki-tree ref="tkitree" :selectParent="selectParent" :multiple="multiple" :range="orgTree" :foldAll="flod"
			rangeKey="name" @confirm="treeConfirm" @cancel="treeCancel"></tki-tree>

	</view>
</template>


<script>
	import http from '../../common/request';
	import navBar from "../../components/navBar";
	import tkiTree from '@/components/tki-tree/tki-tree.vue';
	export default {
		data() {
			return {
				carInfo: {},
				image: "",
				navBar: {
					bgcolor: '#FFFFFF', //导航背景颜色，不传默认#F8F8F8
					back: true, //回退箭头，不传默认true
					backcolor: '#333', //回退箭头颜色，不传默认#333
					previousText: '', //回退提示，不传默认直接回退
					title: "编辑车辆", //本页标题，必传
					titlecolor: '#333', //本页标题颜色，不传默认#333
				},
				carTypeList: [],
				focus1: false,
				focus2: false,
				orgTree: [],
				multiple: false,
				selectParent: false,
				flod: false,
			}
		},
		components: {
			navBar,
			tkiTree
		},
		onLoad(option) {
			console.log(333, uni.getStorageSync('carInfo'))
			let that = this;
			let _carInfo = uni.getStorageSync('carInfo');
			that.carInfo = uni.getStorageSync('carInfo');

			let _ids = _carInfo.bindDevices.map(val => val.id);
			console.log(333, _ids)

			http.get("getCarType").then(res => {
				that.carTypeList = res.data;
				that.getImgUrl(uni.getStorageSync('carInfo').var1)
			})

			//获取组织列表
			http.get("org").then(res => {
				that.orgTree = res.data[0].children;
				that.setTreeChecked(that.orgTree, that.carInfo.areaId)

			})
		},
		onShow() {
			let that = this;
			uni.$on('updateCarType', function(data) {
				that.carInfo.vehicleType = data.name;
				that.carInfo.var1 = data.code;
				that.getImgUrl(data.code)
			})

			uni.$on('updateCarBrand', function(data) {
				that.carInfo.bandType = data.name;
				that.carInfo.var2 = data.code
			})
		},
		methods: {
			setTreeChecked(tree, checkedId) {
				let that = this;
				tree.forEach(val => {
					if (val.id == checkedId) {
						val.checked = true;
						that.carInfo.areaName = val.name;
					}

					if (val.children && val.children.length) {
						that.setTreeChecked(val.children, checkedId)
					}
				})


			},
			showTree() {
				this.$refs.tkitree._show();
			},
			treeConfirm(e) {
				console.log(e)
				this.carInfo.areaId = e[0].id;
				this.carInfo.areaName = e[0].name;
			},
			treeCancel() {

			},
			toggleFocus1() {
				this.focus1 = !this.focus1
			},
			toggleFocus2() {
				this.focus2 = !this.focus2
			},
			getImgUrl(code) {
				let that = this;

				that.carTypeList.forEach(val => {
					let find = val.vehicleTypes?.find(v => v.code == code);
					if (find) {
						that.image = find.image;
					}
				})

			},
			goto(url) {
				uni.navigateTo({
					url: url
				})
			},

			handleScanCode() {
				uni.scanCode({
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						uni.showToast({
							title: res.scanType + ':' + res.result,
							icon: 'none',
						});

					}
				})

			},
			handleSave() {
				let that = this;

				let params = [{
					"areaId": that.carInfo.areaId,
					"var1": that.carInfo.var1,
					"var2": that.carInfo.var2,
					"deviceName": that.carInfo.plateNo,
					"deviceTypeName": that.carInfo.deviceTypeName,
					"id": that.carInfo.id,
					"bindIds": [406384],
					"primaryId": 406384
				}]
				http.post("updateCar", params).then(res => {
					console.log(777, res)
					uni.showToast({
						title: res.msg,
						icon: 'none',
					});
					if (res.code == 200) {
						uni.navigateBack({
							delta: 1
						})

					}
				})
			}


		}
	}
</script>


<style scoped lang="scss">
	.content {
		background: #F0F2F5;
		min-height: calc(100vh - 0rpx);
		position: relative;
	}

	.item {
		height: 110rpx;
		line-height: 110rpx;
		border-bottom: 1px solid #F0F2F5;
		background-color: #fff;
		position: relative;
		padding: 0 32rpx;
		font-size: 32rpx;

		.value {
			float: right;
			color: rgba(0, 0, 0, 0.6);

			.icon {
				width: 24rpx;
				height: 24rpx;
				margin-left: 20rpx;
				vertical-align: -4rpx;
			}

			.scan-icon {
				width: 40rpx;
				height: 40rpx;
				float: right;
				margin-top: 32rpx;
			}

			.uni-input {
				font-size: 32rpx;
				margin-top: 12rpx;
				text-align: right;
				float: right;
				padding-right: 48rpx;
			}

			.uni-input-focus {
				border-bottom: 1px solid #3370FF;
			}
		}


	}

	.img {
		width: 100rpx;
		height: 100rpx;
		float: right;
	}

	.submit-btn {
		text-align: center;
		position: absolute;
		right: 50rpx;
		left: 50rpx;
		bottom: 100rpx;
		font-size: 32rpx;
		height: 96rpx;
		line-height: 96rpx;
		background-color: #3370FF;
		border-radius: 16rpx;
		text-align: center;
		font-size: 32rpx;
		font-weight: bold;
		color: #fff;

	}
</style>