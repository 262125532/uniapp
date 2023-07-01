<template>
	<view>
		<canvas canvas-id="uchartColumn" id="uchartColumn" class="charts" @touchend="tap" />
	</view>
</template>

<script>
	import uCharts from './u-charts/u-charts.min.js';
	var uChartsInstance = {};
	export default {
		props: ['data'],
		data() {
			return {
				cWidth: 660,
				cHeight: 500,
				pixelRatio: 1
			};
		},
		mounted() {
			//这里的 660 对应 css .charts 的 width
			this.cWidth = uni.upx2px(660);
			//这里的 500 对应 css .charts 的 height
			this.cHeight = uni.upx2px(500);
			this.getServerData();
		},
		watch: {
			data() {
				this.getServerData();
			}
		},
		methods: {
			getServerData() {
				let max = 0;
				this.data.forEach(v => {
					if (max < v.number) {
						max = v.number;
					}
				})
				let res = {
					categories: this.data.map(v => v.date.substr(6)),
					series: [{
							name: "报警数量",
							data: this.data.map(v => v.number)
						},
						// {
						//   name: "完成量",
						//   data: [18,27,21,24,6,28]
						// }
					]
				};
				this.drawCharts('uchartColumn', res, max);
			},
			drawCharts(id, data, max) {
				const ctx = uni.createCanvasContext(id, this);
				uChartsInstance[id] = new uCharts({
					type: "column",
					context: ctx,
					width: this.cWidth,
					height: this.cHeight,
					categories: data.categories,
					series: data.series,
					animation: true,
					background: "#FFFFFF",
					color: ["#FFA4AC", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
						"#ea7ccc"
					],
					padding: [15, 15, 0, 5],
					enableScroll: false,
					dataLabel: false,
					legend: {
						show: false
					},
					dataLabel: false,
					xAxis: {
						disableGrid: true
					},
					yAxis: {
						showTitle: true,
						data: [{
							title: '数量',
							titleOffsetX: -10,
							min: 0,
							max: max,
							tofix: 1,
						}]
					},
					extra: {
						column: {
							type: "group",
							width: this.cWidth * this.pixelRatio * 0.3 / data.categories.length,
							activeBgColor: "#000000",
							activeBgOpacity: 0.08,
							// labelPosition: 'center'
						}
					}
				});
			},
			tap(e) {
				uChartsInstance[e.target.id].touchLegend(e);
				uChartsInstance[e.target.id].showToolTip(e);
			}
		}
	};
</script>

<style scoped>
	.charts {
		width: 660rpx;
		height: 500rpx;
	}
</style>