import api from './api.js'
import {platform} from './platform.js';
const baseUrl = platform.baseUrl
export default {
	post: (url, data, clt) => {
		let Authorization = uni.getStorageSync('Authorization');
		let tenant = uni.getStorageSync('tenant');
		// 登录接口不需要Authorization
		if(url == 'login'){
			Authorization = ''
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
					clt && clt()
				}
			})
		})
	},
	get: (url, data, clt) => {
		return new Promise((resolve, reject) => {
			uni.request({
				url: baseUrl + api[url],
				data: data,
				method: 'GET',
				success: res => {
					resolve(res.data)
				},
				fail: err => {
					reject(err)
				},
				complete: () => {
					clt && clt()
				}
			})
		})
	}
}