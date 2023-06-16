<template>
	<view class="content">
		<navBar :navBar="navBar" />
		<view class="item">
			车辆照片
			<image :src="image" class="img"></image>
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
	import navBar from "../../components/navBar";
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
			}
		},
		components: { navBar },
		onLoad(option) {
			let that = this;
			that.carInfo = uni.getStorageSync('carInfo');
			option.id && http.post("carDetail", "", option.id)
			http.get("getCarType").then( res => {
				res.data.forEach( val => {
					let find = val.vehicleTypes.find(v => v.code == uni.getStorageSync('carInfo').var1 );
					if(find) {
						that.image = find.image;
					}
				})
			})
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
	.img{
		width: 100rpx;
		height: 100rpx;
		float: right;
	}
</style>