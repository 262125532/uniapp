<template>
	<view class="content">
		<view class="tip">
			以下车辆还未激活，如已绑定终端，请等待终
		</view>
		
		<view class="list">
			<view class="item" v-for="item in list" @click="goto('/pages/my/editCar?id=' + item.id)">
				{{item.plateNo}}
				<view class="dot-box">
					<text class="dot">.</text>
				</view>
				{{item.deviceCode}}
				<view class="link">
					未绑定
					<image class="icon" src="../../static/img/right.png" alt="">
				</view>
			</view>
		</view>
	</view>
</template>


<script>
	import http from '../../common/request';
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			this.getCarList()
		},
		methods: {
			goto(url) {
				uni.navigateTo({
					url:url
				})
			},
			getCarList() {
				let that = this;
				let deviceInfo = {
					areaId: 1,
					deviceCode: 0,
					deviceNameCode: '',
					followerSerialCode: '',
					fuelBind: 0,
					isBind: 0,
					onlineStatus: 0,
					pageNum: 1,
					pageSize: 1000000,
					vehicleType: ''
				}
					
				http.post("unActiveCarList", {pageNum: 1, pageSize: 20, deviceInfo}).then( res => {
					console.log(222, res)
					if(res.code == 200) {
						that.list = res.data.content
					}
					
				})
			}
			
		}
	}
</script>


<style scoped lang="scss">
	.content{
		background: #F0F2F5;
		min-height: calc(100vh - 0rpx);
	}
	.tip{
		padding: 30rpx 24rpx;
		background-color: rgba(51,112,255,0.16);
		color: #3370FF;
		font-size: 22rpx;
	}
	.list{
		margin: 24rpx;
		border-radius: 16rpx;
		background-color: #fff;
		.item{
			height: 112rpx;
			line-height: 112rpx;
			padding: 0 30rpx 0 24rpx;
			border-bottom: 1px solid #F0F2F5;
			
			.dot-box{
				display: inline-block;
				position: relative;
				padding: 0 20rpx;
				.dot{
					position: absolute;
					top: -86rpx;
					font-size: 48rpx;
				}
			}
			
			.link{
				float: right;
				color: rgba(0,0,0,0.6);
				font-size: 28rpx;
				
				.icon{
					width: 24rpx;
					height: 24rpx;
					margin-left: 20rpx;
					vertical-align: -4rpx;
				}
			}
			
			
		}
	}
</style>