<template>
		<view class="home">
			首页
			<navigator url="/pages/index/index">
				<button type="default">跳转头部案例</button>
			</navigator>
		</view>
</template>


<script>
	import http from '../../common/request';
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			
			this.init()
		},
		methods: {
			init() {
				
			}
			
		}
	}
</script>

<style scoped lang="scss">
	
	
</style>