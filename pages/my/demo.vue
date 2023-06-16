<template>
	<view class="content">
		<navBar :navBar="navBar" />
		
	</view>
</template>


<script>
	import http from '../../common/request';
	import navBar from "../../components/navBar";
	export default {
		data() {
			return {
				navBar: {
					bgcolor: '#F8F8F8', //导航背景颜色，不传默认#F8F8F8
					back: true, //回退箭头，不传默认true
					backcolor: '#333', //回退箭头颜色，不传默认#333
					previousText: '', //回退提示，不传默认直接回退
					title: "图表1", //本页标题，必传
					titlecolor: '#333', //本页标题颜色，不传默认#333
				},
			}
		},
		components: { navBar },
		onLoad() {
			
		},
		methods: {
			
		}
	}
</script>


<style scoped lang="scss">
	.content{
		background: #F0F2F5;
		min-height: calc(100vh - 0rpx);
	}
</style>