<template>
	<view class="content">
		<p>这里是首页</p>
		<p>使用的uniapp官方组件：https://uniapp.dcloud.net.cn/component/button.html</p>
		<p>使用的uniapp官方组件示例：https://hellouniapp.dcloud.net.cn/pages/component/button/button</p>
		
		<p>不同环境判断域名：platform.baseUrl</p>
		<p>不同环境判断平台：platform.ifDefPlatform()</p>
		<p>判断测试环境和生产环境：process.env.NODE_ENV</p>
		<navigator url="/pages/index/map">
			<button type="default">跳转地图页面</button>
		</navigator>
		<button type="default" @click="goto('/pages/index/map')">跳转地图页面</button>
		<!-- #ifdef H5 -->
		这句话只有在H5能看到<br>
		<!-- #endif -->

		<!-- #ifdef APP-PLUS -->
		这句话只有在app能看到<br>
		<!-- #endif -->

		<!-- #ifdef MP-WEIXIN -->
		这句话只有在微信小程序能看到<br>
		<!-- #endif -->

		<!-- #ifndef MP-LARK -->
		这句话只有在飞书小程序能看”不”到，其他平台可以看到<br>
		<!-- #endif -->
		
	</view>
</template>

<script>
	import http from '../../common/request';
	import {platform} from '../../common/platform.js';
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			// #ifdef H5
			console.log('这句话只有在H5能看到')
			// #endif
			
			// #ifdef MP-WEIXIN
			console.log('这句话只有在微信小程序能看到')
			// #endif
			
			// #ifndef MP-LARK
			console.log('这句话只有在飞书小程序能看”不”到，其他平台可以看到')
			// #endif
			
			console.log(1, platform.ifDefPlatform())
			console.log(2, platform.baseUrl)
			console.log(3, process.env.NODE_ENV)
		},
		methods: {
			goto(url) {
				uni.navigateTo({
					url:url
				})
			},
			init(){
				let data = {}
				http.postAxios('login', data).then(res => {
					console.log('调用接口')
					if (res) {
						
					}
				})
			},
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #f00;
	}
</style>
