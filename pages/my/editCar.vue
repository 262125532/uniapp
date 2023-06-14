<template>
	<view class="content">
		<view class="item">
			车辆照片{{carInfo.picUrl}}
			<image :src="carInfo.picUrl"></image>
		</view>
		<view class="item">
			车辆型号{{carInfo.vehicleType}}
		</view>
		<view class="item">
			品牌型号{{carInfo.bandType}}
		</view>
		<view class="item">
			车牌号{{carInfo.plateNo}}
		</view>
		<view class="item">
			所属企业{{carInfo.areaName}}
		</view>
		<view class="item">
			终端编号{{carInfo.vehicleType}}
		</view>
		
		
		
	</view>
</template>


<script>
	import http from '../../common/request';
	export default {
		data() {
			return {
				carInfo: {}
			}
		},
		onLoad(option) {
			console.log(222, uni.getStorageSync('carInfo').picUrl)
			this.carInfo = uni.getStorageSync('carInfo');
			
			option.id && http.post("carDetail", "", option.id)
			
		},
		methods: {
			
			
		}
	}
</script>


<style scoped lang="scss">
	.content{
		background: #F0F2F5;
		min-height: calc(100vh - 0rpx);
		position: relative;
	}
	
	.item{
		height: 110rpx;
		line-height: 110rpx;
		border-bottom: 1px solid #F0F2F5;
		background-color: #fff;
		position: relative;
		padding: 0 32rpx;
		
		
	}
</style>