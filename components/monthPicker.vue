<template>
	<view class="month-picker">
		<!-- #ifndef MP-ALIPAY -->
		<picker mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :value="multiIndex"
			:range="multiArray">
			<view class="uni-input">
				{{multiArray[0][multiIndex[0]]}}
				{{multiArray[1][multiIndex[1]]}}
				<image class="icon" src="../static/img/right.png" alt=""></image>
			</view>

		</picker>
		<!-- #endif -->
	</view>
</template>
<script>
	export default {
		data() {
			return {
				multiArray: [
					['2022年', '2023年'],
					['1月', '2月', '3月'],
				],
				multiIndex: [0, 0],
			}
		},
		methods: {
			bindMultiPickerColumnChange: function(e) {
				console.log('修改的列为：' + e.detail.column + '，值为：' + e.detail.value)
				this.multiIndex[e.detail.column] = e.detail.value
				switch (e.detail.column) {
					case 0: //拖动第1列
						switch (this.multiIndex[0]) {
							case 0:
								this.multiArray[1] = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月',
									'11月', '12月'
								]
								break
							case 1:
								this.multiArray[1] = ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
								break
						}
						this.multiIndex.splice(1, 1)
						this.multiIndex.splice(2, 1)
						break

				}
				this.$forceUpdate()
				console.log(this.multiArray[0][this.multiIndex[0]])
				console.log(this.multiArray[1][this.multiIndex[1]])
			},
		}
	}
</script>

<style scoped lang="scss">
	.month-picker {
		font-size: 28rpx;
		.icon {
			width: 28rpx;
			height: 28rpx;
			transform: rotate(90deg);
			vertical-align: sub;
			margin-left: 10rpx;
		}
	}
</style>