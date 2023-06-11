<template>
	 <view class="content">
		 <view class="seft-info">
			 <view class="img">
				 <img src="../../static/img/头像.png" alt="">
			 </view>
			 <view class="info">
					<view class="name">{{userName}}</view>
					<view class="phone">{{phone}}</view>
			 </view>
			 
		 </view>
		 <view class="list">
				<view class="item">
					<view class="title">报警推送管理</view>
					<view class="link">设置报警推送&gt</view>
				</view>
				<view class="item">
					<view class="title">未激活车辆</view>
					<view class="link">车辆绑定终端 &gt</view>
				</view>
				<view class="item">
					<view class="title">蜂鸣器重置</view>
					<view class="link">关闭蜂鸣器报警 &gt</view>
				</view>
				<view class="item" @click="goto('/pages/my/changePwd')">
					<view class="title">设置密码</view>
					<view class="link">&gt</view>
				</view>
				<view class="item" @click="goto('/pages/my/about')">
					<view class="title">关于</view>
					<view class="link">&gt</view>
				</view>
		 	
		 </view>
		 
		 <view class="logout" @click="go('/pages/login/index')">
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
				this.phone =  _phone.substr(0,3) + "****" + _phone.substr(7,11);
			},
			goto(url) {
				uni.navigateTo({
					url:url
				})
			},
			logout() {
				uni.navigateTo({
					url: '/pages/login/index'
				});
				
			}
			
			
		}
	}
</script>

<style scoped lang="scss">
	.content{
		background: #F0F2F5;
		height: 100vh;
	}
	
	.seft-info{
		height: 200rpx;
		background: #3370FF;
		padding: 50rpx 24rpx;
		
		.img{
			width: 120rpx;
			height: 120rpx;
			float: left;
			border-radius: 16rpx;
			img{
				width: 100%;
				height: 100%;
			}
		}
		
		.info{
			float: left;
			margin-left: 30rpx;
			color: #fff;
			padding-top: 15rpx;
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
		padding: 0 32rpx;
		
		.item{
			height: 100rpx;
			line-height: 100rpx;
			border-bottom: 1rpx solid #E4E5E8;
			.title{
				float: left;
				font-size: 32rpx;
				font-weight: bold;
			}
			.link{
				float: right;
				color: rgba(0,0,0,0.6);
				font-size: 28rpx;
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