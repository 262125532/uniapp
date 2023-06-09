import api from './api.js'
import {platform} from './platform.js';
const baseUrl = platform.baseUrl
export default {
	post: (url, data) => {
		let Authorization = uni.getStorageSync('Authorization');
		let tenant = uni.getStorageSync('tenant');
		// 登录接口不需要Authorization
		if(url == 'login'){
			Authorization = ''
		}
		return new Promise((resolve, reject) => {
			uni.request({
				url: baseUrl + api[url],
				data: data,
				method: 'POST',
				header: {
					Authorization: Authorization,
					tenant: tenant,
					clientld: 'xingtu2-app',
					secret: 's24aef87dfd80094ed687435e4b324e39',
					deviceType: 2
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
	get: (url, data) => {
		let Authorization = uni.getStorageSync('Authorization');
		let tenant = uni.getStorageSync('tenant');
		return new Promise((resolve, reject) => {
			uni.request({
				url: baseUrl + api[url],
				data: data,
				method: 'GET',
				header: {
					Authorization: Authorization,
					tenant: tenant,
					clientld: 'xingtu2-app',
					secret: 's24aef87dfd80094ed687435e4b324e39',
					deviceType: 2
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