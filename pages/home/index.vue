<template>
		<view class="home">
			首页
			<navigator url="/pages/index/index">
				<button type="default">跳转头部案例</button>
			</navigator>
			<view class="qiun-columns">
				<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
					<view class="qiun-title-dot-light">堆叠柱状图</view>
				</view>
				<view class="qiun-charts" >
					<canvas canvas-id="canvasColumnStack" id="canvasColumnStack" class="charts"  @touchstart="touchColumn"></canvas>
				</view>
			</view>
		</view>
</template>


<script>
	import http from '../../common/request';
	import uCharts from '../../components/u-charts/u-charts.js';
	var _self;
	var canvaColumn=null;
	export default {
		data() {
			return {
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				serverData:'',
			}
		},
		onLoad() {
			this.init()
			_self = this;
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(500);
			this.getServerData();
		},
		onReady() {
			this.getServerData();
		},
		methods: {
			init() {
				
			},
			getServerData(){
				let ColumnStack = {
				  "categories": ["2013", "2014", "2015", "2016", "2017", "2018"],
				  "series": [{
				    "name": "类别一",
				    "data": [35, 36, 31, 33, 13, 34]
				  }, {
				    "name": "类别二",
				    "data": [18, 27, 21, 24, 6, 28]
				  }, {
				    "name": "类别三",
				    "data": [18, 27, 21, 24, 6, 28]
				  }]
				}
				_self.showColumnStack("canvasColumnStack",ColumnStack);
				// uni.request({
				// 	url: 'https://www.easy-mock.com/mock/5cc586b64fc5576cba3d647b/uni-wx-charts/chartsdata2',
				// 	data:{
				// 	},
				// 	success: function(res) {
				// 		console.log(res.data.data)
				// 		//下面这个根据需要保存后台数据，我是为了模拟更新柱状图，所以存下来了
				// 		_self.serverData=res.data.data;
				// 		let ColumnStack={categories:[],series:[]};
				// 		//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
				// 		ColumnStack.categories=res.data.data.ColumnStack.categories;
				// 		ColumnStack.series=res.data.data.ColumnStack.series;
				// 		_self.showColumnStack("canvasColumnStack",ColumnStack);
				// 	},
				// 	fail: () => {
				// 		_self.tips="网络错误，小程序端请检查合法域名";
				// 	},
				// });
			},
			showColumnStack(canvasId,chartData){
				canvaColumn=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'column',
					legend:true,
					fontSize:11,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					animation: true,
					categories: chartData.categories,
					series: chartData.series,
					xAxis: {
						disableGrid:true,
					},
					yAxis: {
						//disabled:true
					},
					dataLabel: true,
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						column: {
							type:'stack',
							width: _self.cWidth*_self.pixelRatio*0.5/chartData.categories.length
						}
					  }
				});
			},
			touchColumn(e){
				canvaColumn.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
			},
			
		}
	}
</script>

<style scoped lang="scss">
	page{background:#F2F2F2;width: 750upx;overflow-x: hidden;}
	.qiun-padding{padding:2%; width:96%;}
	.qiun-wrap{display:flex; flex-wrap:wrap;}
	.qiun-rows{display:flex; flex-direction:row !important;}
	.qiun-columns{display:flex; flex-direction:column !important;}
	.qiun-common-mt{margin-top:10upx;}
	.qiun-bg-white{background:#FFFFFF;}
	.qiun-title-bar{width:96%; padding:10upx 2%; flex-wrap:nowrap;}
	.qiun-title-dot-light{border-left: 10upx solid #0ea391; padding-left: 10upx; font-size: 32upx;color: #000000}
	.qiun-charts{width: 750upx; height:500upx;background-color: #FFFFFF;}
	.charts{width: 750upx; height:500upx;background-color: #FFFFFF;}
</style>