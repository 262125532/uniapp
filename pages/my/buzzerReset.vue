<template>
	<view class="content">
		<view class="uni-input-wrapper">
		    <input class="uni-input" placeholder="请输入终端编号" :value="inputClearValue" @input="clearInput" />
		    <text class="uni-icon" v-if="showClearIcon" @click="clearIcon">&#xe434;</text>
		</view>
		<view class="tip">
			点击重置蜂鸣器按钮，可关闭本次终端报警蜂
		</view>
		
		<view class="list">
			<view class="item" v-for="item in list">
				<view class="title">
					终端编号
					<view class="status">
						在线
					</view>
				</view>
				<view class="num">
					{{item.terminalTypeNo}}
				</view>
				
				<view class="reset-btn">
					重置蜂鸣器
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
				inputClearValue: "",
				showClearIcon: true,
				list: []
			}
		},
		onLoad() {
			let that = this;
			let params = {
				"areaId":1,
				"deviceSerialCode":"",
				"sysName":"xt"
			}
			
			http.post("buzzerList", params).then(res => {
				console.log(222, res)
				res.data.forEach(val => {
					if(val.onlineStatus == '在线') {
						that.list.push(val)
					}
					
					
				})
				
			})
			
		},
		methods: {
			clearIcon() {
				
			},
			clearInput() {
				
			}
			
		}
	}
</script>


<style scoped lang="scss">
	.content{
		height: calc(100vh - 0rpx);
		background-color: #F0F2F5;
	}
	
	.uni-input-wrapper {
		height: 112rpx;
		position: relative;
	    padding: 24rpx;
	    background-color: #FFFFFF;
	}
	
	.uni-input {
	    height: 64rpx;
	    font-size: 15px;
	    padding: 0 28rpx;
	    flex: 1;
	    background-color: #F4F7FA;
		border-radius: 44rpx;
	}
	
	.uni-icon {
		position: absolute;
	    font-family: uniicons;
	    font-size: 24px;
	    font-weight: normal;
	    font-style: normal;
	    width: 24px;
	    height: 24px;
	    line-height: 24px;
	    color: #999999;
		right: 100rpx;
		top: 50rpx;
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
			height: 144rpx;
			line-height: 110rpx;
			padding: 0 24rpx;
			border-bottom: 1px solid #F0F2F5;
			position: relative;
			font-weight: 400;
			
			.title{
				font-size: 28rpx;
				position: relative;
				.status{
					height: 40rpx;
					line-height: 40rpx;
					position: absolute;
					left: 160rpx;
					top: 36rpx;
					padding: 0 12rpx;
					background-color: rgba(82, 196, 26, 0.16);
					color: #52C41A;
					border-radius: 8rpx;
					font-weight: normal;
				}
				.gray{
					background-color: rgba(0, 0, 0, 0.16);
					color: #000;
					
				}
			}
			.num{
				font-size: 32rpx;
				position: absolute;
				top: 48rpx;
			}
			.reset-btn{
				width: 160rpx;
				height: 56rpx;
				line-height: 56rpx;
				text-align: center;
				background: #3370FF;
				border-radius: 28rpx;
				position: absolute;
				top: 44rpx;
				right: 24rpx;
				color: #fff;
				font-size: 24rpx;
				
			}
			
		}
		.item:last-child{
			border: none;
		}
		
	}
</style>