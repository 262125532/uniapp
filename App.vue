<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './common/uni.css';
	@import '@/static/customicons.css';

	.uni-body {
		background-color: #F0F2F5 !important;
	}

	.uni-page-body {
		min-height: 100%;
	}

	/* uni.showModal 内容文字颜色 */
	::v-deep .uni-modal .uni-modal__bd {
		color: #333 !important;
	}

	.ellipsis {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.clear {
		clear: both;

	}
</style>