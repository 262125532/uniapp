# uniapp
打包安卓、ios、微信小程序、飞书小程序

目录结构说明：

	common（api接口、调用接口封装、平台判断）
	components（公共组件）
	pages（页面位置）
	static（公共资源文件，除了底部菜单，其他建议放到网上，比如图片）
	uni_modules（ui组件）
	unpackage（打包后的文件夹，去里面找对应的打包文件）
	main.js（全局配置）
	App.vue（全局页面）
	pages.json（路由配置、bar配置）
	manifest.json（平台配置）


注意语法：

一、平台判断

	解析
	#ifdef ： if defined 仅在某个平台编译
	#ifndef ： if not defined 在除该平台其他平台的编译，于上面相反
	#endif ： end if 结束条件编译

	1.html中使用
	<!-- #ifdef H5 -->
	这句话只有在H5能看到<br>
	<!-- #endif -->
	
	2.js中使用
	// #ifdef H5
	console.log('这句话只有在H5能看到')
	// #endif

	3.css中使用
	/* #ifdef H5 */
	width: 580rpx;
	/* #endif */

二、判断环境

	js引入：import {platform} from '../../common/platform.js';
	不同环境判断域名：platform.baseUrl
	不同环境判断平台：platform.ifDefPlatform()
	判断测试环境和生产环境：process.env.NODE_ENV

三、调用接口封装

	js引入：import http from '../../common/request';
	http.post('login', data).then(res => {
		console.log('调用接口')
		if(res){
			
		}
	})
	
四、引入高德地图

	<map :latitude="latitude" :longitude="longitude" :markers="covers"></map>
	
五、底部和顶部配置

	pages.json
	
	style里面添加："navigationStyle": "custom"
	让顶部bar去掉
	
	navigationBarBackgroundColor	HexColor	#000000	导航栏背景颜色（同状态栏背景色）
	navigationBarTextStyle	String	white	导航栏标题颜色及状态栏前景颜色，仅支持 black/white
	navigationBarTitleText	String		导航栏标题文字内容
	navigationBarShadow	Object		导航栏阴影
	navigationStyle	String	default	导航栏样式，仅支持 default/custom。custom即取消默认的原生导航栏
	backgroundColor	HexColor	#ffffff	窗口的背景色
	backgroundTextStyle	String	dark	下拉 loading 的样式，仅支持 dark/light
	enablePullDownRefresh	Boolean	false	是否开启下拉刷新
	onReachBottomDistance	Number	50	页面上拉触底事件触发时距页面底部距离，单位只支持px
	
六、ui组件

	1.ui地址：https://uniapp.dcloud.net.cn/component/button.html
	2.ui示例：https://hellouniapp.dcloud.net.cn/pages/component/button/button
	3.树形选择器增强版，支持多选、单选、父级选择，Picker形式：
		https://ext.dcloud.net.cn/plugin?id=702
	
七、其他语法

	//跳转新页面，并传递数据
	uni.navigateTo({
		url: 'new-page/new-vue-page-1?data=Hello'
	})
	//返回上一页
	uni.navigateBack();
	//在当前页面打开
	uni.redirectTo({
		url: 'new-page/new-vue-page-1'
	});
	//切换到模板选项卡
	uni.switchTab({
		url: '/pages/tabBar/template/template'
	});
	//关闭所有页面，打开首页
	uni.reLaunch({
		url: '/pages/tabBar/component/component'
	});