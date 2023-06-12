import api from './api.js'
import {platform} from './platform.js';
const baseUrl = platform.baseUrl
export default {
	post: (url, data) => {
		let Authorization = uni.getStorageSync('Authorization');
		let tenant = uni.getStorageSync('tenant');
		// 登录接口不需要Authorization
		if(url == 'login' || url == 'loginByCode' || 'resetByCode'){
			Authorization = ''
			tenant = ''
		}
		console.log('baseUrl:', baseUrl)
		return new Promise((resolve, reject) => {
			uni.request({
				url: baseUrl + api[url],
				data: data,
				method: 'POST',
				header: {
					Authorization: Authorization,
					tenant: tenant,
					clientId: 'xingtu2-app',
					secret: 's24aef87dfd80094ed687435e4b324e39',
					deviceType: 0,
				},
				success: res => {
					resolve(res.data)
				},
				fail: err => {
					reject(err)
				},
				complete: () => {
					
				}
			})
		})
	},
	put: (url, data) => {
		let Authorization = uni.getStorageSync('Authorization');
		let tenant = uni.getStorageSync('tenant');
		// 登录接口不需要Authorization
		if('resetByCode'){
			Authorization = ''
			tenant = ''
		}
		return new Promise((resolve, reject) => {
			uni.request({
				url: baseUrl + api[url],
				data: data,
				method: 'PUT',
				header: {
					Authorization: Authorization,
					tenant: tenant,
					clientId: 'xingtu2-app',
					secret: 's24aef87dfd80094ed687435e4b324e39',
					deviceType: 0,
				},
				success: res => {
					resolve(res.data)
				},
				fail: err => {
					reject(err)
				},
				complete: () => {
					
				}
			})
		})
	},
	get: (url, data, joinPath) => {
		let Authorization = uni.getStorageSync('Authorization');
		let tenant = uni.getStorageSync('tenant');
		return new Promise((resolve, reject) => {
			uni.request({
				url: baseUrl + api[url] + joinPath,
				data: data,
				method: 'GET',
				header: {
					Authorization: Authorization,
					tenant: tenant,
					clientId: 'xingtu2-app',
					secret: 's24aef87dfd80094ed687435e4b324e39',
					deviceType: 0
				},
				success: res => {
					resolve(res.data)
				},
				fail: err => {
					reject(err)
				},
				complete: () => {
					
				}
			})
		})
	}
}