<template>
	<view class="content">
		<navBar :navBar="navBar" />
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
			<view class="sub-child" v-for="item in subList" @click="handleSelect(item)">
				{{item.name}}
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
				list: [],
				subList: [],
				curIndex: 0,
				navBar: {
					bgcolor: '#FFFFFF', //导航背景颜色，不传默认#F8F8F8
					back: true, //回退箭头，不传默认true
					backcolor: '#333', //回退箭头颜色，不传默认#333
					previousText: '', //回退提示，不传默认直接回退
					title: "车辆类型", //本页标题，必传
					titlecolor: '#333', //本页标题颜色，不传默认#333
				},
			}
		},
		components: { navBar },
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
				this.curIndex = index;
				this.subList = item.vehicleTypes
			},
			handleSelect(val) {
				
				
				
			}
			
		}
	}
</script>


<style scoped lang="scss">
	.content{
		background: #fff;
		min-height: calc(100vh - 0rpx);
		position: relative;
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
			width: 6rpx;
			background-color: #3370FF;
			position: absolute;
			left: 0rpx;
			top: 34rpx;
		}
		
	}
	.sub-list{
		position: absolute;
		left: 260rpx;
		top: 0rpx;
		
		.sub-child{
			height: 100rpx;
			line-height: 100rpx;
			background-color: #fff;
			padding-left: 40rpx;
			position: relative;
			
		}
	}
	
</style>