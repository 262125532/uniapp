<template>
	<view class="content">
		<view class="list">
			<view 
				:class="index == curIndex? 'child active':'child'" 
				v-for="(item, index) in list"
				@click="parentClick(item,index)"
				>
				{{item.name}}
				<view class="icon" v-if="index == curIndex"></view>
			</view>
		</view>
		<view class="sub-list">
			<view class="child" v-for="item in subList">
				{{item.name}}
			</view>
		</view>
		
	</view>
</template>


<script>
	import http from '../../common/request';
	export default {
		data() {
			return {
				list: [],
				subList: [],
				curIndex: 0
			}
		},
		onLoad(option) {
			let that = this;
			http.get("getCarType").then( res => {
				console.log(222, res)
				that.list = res.data;
				that.subList = res.data[0].vehicleTypes
			})
		},
		methods: {
			parentClick(item, index) {
				console.log(item, 111, index)
			
				
			}
			
		}
	}
</script>


<style scoped lang="scss">
	.content{
		background: #fff;
		min-height: calc(100vh - 0rpx);
	}
	.list{
		width: 260rpx;
		
		.child{
			height: 100rpx;
			line-height: 100rpx;
			background-color: #F0F2F5;
			padding-left: 40rpx;
			position: relative;
		}
		.active{
			background-color: #fff;
			color: #3370FF;
		}
		.icon{
			height: 30rpx;
			width: 10rpx;
			background-color: #3370FF;
			position: absolute;
			left: 0rpx;
			top: 34rpx;
			
		}
	}
</style>