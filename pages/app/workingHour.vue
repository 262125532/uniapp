<template>
	<view class="content">
		<navBar :navBar="navBar" />
		<scroll-view 
			style="height: 300px;" 
			scroll-y="true" 
			refresher-enabled="true" 
			:refresher-triggered="triggered"
			:refresher-threshold="100" 
			refresher-background="lightgreen" 
			@refresherpulling="onPulling"
			@refresherrefresh="onRefresh" 
			@refresherrestore="onRestore" 
			@refresherabort="onAbort"
					></scroll-view>
		
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
					title: "工时管理", //本页标题，必传
					titlecolor: '#333', //本页标题颜色，不传默认#333
				},
			}
		},
		components: { navBar },
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
	.content{
		background: #F0F2F5;
		min-height: calc(100vh - 0rpx);
	}
</style>