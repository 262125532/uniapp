<template>
	<view class="content">
		<view class="tip">
			请选择消息推送的报警类型，选择后报警将以
		</view>
		<view class="title">
			应用报警
		</view>
		
		<view class="list">
			<view class="item">
				路线偏移报警
				<switch @change="(e) => onChange(e.detail.value, 'name')" class="switch" name="switch" :checked="checked" />
			</view>
			<view class="item">
				路线偏移报警
				<switch @change="(e) => onChange(e.detail.value, 'name')" class="switch" name="switch" :checked="checked" />
			</view>
			<view class="item">
				路线偏移报警
				<switch @change="(e) => onChange(e.detail.value, 'name')" class="switch" name="switch" :checked="checked" />
			</view>
			
		</view>
		
		
		
		<view class="title">
			终端报警
		</view>
		<view class="list">
			<view class="item">
				终端电量不足
				<switch @change="(e) => onChange(e.detail.value, 'name')" class="switch" name="switch" :checked="checked" />
			</view>
			<view class="item">
				终端拆除报警
				<switch @change="(e) => onChange(e.detail.value, 'name')" class="switch" name="switch" :checked="checked" />
			</view>
			<view class="item">
				终端拆除异常
				<switch @change="(e) => onChange(e.detail.value, 'name')" class="switch" name="switch" :checked="checked" />
			</view>
			<view class="item">
				终端离线
				<switch @change="(e) => onChange(e.detail.value, 'name')" class="switch" name="switch" :checked="checked" />
			</view>
			<view class="item">
				异常产出报警
				<switch @change="(e) => onChange(e.detail.value, 'name')" class="switch" name="switch" :checked="checked" />
			</view>
			<view class="item">
				安装异常报警
				<switch @change="(e) => onChange(e.detail.value, 'name')" class="switch" name="switch" :checked="checked" />
			</view>
			
		</view>
		
		
	</view>
</template>


<script>
	import http from '../../common/request';
	export default {
		data() {
			return {
				checked: false,
			}
		},
		onLoad() {
			
		},
		methods: {
			onChange(value, name) {
				console.log(333, value)
				console.log(333, name)
				
			}
			
		}
	}
</script>


<style scoped lang="scss">
	.content{
		background: #F0F2F5;
		// min-height: calc(100vh - 0rpx);
	}
	.tip{
		padding: 30rpx 24rpx;
		background-color: rgba(51,112,255,0.16);
		color: #3370FF;
		font-size: 22rpx;
	}
	.title{
		height: 110rpx;
		line-height: 110rpx;
		padding-left: 24rpx;
		background-color: #fff;
	}
	
	.list{
		margin: 24rpx;
		background-color: #fff;
		border-radius: 16rpx;
		
		.item{
			height: 110rpx;
			line-height: 110rpx;
			padding: 0 24rpx;
			border-bottom: 1px solid #F0F2F5;
			
		}
		.item:last-child{
			border: none;
		}
		.switch{
			float: right;
			transform:scale(0.7);
		}
	}
	
</style>