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
	getCarType: '/iot-common-device-tenant/api/nebula/device/machine/v1',
	carBrand: '/iot-common-device-tenant/api/nebula/device/brand/v1',
	org: '/iot-common-device-tenant/api/nebula/device/area/v1',
	updateCar: '/iot-common-device-tenant/api/nebula/device/aiot/updateXtSensorDevice/v2',
	countByStatus: '/iot-xingtu20-service-tenant/intelligent/countByStatus',
	dayHourTop5: '/iot-xingtu20-service-tenant/app/worktime/car/top5',
	weekHourStatistic: '/iot-xingtu20-service-tenant/app/worktime/customer/statistic/week',
	getCarList1: '/iot-xingtu20-service-tenant/intelligent/tree',
	getCarList: '/iot-xingtu20-service-tenant/intelligent/treePage',//车辆列表--带分页和车辆图片
	dayHourStatistic: '/iot-xingtu20-service-tenant/app/worktime/customer/statistic',
	weekHourTop5: '/iot-xingtu20-service-tenant/app/worktime/car/top5_week',
	dayAlarm: '/iot-xingtu20-service-tenant/intelligent/count/today/fenceAlarms',
	weekAlarmByDay: '/iot-xingtu20-service-tenant/intelligent/count/week/fenceAlarms/byDay',
	weekAlarmByMessage: '/iot-xingtu20-service-tenant/intelligent/count/week/fenceAlarms/byMessage',
	weekAlarmTop5: '/iot-xingtu20-service-tenant/intelligent/count/week/fenceAlarms/top5',
	deviceAlarmList: '/iot-xingtu20-service-tenant/intelligent/deviceAlarm/list',
	fenceList: '/iot-common-device-tenant/api/nebula/startway/fence/v1/listFence',
	carListInFence: '/iot-common-device-tenant/api/nebula/startway/fence/v1/listVehicle'
	
	
}