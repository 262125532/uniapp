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
					title: "品牌型号", //本页标题，必传
					titlecolor: '#333', //本页标题颜色，不传默认#333
				},
				bandType: ''
			}
		},
		components: { navBar },
		onLoad(option) {
			let that = this;
			that.bandType = option.bandType || '315D'
			
			http.get("carBrand", {vehicleCode: option.var1 | '100001'}).then( res => {
				that.list = res.data;
				that.subList = res.data[0].vehicleTypes
				res.data.forEach( (val, index) => {
					let find = val.models.find( v => v.name  == that.bandType);
					if(find) {
						that.curIndex = index;
						that.subList = val.models;
					}
				})
			})
		},
		methods: {
			parentClick(item, index) {
				this.curIndex = index;
				this.subList = item.models
			},
			handleSelect(val) {
				uni.$emit('updateCarBrand', val)
				uni.navigateBack({
					delta: 1
				})
				
				
				
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
		height: calc(100vh - 90rpx);
		background-color: #F0F2F5;
		.child{
			height: 100rpx;
			line-height: 100rpx;
			
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