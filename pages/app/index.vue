<template>
	<view class="content">
		<navBar :navBar="navBar" />
		
		<view class="card">
			<view class="title">
				查询分析
			</view>
			<view class="item" @click="goto('/pages/app/workingHour/index')">
				<view class="icon">
					<image class="img" src='../../static/img/工时管理-icon.png'></image>
				</view>
				<view class="item-title">
					工时管理
				</view>
				
			</view>
			<view class="item">
				<view class="icon">
					<image class="img" src='../../static/img/油量油耗-icon.png'></image>
					
				</view>
				<view class="item-title">
					油量油耗
				</view>
				
			</view>
			<view class="item">
				<view class="icon">
					<image class="img" src='../../static/img/加油记录-icon.png'></image>
					
				</view>
				<view class="item-title">
					加油记录
				</view>
				
			</view>
			<view class="item">
				<view class="icon">
					<image class="img" src='../../static/img/漏油记录-icon.png'></image>
					
				</view>
				<view class="item-title">
					漏油记录
				</view>
				
			</view>
			<view class="item">
				<view class="icon">
					<image class="img" src='../../static/img/轨迹回放-icon.png'></image>
					
				</view>
				<view class="item-title">
					轨迹回放
				</view>
				
			</view>
		</view>
		<view class="card">
			<view class="title">
				详情查询
			</view>
			<view class="item">
				<view class="icon">
					<image class="img" src='../../static/img/视频直播-icon.png'></image>
				</view>
				<view class="item-title">
					视频直播
				</view>
			</view>
			<view class="item">
				<view class="icon">
					<image class="img" src='../../static/img/视频回放-icon.png'></image>
				</view>
				<view class="item-title">
					视频回放
				</view>
			</view>
		</view>
		<view class="card">
			<view class="title">
				智能应用
			</view>
			<view class="item">
				<view class="icon">
					<image class="img" src='../../static/img/电子围栏-icon.png'></image>
				</view>
				<view class="item-title">
					电子围栏
				</view>
			</view>
		</view>
		<view class="card">
			<view class="title">
				报警信息
			</view>
			<view class="item">
				<view class="icon">
					<image class="img" src='../../static/img/报警推送管理-icon.png'></image>
				</view>
				<view class="item-title">
					车辆报警
				</view>
			</view>
		</view>
		<view class="card">
			<view class="title">
				每日报表
			</view>
			<view class="item">
				<view class="icon">
					<image class="img" src='../../static/img/每日报表-icon.png'></image>
				</view>
				<view class="item-title">
					每日报表
				</view>
			</view>
			<view class="item">
				<view class="icon">
					<image class="img" src='../../static/img/车辆画像-icon.png'></image>
				</view>
				<view class="item-title">
					车辆画像
				</view>
			</view>
		</view>
		
		
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
					title: "应用", //本页标题，必传
					titlecolor: '#333', //本页标题颜色，不传默认#333
				},
			}
		},
		components: { navBar },
		onLoad() {
		},
		methods: {
			goto(url) {
				uni.navigateTo({
					url:url
				})
			},
			
		}
	}
</script>


<style scoped lang="scss">
	.content{
		background: #F0F2F5;
		min-height: calc(100vh - 0rpx);
	}
	.card{
		border-radius: 16rpx;
		background-color: #fff;
		margin: 24rpx;
	}
	.title{
		height: 96rpx;
		line-height: 96rpx;
		padding: 028rpx;
		
	}
	.item{
		display: inline-block;
		width: 25%;
		text-align: center;
		font-size: 28rpx;
		margin-bottom: 30rpx;
	}
	.icon{
		height: 58rpx;
		.img{
			width: 48rpx;
			height: 48rpx;
		}
	}
</style>