<template>
	<uni-nav-bar dark :fixed="true" shadow 
		:background-color="navBar.bgcolor" status-bar
		:color="navBar.titlecolor" 
		:left-icon="navBar.back?'left':''"
		:title="navBar.title" @clickLeft="dialog"/>
</template>
<script>
	export default {
		options: {
			styleIsolation: 'shared',
		},
		name: 'navBar',
		components: {},
		props: ['navBar', 'callback', 'previousText'],
		data() {
			return {
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
			
		},
		watch: {

		}
	}
</script>
<style lang="scss">
	// 导航下面的横线
	::v-deep .uni-navbar--border{
		border: none !important;
	}
	
	// 左侧宽度
	::v-deep .uni-navbar__header-btns-left{
		width: 50rpx !important;
	}
	
	// 标题不居中，靠左
	::v-deep .uni-navbar__header-container-inner{
		text-align: left !important;
		justify-content: left !important;
	}

	// 右侧宽度
	::v-deep .uni-navbar__header-btns-right{
		width: 50rpx !important;
	}
</style>