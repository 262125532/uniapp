<template>
	<view class="content">
		<image class="logo" src="../../static/img/logo.png" alt="">
		<view class="text">智能作业监管</view>
	</view>
</template>

<script>
	import Logo from '../../static/img/logo.png'
</script>

<style scoped lang="scss">
	.content{
		width: 100vw;
		height: calc(100vh - 100rpx);
		background: #F0F2F5;
		position: relative;
		
	}
	.logo{
		width: 400rpx;
		height: 400rpx;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -250rpx;
		margin-left: -200rpx
		
	}
	.text{
		width: 100%;
		position: absolute;
		top: 50%;
		margin-top: 200rpx;
		text-align: center;
		font-size: 48rpx;
		
		
		
	}
</style>