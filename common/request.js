import api from './api.js'
import {platform} from './platform.js';
const baseUrl = platform.baseUrl
export default {
	postAxios: (url, data, clt) => {
		uni.showLoading({
			title: '加载中...',
		})
		let obj = {
			header: {
				token: wx.getStorageSync('token') || '',
				ua: {
					platform: 'MINI_PROGRAMS'
				}
			},
			body: data
		}
		return new Promise((resolve, reject) => {
			uni.request({
				url: baseUrl + api[url],
				data: obj,
				method: 'POST',
				success: res => {
					let result = {
						...res.data.header,
						...res.data.body
					}
					resolve(result)
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
	getAxios: (url, data, clt) => {
		uni.showLoading({
			title: '加载中...',
		})
		let params = [];
		Object.keys(data).forEach(key => {
			params.push(key + '=' + data[key])
		})
		return new Promise((resolve, reject) => {
			uni.request({
				url: baseUrl + api[url] + '?' + params.join("&"),
				data,
				success: res => {
					if (res.data.header.responseCode == 0) {
						resolve(res.data.body)
					} else {
						reject(res.data)
					}
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