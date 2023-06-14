<template>
	 <view class="content">
		
		 <view class="seft-info">
			 <image class="bg" src="../../static/img/my-bg.png" alt="">
			 <view class="page-title">
			 	我的
			 </view>
			 
			 <image class="img" src="../../static/img/头像.png" alt="">
			 <view class="info">
					<view class="name">{{userName}}</view>
					<view class="phone">{{phone}}</view>
			 </view>
		 </view>
		 <view class="list">
				<view class="item" @click="goto('/pages/my/alarmPush')">
					<image class="left-icon" src='../../static/img/报警推送管理-icon.png'></image>
					<view class="title">报警推送管理</view>
					<view class="link">
						设置报警推送
						<image class="icon" src="../../static/img/right.png" alt="">
					</view>
				</view>
				<view class="item" @click="goto('/pages/my/unActiveCar')">
					<image class="left-icon" src='../../static/img/未激活车辆-icon.png'></image>
					<view class="title">未激活车辆</view>
					<view class="link">车辆绑定终端 <image class="icon" src="../../static/img/right.png" alt=""></view>
				</view>
				<view class="item" @click="goto('/pages/my/buzzerReset')">
					<image class="left-icon" src='../../static/img/蜂鸣器重置-icon.png'></image>
					<view class="title">蜂鸣器重置</view>
					<view class="link">关闭蜂鸣器报警 <image class="icon" src="../../static/img/right.png" alt=""></view>
				</view>
				<view class="item" @click="goto('/pages/my/changePwd')">
					<image class="left-icon" src='../../static/img/设置密码-icon.png'></image>
					<view class="title">设置密码</view>
					<view class="link"><image class="icon" src="../../static/img/right.png" alt=""></view>
				</view>
				<view class="item" @click="goto('/pages/my/about')">
					<image class="left-icon" src='../../static/img/关于-icon.png'></image>
					<view class="title">关于</view>
					<view class="link"><image class="icon" src="../../static/img/right.png" alt=""></view>
				</view>
		 	
		 </view>
		 
		 <view class="logout" @click="goto('/pages/login/index')">
			退出登录
		 </view>
	</view>
</template>

<script>
	import http from '../../common/request';
	export default {
		data() {
			return {
				phone: '',
				userName: ''

			}
		},
		onLoad() {
			
			this.init()
		},
		methods: {
			init() {
				this.userName = uni.getStorageSync('username');
				let _phone = uni.getStorageSync('phone');
				this.phone =  _phone? _phone.substr(0,3) + "****" + _phone.substr(7,11) : "";
			},
			goto(url) {
				uni.navigateTo({
					url:url
				})
			},
			logout() {
				uni.setStorageSync("username", "")
				uni.setStorageSync("Authorization", "")
				uni.navigateTo({
					url: '/pages/login/index'
				});
				
			}
			
			
		}
	}
</script>

<style scoped lang="scss">
	.content{
		height: calc(100vh - 0rpx);
		background-color: #F0F2F5;
	}
	.page-title{
		text-align: center;
		color: #fff;
		font-size: 36rpx;
		font-weight: bold;
		padding-top: 40rpx;
		position: relative;
	}
	
	.seft-info{
		height: 320rpx;
		position: relative;
		.bg{
			width: 100%;
			height: 320rpx;
			position: absolute;
			left: 0;
			top: 0;
			z-index: 0;
		}
		
		.img{
			width: 120rpx;
			height: 120rpx;
			float: left;
			border-radius: 16rpx;
			font-size: 0;
			overflow-y: hidden;
			position: relative;
			margin-left: 24rpx;
			display: block;
			margin-top: 60rpx;
		
			img{
				width: 100%;
				height: 100%;
				border-radius: 16rpx;
			}
		}
		
		.info{
			float: left;
			margin-left: 30rpx;
			color: #fff;
			padding-top: 76rpx;
			position: relative;
			.name{
				
				font-size: 36rpx;
				font-weight: bold;
				margin-bottom: 7rpx;
			}
		}
	}
	
	.list{
		background: #fff;
		border-radius: 16rpx;
		margin: 24rpx;
		padding: 0 0rpx 0 96rpx;
		
		.item{
			height: 100rpx;
			line-height: 100rpx;
			border-bottom: 1rpx solid #E4E5E8;
			position: relative;
			padding-right: 32rpx;
			
			.left-icon{
				position: absolute;
				left: -76rpx;
				width: 48rpx;
				height: 48rpx;
				top: 24rpx;
			}
			.title{
				float: left;
				font-size: 32rpx;
				font-weight: bold;
			}
			.link{
				float: right;
				color: rgba(0,0,0,0.6);
				font-size: 28rpx;
				
				.icon{
					width: 24rpx;
					height: 24rpx;
					margin-left: 20rpx;
					vertical-align: -4rpx;
				}
			}
			
		}
		
		.item:last-child{
			border: none;
		}
		
	}
	
	.logout{
		height: 112rpx;
		line-height: 112rpx;
		margin-top: 180rpx;
		margin-left: 24rpx;
		margin-right: 24rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		font-size: 36rpx;
		font-weight: bold;
		text-align: center;
		
	}
	
	
</style>