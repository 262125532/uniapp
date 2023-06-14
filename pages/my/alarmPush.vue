<template>
	<view class="content">
		<view class="tip">
			请选择消息推送的报警类型，选择后报警将以
		</view>
		<view class="title">
			应用报警
		</view>
		
		<view class="list">
			
			<view class="item" v-for="(item, index) in appliction" :key="index">
				{{item.name}}
				<switch @change="(e) => onChange(e.detail.value,'appliction', index)" class="switch" name="switch" :checked="item.isAlive" />
			</view>
		</view>
		
		
		
		<view class="title">
			终端报警
		</view>
		<view class="list">
			<view class="item" v-for="(item, index) in terminal" :key="index">
				{{item.name}}
				<switch @change="(e) => onChange(e.detail.value, 'terminal', 'name')" class="switch" name="switch" :checked="item.isAlive" />
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
				appliction: [],
				terminal: []
				
			}
		},
		onLoad() {
			let that = this;
			http.get("appfind").then(res => {
				that.appliction = res.data.appliction;
				that.terminal = res.data.terminal;
			})
		},
		methods: {
			onChange(value, type, index) {
				this[type][index].isAlive = value;
				http.post("appsave", {appliction: this.appliction, terminal: this.terminal}).then(res => {
					if(res.code == 200) {
						uni.showToast({
							title: "操作成功",
							icon: 'none',
						});
					}
				})
			},
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