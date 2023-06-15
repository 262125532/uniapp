<template>
	<view class="content">
		<navBar :navBar="navBar" />
		
		<p>不同环境判断域名：platform.baseUrl</p>
		<p>不同环境判断平台：platform.ifDefPlatform()</p>
		<p>判断测试环境和生产环境：process.env.NODE_ENV</p>
		<navigator url="/pages/index/map">
			<button type="default">跳转地图页面</button>
		</navigator>
		<button type="default" @click="goto('/pages/index/map')">跳转地图页面</button>
		
		<navigator url="/pages/index/ucharts">
			<button type="default">跳转图表页面</button>
		</navigator>
		<button type="default" @click="init()">调用接口</button>
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
		<p>1</p><p>1</p><p>1</p><p>1</p>
		<p>1</p><p>1</p><p>1</p><p>1</p>
		<p>1</p><p>1</p><p>1</p><p>1</p>
		<p>1</p><p>1</p><p>1</p><p>1</p>
		<p>1</p><p>1</p><p>1</p><p>1</p>
		<p>1</p><p>1</p><p>1</p><p>1</p>
		<p>1</p><p>1</p><p>1</p><p>1</p>
	</view>
</template>

<script>
	import navBar from "../../components/navBar";
	import http from '../../common/request';
	import {platform} from '../../common/platform.js';
	export default {
		data() {
			return {
				navBar: {
					bgcolor: '#F8F8F8', //导航背景颜色，不传默认#F8F8F8
					back: true, //回退箭头，不传默认true
					backcolor: '#333', //回退箭头颜色，不传默认#333
					previousText: '您确定要关闭吗？', //回退提示，不传默认直接回退
					title: "首页1", //本页标题，必传
					titlecolor: '#333', //本页标题颜色，不传默认#333
				},
			}
		},
		components: { navBar },
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
			http.post('getTree').then( res => {
					console.log(333, res)
				
				
			})
		},
		methods: {
			goto(url) {
				uni.navigateTo({
					url:url
				})
			},
			init(){
				let data = {
					username: 'username',
					password: 'password',
					inputCode: '111111',
					imageId: '222222'
				}
				http.post('login', data).then(res => {
					console.log('调用接口',res)
					if(res.code == 200) {
						// 存放token
						uni.setStorageSync('Authorization', res.data.access_token)
					}else{
						uni.showToast({
							title: '账号或密码错误，请重新登录',
							icon: 'none',
						});
					}
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #f00;
	}
</style>
