//定义基本的urlconst baseUrl= 'http://www.lhdtest.com';/**使用条件编译获取平台信息*/
let baseUrl= '';
// 测试环境 development
if(process.env.NODE_ENV == "development"){
	baseUrl= 'https://ifarm.lovol.com/testapi/';
}
// 生产环境 production
else{
	baseUrl= 'https://ifarm.lovol.com/api/';
}
function ifDefPlatform() {
	let platform = ""
	//App
	//#ifdef APP-PLUS
	platform = 'APP-PLUS'
	//#endif
	
	//App nvue
	//#ifdef APP-PLUS-NVUE
	platform = 'APP-PLUS-NVUE'
	//#endif
	
	//H5
	//#ifdef H5
	platform = 'H5'
	//#endif
	
	//微信小程序
	//#ifdef MP-WEIXIN
	platform = 'MP-WEIXIN'
	//#endif
	
	//支付宝小程序
	//#ifdef MP-ALIPAY
	platform = 'MP-ALIPAY'
	//#endif
	
	//百度小程序
	//#ifdef MP-BAIDU
	platform = 'MP-BAIDU'
	//#endif
	
	//字节跳动小程序
	//#ifdef MP-TOUTIAO
	platform = 'MP-TOUTIAO'
	//#endif
	
	//飞书小程序
	//#ifdef MP-LARK
	platform = 'MP-LARK'
	//#endif
	
	//QQ小程序
	//#ifdef MP-QQ
	platform = 'MP-QQ'
	//#endif
	
	//快手小程序
	//#ifdef MP-KUAISHOU
	platform = 'MP-KUAISHOU'
	//#endif
	
	//360小程序
	//#ifdef MP-360
	platform = 'MP-360'
	//#endif
	
	//微信小程序/支付宝小程序/百度小程序/字节跳动小程序/飞书小程序/QQ小程序/快手小程序/360小程序
	// //#ifdef MP
	// platform = 'MP'
	// //#endif
	
	//快应用通用(包含联盟、华为)
	//#ifdef QUICKAPP-WEBVIEW
	platform = 'QUICKAPP-WEBVIEW'
	//#endif
	
	//快应用联盟
	//#ifdef QUICKAPP-WEBVIEW-UNION
	platform = 'QUICKAPP-WEBVIEW-UNION'
	//#endif
	
	//快应用华为
	//#ifdef QUICKAPP-WEBVIEW-HUAWEI
	platform = 'QUICKAPP-WEBVIEW-HUAWEI'
	//#endif
	
	return platform
}
//通过env和平台得到最终的url,因为h5开发时要配置跨域
// function getUrlByEnvPlatform(env, platform, url) {
// 	let destUrl = "";
// 	if (env === 'development' && platform === 'H5') {
// 		console.log('h5开发环境');
// 		destUrl = baseUrl + url;
// 	} else {
// 		destUrl = baseUrl + url;
// 	}
// 	return destUrl;
// }

export const platform = {
	baseUrl,
	ifDefPlatform,
	// getUrlByEnvPlatform,
}