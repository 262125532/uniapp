<template>
	<view class="content">
		<p>这里是高德地图</p>
		<map :latitude="latitude" :longitude="longitude" :markers="covers"></map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				latitude: 39.909,
				longitude: 116.39742,
				covers: [],
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
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
