<template>
	<view class="content">
		<view class="input-box">
		    <input class="uni-input" @confirm="onSearch" placeholder="请输入终端编号" confirm-type="search" :value="searchValue" @input="clearInput" />
		    <text class="uni-icon" v-if="!!searchValue" @click="clearSearch">&#xe434;</text>
		</view>
		<view class="tip">
			点击重置蜂鸣器按钮，可关闭本次终端报警蜂
		</view>
		
		<scroll-view 
			class="list-box"
			scroll-y="true" 
			refresher-enabled="true" 
			:refresher-threshold="100" 
			refresher-background="lightgreen" 
			>
			<view class="list">
				<view class="item" v-for="item in list">
					<view class="title">
						终端编号
						<view :class="item.onlineStatus =='在线'?'status green':'status gray'">
							{{item.onlineStatus}}
						</view>
					</view>
					<view class="num">
						{{item.terminalTypeNo}}
					</view>
					
					<view class="reset-btn" @click="handleReset(item)">
						重置蜂鸣器
					</view>
					
				</view>
				
			</view>
					
		</scroll-view>
		
		
		
	</view>
</template>


<script>
	import http from '../../common/request';
	export default {
		data() {
			return {
				searchValue: "",
				showClearIcon: true,
				list: []
			}
		},
		onLoad() {
			let that = this;
			
			this.getData()
			uni.showLoading({
				title: '加载中'
			});

			
			
		},
		methods: {
			onSearch() {
					this.list = [];
					this.getData()
			},
			clearSearch() {
				this.searchValue = ""
				
			},
			clearInput(e) {
				console.log(e)
				this.searchValue = e.detail.value
			},
			handleReset(val) {
				http.post("resetBuzzer", {terminalId: val.terminalTypeNo}).then(res => {
					uni.showToast({
						title: res.msg,
						icon: 'none',
					});
				})
			},
			getData() {
				let that = this;
				let params = {
					"areaId":1,
					"terminalType": 'smartJobType',
					"sysName":"xt",
				}
				http.post("buzzerList", params).then(res => {
					uni.hideLoading();
					that.list = res.data;
				})
				
			}
			
		}
	}
</script>


<style scoped lang="scss">
	.content{
		height: calc(100vh - 0rpx);
		background-color: #F0F2F5;
	}
	
	.input-box {
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
	    font-size: 18px;
	    font-weight: normal;
	    font-style: normal;
	    width: 24px;
	    height: 24px;
	    line-height: 24px;
	    color: #999999;
		right: 40rpx;
		top: 32rpx;
	}
	
	.tip{
		padding: 30rpx 24rpx;
		background-color: rgba(51,112,255,0.16);
		color: #3370FF;
		font-size: 22rpx;
		margin-bottom: 24rpx;
	}
	
	.list-box{
		height: calc(100vh - 260rpx);
	}
	
	.list{
		margin: 0 24rpx 24rpx 24rpx;
		border-radius: 16rpx;
		// background-color: #fff;
		overflow: hidden;
		.item{
			height: 144rpx;
			line-height: 110rpx;
			padding: 0 24rpx;
			border-bottom: 1px solid #F0F2F5;
			position: relative;
			font-weight: 400;
			background-color: #fff;
			
			.title{
				position: relative;
				font-size: 28rpx;
				.status{
					height: 40rpx;
					line-height: 40rpx;
					font-size: 24rpx;
					position: absolute;
					left: 160rpx;
					top: 36rpx;
					padding: 0 12rpx;
					border-radius: 8rpx;
					font-weight: normal;
				}
				.gray{
					background-color: rgba(0, 0, 0, 0.16);
					color: #666;
				}
				.green{
					background-color: rgba(82, 196, 26, 0.16);
					color: #52C41A;
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
			border-radius: 0 0 16rpx 16rpx;
		}
		.item:first-child{
			border-radius: 16rpx 16rpx 0 0;
		}
		
	}
	
</style>