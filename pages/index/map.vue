<template>
	<view class="content">
		<map
			id="myMap"
			ref="myMap"
			:markers="markers"
			:polyline="polyline"
			scale = "16"
			:latitude="polyline[0].points[0].latitude"
			:longitude="polyline[0].points[0].longitude"
			style="width: 100%; height: calc(100vh - 90px)"
		/>
		<view class="hcp-bottom">
			<button v-if="startMove" @click="handleStopMove()">暂停移动</button>
			<button v-else @click="handleStartMove()">开始移动</button>
		</view>
	</view>
</template>

<script>
	import navBar from "../../components/navBar";
	export default {
		data() {
			return {
				mapContext: null,			//地图对象
				startMove: false,			//是否开始回放
				nextPointIndex: 1,		//下一个坐标点的索引
				durationTime: 1000,		//相邻两点动画持续时长默认1秒
				//路线信息
				polyline: [
					{
						width: 8,
						points: [],
						arrowLine: true,
						color: '#3591FC',
					}
				],
				//标记点(即移动标记物)
				markers: [
					{
						id: 1,
						width: 40,
						height: 40,
						latitude: 0,
						longitude: 0,
						iconPath: '../../static/tabbar/car_active.png',
						anchor: {
							x: 0.5,
							y: 1
						}
					}
				]
			}
		},
		onLoad() {
			this.getTrack()		//获取轨迹信息(只做演示，未进行远程请求)
		},
		methods: {
			//模拟获取远程数据
			getTrack() {
				this.polyline[0].points = [
					{latitude: 39.997761, longitude: 116.478935},
					{latitude: 39.997825, longitude: 116.478939},
					{latitude: 39.998549, longitude: 116.478912},
					{latitude: 39.998555, longitude: 116.478998},
					{latitude: 39.998566, longitude: 116.479282},
					{latitude: 39.998528, longitude: 116.479658},
					{latitude: 39.998453, longitude: 116.480151},
					{latitude: 39.998302, longitude: 116.480784},
					{latitude: 39.998184, longitude: 116.481149},
					{latitude: 39.997997, longitude: 116.481573},
					{latitude: 39.997846, longitude: 116.481863},
					{latitude: 39.997718, longitude: 116.482072},
					{latitude: 39.997718, longitude: 116.482362},
					{latitude: 39.998935, longitude: 116.483633},
					{latitude: 39.998968, longitude: 116.48367},
					{latitude: 39.999861, longitude: 116.484648}
				]
				this.durationTime = Math.ceil(30000 / this.polyline[0].points.length)	//默认播放全程使用30秒，计算相连两点动画时长
				this.initMapData()
			},
			//设置地图
			initMapData() {
				this.initMarkers()
				this.mapContext = uni.createMapContext('myMap', this)
			},
			//设置位置（从起点开始）
			initMarkers() {
				this.markers[0].latitude = this.polyline[0].points[0].latitude
				this.markers[0].longitude = this.polyline[0].points[0].longitude
			},
			//开始移动
			handleStartMove() {
				this.startMove = true
				this.movePoint()
			},
			//停止移动
			handleStopMove() {
				this.startMove = false
			},
			//移动坐标
			movePoint() {
				/*
				//也可以用这个方法
				this.mapContext.moveAlong({
					duration: 30000,
					markerId: this.markers[0].id,
					path: this.polyline[0].points
				})
				return
				*/
		
				
		
				console.log(111,this.durationTime,this.markers[0].id)
				console.log(111,this.polyline[0].points[this.nextPointIndex].latitude,this.polyline[0].points[this.nextPointIndex].longitude)
				this.mapContext.translateMarker({
				    markerId: 1,
				    destination: {
				        latitude: 39.989631,
				        longitude: 116.481018
				    },
				    duration: 2000
				}, ret => {
				    console.log(JSON.stringify(ret));
				    uni.showModal({
				        content: JSON.stringify(ret)
				    })
				});
				// this.mapContext.translateMarker({
				// 	duration: this.durationTime,
				// 	markerId: this.markers[0].id,
				// 	destination: {
				// 		latitude: this.polyline[0].points[this.nextPointIndex].latitude,
				// 		longitude: this.polyline[0].points[this.nextPointIndex].longitude
				// 	},
				// 	animationEnd: res => {
				// 		console.log(222)
				// 		//播放结束，继续移动到下一个点，最后一个点时结束移动
				// 		if (this.nextPointIndex < this.polyline[0].points.length - 1) {
				// 			this.nextPointIndex++
				// 			if (this.startMove) {
				// 				this.movePoint()
				// 			}
				// 		} else {
				// 			this.nextPointIndex = 1
				// 			this.startMove = false
				// 		}
				// 	}
				// })
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	map {
		width: 100%;
		height: 600rpx;
	}
</style>
