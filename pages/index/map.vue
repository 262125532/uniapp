<template>
	<view class="content">
		<navBar :navBar="navBar" />
		<p>这里是高德地图</p>
		<map :latitude="latitude" :longitude="longitude" :markers="covers"></map>
	</view>
</template>

<script>
	import navBar from "../../components/navBar";
	export default {
		data() {
			return {
				navBar: {
					bgcolor: '#F8F8F8', //导航背景颜色，不传默认#F8F8F8
					back: true, //回退箭头，不传默认true
					backcolor: '#333', //回退箭头颜色，不传默认#333
					previousText: '您确定要关闭吗？', //回退提示，不传默认直接回退
					title: "地图1", //本页标题，必传
					titlecolor: '#333', //本页标题颜色，不传默认#333
				},
				title: 'Hello',
				latitude: 39.909,
				longitude: 116.39742,
				covers: [],
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
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	map {
		width: 100%;
		height: 600rpx;
	}
</style>
