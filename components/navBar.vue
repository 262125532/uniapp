<template>
	<!-- #ifdef H5 -->
	<view class="navBarBox" :style="{'padding-top':customBar + 'px'}">
		<!-- #endif -->
		<!-- #ifndef H5 -->
		<view class="navBarBox" :style="{'padding-top':customBar + 8 + 'px'}">
			<!-- #endif -->
			<view class="navBar" :style="{'background':navBar.bgcolor || '#F8F8F8', 'padding-top':statusBar + 'px'}">
				<view class="left" v-if="navBar.back" @click="dialog()">
					<view class="uni-icon uni-icon-back" :style="{'color':navBar.backcolor}"></view>
				</view>
				<view class="center" :style="{'color':navBar.titlecolor}">
					{{navBar.title}}
				</view>
				<!-- <view class="btn" v-if="navBar.btn" @click="okBtn()">{{navBar.btn}}</view> -->
			</view>
		</view>
</template>
<script>
	export default {
		name: 'navBar',
		components: {},
		props: ['navBar', 'callback', 'previousText'],
		data() {
			return {
				statusBar: 0,
				customBar: 0,
				navbar: 0,
			};
		},
		methods: {
			back() {
				uni.navigateBack();
			},
			dialog() {
				let that = this
				if (that.navBar.previousText) {
					uni.showModal({
						title: "",
						content: that.navBar.previousText,
						showCancel: false,
						confirmText: "确定",
						confirmColor: "#333",
						success(res) {
							that.back()
						}
					})
				} else {
					that.back()
				}
			},
			// 回调函数保存
			okBtn() {
				this.callback()
			}
		},
		mounted() {
			uni.getSystemInfo({
				success: (e) => {
					let that = this

					// '状态栏高度',that.statusBar
					// '状态栏高度 + 导航栏高度 ',that.customBar
					// '自定义标题与胶囊对齐高度',that.navbar

					// #ifdef MP
					that.statusBar = e.statusBarHeight
					that.customBar = e.statusBarHeight + 45
					if (e.platform === 'android') {
						this.$store.commit('SET_SYSTEM_IOSANDROID', false)
						that.customBar = e.statusBarHeight + 50
					}
					// #endif

					// #ifdef MP-WEIXIN
					that.statusBar = e.statusBarHeight
					const custom = wx.getMenuButtonBoundingClientRect()
					that.customBar = custom.bottom + custom.top - e.statusBarHeight
					that.navbar = (custom.top - e.statusBarHeight) * 2 + custom.height
					// #endif

					// #ifdef MP-ALIPAY
					that.statusBar = e.statusBarHeight
					that.customBar = e.statusBarHeight + e.titleBarHeight
					// #endif

					// #ifdef APP-PLUS
					// console.log('app-plus', e)
					that.statusBar = e.statusBarHeight
					that.customBar = e.statusBarHeight + 45
					// #endif

					// #ifdef H5
					that.statusBar = 0
					that.customBar = e.statusBarHeight + 45
					// #endif

					// console.log('状态栏高度',that.statusBar)
					// console.log('状态栏高度 + 导航栏高度 ',that.customBar)
					// console.log('自定义标题与胶囊对齐高度',that.navbar)
				}
			})
		},
		watch: {

		}
	}
</script>
<style scoped lang="scss">
	.navBarBox {}

	.navBar {
		width: 750rpx;
		height: 90rpx;
		background: #34C266;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 999;

		.left {
			// position: absolute;
			width: 80rpx;
			height: 90rpx;
			float: left;
			text-align: center;
			line-height: 86rpx;
			// left: 0;
			// bottom: 0;
			z-index: 1;
			font-size: 48rpx;
		}

		.center {
			width: 750rpx;
			height: 90rpx;
			line-height: 94rpx;
			font-size: 36rpx;
			color: #fff;
			text-align: left;
			text-indent: 6rpx;
		}

		.btn {
			position: absolute;
			right: 28rpx;
			top: 28rpx;
			z-index: 1;
			font-size: 28rpx;
			color: #fff;
		}
	}
</style>