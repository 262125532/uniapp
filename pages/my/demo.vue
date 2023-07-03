<template>
	<view class="content">
		<navBar :navBar="navBar" />

		<view class="uni-flex uni-row">
			<view class="text" style="width: 200rpx;">固定宽度</view>
			<view class="text" style="-webkit-flex: 1;flex: 1;">自动占满</view>
			<view class="text" style="width: 200rpx;">固定宽度</view>
		</view>
		<view class="uni-flex uni-row" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
			<view class="text" style="width: 280rpx;">一行显示不全,wrap折行</view>
			<view class="text" style="width: 280rpx;">一行显示不全,wrap折行</view>
			<view class="text" style="width: 280rpx;">一行显示不全,wrap折行</view>
		</view>


		<scroll-view style="height: 300px;" scroll-y="true" refresher-enabled="true" :refresher-triggered="triggered"
			:refresher-threshold="100" refresher-background="lightgreen" @refresherpulling="onPulling"
			@refresherrefresh="onRefresh" @refresherrestore="onRestore" @refresherabort="onAbort">


		</scroll-view>

	</view>
</template>


<script>
	import http from '../../common/request';
	import navBar from "../../components/navBar";
	export default {
		data() {
			return {
				triggered: true,
				navBar: {
					bgcolor: '#F8F8F8', //导航背景颜色，不传默认#F8F8F8
					back: true, //回退箭头，不传默认true
					backcolor: '#333', //回退箭头颜色，不传默认#333
					previousText: '', //回退提示，不传默认直接回退
					title: "demo1", //本页标题，必传
					titlecolor: '#333', //本页标题颜色，不传默认#333
				},
			}
		},
		components: {
			navBar
		},
		onLoad() {
			// this._freshing = false;
			// setTimeout(() => {
			// 	this.triggered = true;
			// }, 1000)

		},
		methods: {
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
			}

		}
	}
</script>


<style scoped lang="scss">
	.content {
		background: #F0F2F5;
		min-height: calc(100vh - 0rpx);
	}
</style>