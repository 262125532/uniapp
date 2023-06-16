<template>
	<view class="content">
		<navBar :navBar="navBar" />
		<view class="input-box">
		    <input class="uni-input" @confirm="onSearch" placeholder="请输入终端编号" confirm-type="search" :value="searchValue" @input="clearInput" />
		    <text class="uni-icon" v-if="!!searchValue" @click="clearSearch">&#xe434;</text>
		</view>
		<view class="tip">
			点击重置蜂鸣器按钮，可关闭本次终端报警蜂
		</view>
		
		<view class="list">
			<view class="item" v-for="item in list">
				<view class="title">
					终端编号
					<view :class="item.onlineStatus =='在线'?'status green':'status gray'">
						{{item.onlineStatus}}
					</view>
				</view>
				<view class="num">
					{{item.deviceSerialCode}}
				</view>
				
				<view class="reset-btn" @click="handleReset(item)">
					重置蜂鸣器
				</view>
				
			</view>
			
		</view>
		
		<empty v-if="!loading && list.length == 0" />
		
		
		
	</view>
</template>


<script>
	import http from '../../common/request';
	import navBar from "../../components/navBar";
	import empty from "../../components/empty";
	export default {
		data() {
			return {
				searchValue: "",
				showClearIcon: true,
				list: [],
				navBar: {
					bgcolor: '#FFFFFF', //导航背景颜色，不传默认#F8F8F8
					back: true, //回退箭头，不传默认true
					backcolor: '#333', //回退箭头颜色，不传默认#333
					previousText: '', //回退提示，不传默认直接回退
					title: "蜂鸣器重置", //本页标题，必传
					titlecolor: '#333', //本页标题颜色，不传默认#333
				},
				loading: true
			}
		},
		components: { navBar, empty },
		onLoad() {
			let that = this;
			this.getData()
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
				this.searchValue = e.detail.value
			},
			handleReset(val) {
				http.post("resetBuzzer", {terminalId: val.deviceSerialCode}).then(res => {
					if(res.code == 200) {
						uni.showToast({
							title: res.data,
							icon: 'none',
						});
					}else{
						uni.showToast({
							title: res.msg,
							icon: 'none',
						});
					}
				})
			},
			getData() {
				let that = this;
				let params = {
					"areaId":1,
					"deviceSerialCode": that.searchValue,
					"terminalType": 'smartJobType',
					"sysName":"xt",
				}
				that.loading = true;
				uni.showLoading({
					title: '加载中'
				});
				http.post("buzzerList", params).then(res => {
					uni.hideLoading();
					that.loading = false;
					that.list = []
					res.data.forEach( val => {
						if(val.var1 == "smartJobType") {
							that.list.push(val)
						}
						
					})
				})
				
			}
			
		}
	}
</script>


<style scoped lang="scss">
	.content{
		// height: calc(100vh - 0rpx);
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
		.item:first-child{
			border-radius: 16rpx 16rpx 0 0;
		}
		.item:last-child{
			border: none;
			border-radius: 0 0 16rpx 16rpx;
		}
		
		
	}
	
</style>