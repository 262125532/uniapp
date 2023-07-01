<template>
	<view class="content">
		<navBar :navBar="navBar" />
		<image class="logo" src="../../static/img/logo-blue.png" alt="">
			<view class="text">智能作业监管</view>
	</view>
</template>

<script>
	import http from '../../common/request';
	import navBar from "../../components/navBar";
	export default {
		data() {
			return {
				navBar: {
					bgcolor: '#FFFFFF', //导航背景颜色，不传默认#F8F8F8
					back: true, //回退箭头，不传默认true
					backcolor: '#333', //回退箭头颜色，不传默认#333
					previousText: '', //回退提示，不传默认直接回退
					title: "关于", //本页标题，必传
					titlecolor: '#333', //本页标题颜色，不传默认#333
				},
			}
		},
		components: {
			navBar
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	.content {
		width: 100vw;
		position: relative;
	}

	.logo {
		width: 260rpx;
		height: 260rpx;
		position: absolute;
		top: 30vh;
		left: 50vw;
		margin-top: -130rpx;
		margin-left: -130rpx
	}

	.text {
		width: 100vw;
		position: absolute;
		top: 30vh;
		margin-top: 200rpx;
		text-align: center;
		font-size: 38rpx;



	}
</style>