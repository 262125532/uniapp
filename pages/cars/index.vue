<template>
	<view class="content">
		<navBar :navBar="navBar" />
		
		<view class="tab">
			<view :class="activeTab ==1? 'item active':'item'" @click="changeTab(1)">
				全部
				<view class="border"></view>
			</view>
			<view :class="activeTab ==2? 'item active':'item'" @click="changeTab(2)">
				运行
				<view class="border"></view>
			</view>
			<view :class="activeTab ==3? 'item active':'item'" @click="changeTab(3)">
				怠速
				<view class="border"></view>
			</view>
			<view :class="activeTab ==4? 'item active':'item'" @click="changeTab(4)">
				静止
				<view class="border"></view>
			</view>
			<view :class="activeTab ==5? 'item active':'item'" @click="changeTab(5)">
				离线
				<view class="border"></view>
			</view>
		</view>
		
		<view class="total">
			全部状态（999辆）
		</view>
		
		<view class="list">
			<view class="item">
				<view class="status-box">
					<view class="car-status">
						状态：
						<view class="status">
							运行
						</view>
					</view>
					<view class="icons">
						<image class="end" src="../../static/img/终端.png" alt="">
						<image class="fence" src="../../static/img/围栏.png" alt="">
						<view class="electric">
							<image class="img" src="../../static/img/电池.png" alt="">
							<view class="progress" :style="`width: ${percent}%;background-color: ${percent<20?'#E50012':'#52C41A'}`"></view>
						</view>
						{{'100%'}}
					</view>
				</view>
				
				<view class="car-info">
					<view class="img">
						
					</view>
					<view class="infos">
						<view class="no">
							京A12324 · 89
						</view>
						<view class="type">
							全自动间歇式沥青混凝土拌合设备
						</view>
						<view class="company">
							青岛北苑商砼有限公司
						</view>
						<view class="gps">
							GPS上报时间：2023-06-28 17:30:30
						</view>
					</view>
				</view>
				<view class="datas">
					<image class="img" src="../../static/img/今日里程.png" alt="">
					<text class="title">今日里程</text>
					<text style="color: #52C41A;">9999公里</text>
				</view>
				<view class="datas" style="padding-left: 24rpx;">
					<image class="img" src="../../static/img/当前车速.png" alt="">
					<text class="title">当前车速</text>
					<text style="color: #3370FF;">9999公里</text>
				</view>
				<view class="datas">
					<image class="img" src="../../static/img/今日工时.png" alt="">
					<text class="title">今日工时</text>
					<text style="color: #52C41A;">9999公里</text>
				</view>
				<view class="datas" style="padding-left: 24rpx;">
					<image class="img" src="../../static/img/持续运行.png" alt="">
					<text class="title">持续运行</text>
					<text style="color: #3370FF;">9999公里</text>
				</view>
				<view class="location">
					<image class="img" src="../../static/img/地理位置.png" alt="">
					<text class="title">地理位置</text>
					<text>北京市三一重工北清路8号</text>
				</view>
				<view class="line"></view>
				<view class="line1"></view>
				
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
				activeTab: 1,
				percent: 100,
				navBar: {
					bgcolor: '#F8F8F8', //导航背景颜色，不传默认#F8F8F8
					back: false, //回退箭头，不传默认true
					backcolor: '#333', //回退箭头颜色，不传默认#333
					previousText: '', //回退提示，不传默认直接回退
					title: "车辆", //本页标题，必传
					titlecolor: '#333', //本页标题颜色，不传默认#333
				},

			}
		},
		components: { navBar },
		onLoad() {
			
			this.init()
		},
		methods: {
			init() {
				
			},
			changeTab(cur) {
				console.log(222,cur)
				
				this.activeTab = cur;
			}
			
		}
	}
</script>

<style scoped lang="scss">
	.content{
		background-color: #F4F7FA;
		.tab{
			height: 88rpx;
			line-height: 88rpx;
			background-color: #fff;
			
			.item{
				float: left;
				display: inline-block;
				margin: 0 20rpx;
				position: relative;
				.border{
					background-color: #fff;
				}
			}
			.active{
				.border{
					width: 32rpx;
					height: 6rpx;
					background-color: #3370FF;
					position: absolute;
					bottom: 12rpx;
					left: 50%;
					margin-left: -16rpx;
				}
				
			}
		}
		
		.total{
			margin: 24rpx;
			font-size: 28rpx;
			color: #666;
		}
		
		.list{
			
			.item{
				margin: 24rpx;
				background-color: #fff;
				border-radius: 16rpx;
				padding: 32rpx 24rpx;
				position: relative;
				
				.line{
					position: absolute;
					width: 2rpx;
					height: 28rpx;
					top: 320rpx;
					left: 50%;
					background-color: #ccc;
				}
				.line1{
					position: absolute;
					width: 2rpx;
					height: 28rpx;
					top: 360rpx;
					left: 50%;
					background-color: #ccc;
				}

				.car-status{
					.status{
						display: inline-block;
						background-color: rgba(82,196,26,0.08);
						color: #52C41A;
						padding: 0 12rpx;
						font-size: 28rpx;
						border-radius: 8rpx;
						
					}
					
				}
				
				.icons{
					position: absolute;
					right: 32rpx;
					top: 34rpx;
					.end{
						width: 32rpx;
						height: 32rpx;
						vertical-align: middle;
					}
					.fence{
						width: 32rpx;
						height: 32rpx;
						vertical-align: middle;
						margin: 0 20rpx;
					}
					.electric{
						width: 40rpx;
						height: 20rpx;
						display: inline-block;
						margin-right: 4rpx;
						position: relative;
						.img{
							width: 40rpx;
							height: 20rpx;
							position: absolute;
							top: 0rpx;
							left: 0rpx;
						}
						.progress{
							position: absolute;
							background: #52C41A;
							max-width: 80%;
							height: 16rpx;
							top: 1rpx;
							left: 2rpx;
						}
					}
				}
				
				.car-info{
					height: 200rpx;
					margin-top: 32rpx;
					margin-bottom: 40rpx;
					
					.img{
						width: 160rpx;
						height: 160rpx;
						float: left;
						background-color: #666;
						border-radius: 16rpx;
					}
					.infos{
						float: left;
						font-size: 28rpx;
						margin-left: 24rpx;
						color: #999;
						
						.no{
							font-size: 32rpx;
							color: #000;
						}
						.type{
							height: 36rpx;
							line-height: 36rpx;
							background-color: #F0F2F5;
							padding: 0 12rpx;
							margin: 10rpx 0
							
						}
						.company{
							
						}
						.gps{
							
						}
					}
					
					
				}
				.datas{
					width: 50%;
					font-size: 28rpx;
					float: left;
					box-sizing: border-box;
					margin-bottom: 16rpx;
					.title{
						margin-right: 24rpx;
					}
					.img{
						width: 24rpx;
						height: 24rpx;
						vertical-align: middle;
						margin-right: 16rpx;
					}
					
				}
				.location{
					font-size: 28rpx;
					.title{
						margin-right: 24rpx;
					}
					.img{
						width: 24rpx;
						height: 24rpx;
						vertical-align: middle;
						margin-right: 16rpx;
					}
				}
				
			}
		}
		
		
	}
</style>