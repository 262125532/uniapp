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
		return new Promise((resolve, reject) => {
			uni.request({
				url: baseUrl + api[url],
				data: data,
				method: 'POST',
				header: {
					Authorization: Authorization,
					tenant: tenant,
					clientld: 'industrial-vision',
					secret: 'ec8890a8d81b6bc275eaa1d006dc7c8c',
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