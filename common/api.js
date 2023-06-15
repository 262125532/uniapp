export default {
    // 登录接口
    login: "/iot-common-auth-tenant/api/nebula/auth/token/v1/login",
	phoneCode: "/iot-common-auth-tenant/api/nebula/auth/token/v1/phoneCode/",
	getTree: "/iot-xingtu20-service-tenant/intelligent/tree?areaId=1",
	resetByCode: "/iot-common-auth-tenant/api/nebula/auth/admin/v1/user/password/resetByCode",
	loginByCode: "/iot-common-auth-tenant/api/nebula/auth/token/v1/loginByCode",
	unActiveCarList: "/iot-common-device-tenant/api/nebula/device/aiot/devices/vehicle/v1",
	// carDetail: '/iot-xingtu20-service-tenant/car/operation/',
	buzzerList:'/iot-common-device-tenant/api/nebula/device/aiot/devices/terminal/v1/list',
	resetBuzzer: '/iot-common-device-tenant/api/nebula/device/aiot/cmd/update/smartJob/v2',
	appfind: '/iot-xingtu20-service-tenant/alarm/sendMessage/config/appfind',
	appsave : '/iot-xingtu20-service-tenant/alarm/sendMessage/config/appsave',
	carDetail: "/iot-common-auth-tenant/api/nebula/auth/menu/v1/check/",
	getCarImage: '/iot-common-device-tenant/api/nebula/device/machine/v1'
	
	
}