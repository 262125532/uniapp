import api from './api.js'
import {platform} from './platform.js';
const baseUrl = platform.baseUrl
export default {
	post: (url, data, clt) => {
		let Authorization = uni.getStorageSync('Authorization');
		let tenant = uni.getStorageSync('tenant');
		uni.showLoading({
			title: '加载中...',
		})
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
					uni.hideLoading();
					clt && clt()
				}
			})
		})
	},
	get: (url, data, clt) => {
		uni.showLoading({
			title: '加载中...',
		})
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
					uni.hideLoading();
					clt && clt()
				}
			})
		})
	}
}