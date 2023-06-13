<template>
	<view class="content">
		<view class="tip">
			请选择消息推送的报警类型，选择后报警将以
		</view>
		
	</view>
</template>


<script>
	import http from '../../common/request';
	export default {
		data() {
			return {
			}
		},
		onLoad() {
			
		},
		methods: {
			
		}
	}
</script>


<style scoped lang="scss">
	.tip{
		padding: 30rpx 24rpx;
		background-color: rgba(51,112,255,0.16);
		color: #3370FF;
		font-size: 22rpx;
	}
</style>