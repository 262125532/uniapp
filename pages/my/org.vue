<template>
	<view class="content">
		<navBar :navBar="navBar" />

		<view class="tree" v-for>

		</view>


	</view>
</template>


<script>
	import http from '../../common/request';
	import navBar from "../../components/navBar";
	export default {
		data() {
			return {
				navBar: {
					bgcolor: '#FFFFFF', //导航背景颜色，不传默认#F8F8F8
					back: true, //回退箭头，不传默认true
					backcolor: '#333', //回退箭头颜色，不传默认#333
					previousText: '', //回退提示，不传默认直接回退
					title: "选择企业", //本页标题，必传
					titlecolor: '#333', //本页标题颜色，不传默认#333
				},
				orgTree: []
			}
		},
		components: {
			navBar
		},
		onLoad(option) {
			let that = this;
			that.bandType = option.bandType || '315D'

			http.get("org").then(res => {
				that.orgTree = res.data[0].children;

			})
		},
		methods: {
			handleSelect(val) {

			}

		}
	}
</script>


<style scoped lang="scss">
	.content {
		background: #fff;
		min-height: calc(100vh - 0rpx);
		position: relative;
	}
</style>