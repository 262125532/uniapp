<template>
	<view class="content">
		<navBar :navBar="navBar" />
		<view class="tip">
			密码长度8-20位，且必须包含数字、大写
		</view>
		<view class="form">
			<form>
				<view class="uni-form-item input-box">
					<!-- <view class="title">手机号</view> -->
					<input class="uni-input" name="telNumber" type="number" v-model="telNumber" placeholder="手机号" />
				</view>
				<view class="code">
					<view class="uni-form-item input-box code-input">
						<!-- <view class="title">验证码</view> -->
						<input class="uni-input" name="phoneCode" type="number" v-model="phoneCode" placeholder="验证码" />
					</view>

					<view v-if="!timer" class="get-code-btn" @click="getCode">
						获取验证码
					</view>
					<view v-if="timer" class="get-code-btn">
						{{ seconds }}s
					</view>
				</view>
				<view class="uni-form-item input-box">
					<!-- <view class="title">密码</view> -->
					<input class="uni-input" name="password" v-model="password" placeholder="密码" />
				</view>
			</form>

		</view>
		<view :class="isOK?'submit-btn submit-btn-ok':'submit-btn'" @click="formSubmit">
			完成
		</view>


	</view>
</template>

<script>
	import http from '../../common/request';
	import JSEncrypt from '../../common/jsencrypt.min.js'
	import navBar from "../../components/navBar";
	export default {
		data() {
			return {
				phoneCode: '',
				telNumber: '',
				password: '',
				timer: null,
				seconds: 60,
				navBar: {
					bgcolor: '#FFFFFF', //导航背景颜色，不传默认#F8F8F8
					back: true, //回退箭头，不传默认true
					backcolor: '#333', //回退箭头颜色，不传默认#333
					previousText: '', //回退提示，不传默认直接回退
					title: "修改密码", //本页标题，必传
					titlecolor: '#333', //本页标题颜色，不传默认#333
				},
			}
		},
		components: {
			navBar
		},
		onLoad() {

		},
		computed: {
			isOK() {
				return this.phoneCode && this.telNumber && this.password
			}
		},
		watch: {
			seconds(newVal) {
				let that = this;
				if (newVal == 0) {
					clearInterval(that.timer)
					that.seconds = 60;
					that.timer = null;
				}
			}
		},
		methods: {
			handleBack() {
				uni.navigateBack();
			},
			getCode() {
				let that = this
				if (!that.telNumber) {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none',
					});
					return false
				} else {

					http.get("phoneCode", "", that.telNumber).then(res => {
						if (res.code == 200) {
							uni.showToast({
								title: '验证码已发送',
								icon: 'none',
							});

							that.timer = setInterval(() => {
								that.seconds = that.seconds - 1
							}, 1000)

						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none',
							});
						}
					})
				}
			},
			formSubmit: function(e) {
				let that = this;
				// if(!that.isOK){
				// 	return false
				// }

				if (!that.telNumber) {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none',
					});
					return false
				}
				if (!that.phoneCode) {
					uni.showToast({
						title: '请输入验证码',
						icon: 'none',
					});
					return false
				}

				if (!that.password) {
					uni.showToast({
						title: '请输入密码',
						icon: 'none',
					});
					return false
				}

				var encrypt = new JSEncrypt();
				let publicKye =
					'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANL378k3RiZHWx5AfJqdH9xRNBmD9wGD2iRe41HdTNF8RUhNnHit5NpMNtGL0NPTSSpPjjI1kJfVorRvaQerUgkCAwEAAQ==';
				encrypt.setPublicKey(publicKye);

				let data = {
					telNumber: that.telNumber,
					phoneCode: that.phoneCode,
					password: encrypt.encrypt(that.password)
				}

				http.put('resetByCode', data).then(res => {
					if (res.code == 200) {
						uni.showToast({
							title: res.msg || '操作成功',
							icon: 'none',
						});
						uni.navigateBack();
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
						});
					}
				})
			},
			formReset: function(e) {
				this.username = ''
				this.password = ''
			},
			changePassword: function() {
				this.showPassword = !this.showPassword;
			},
			checkboxChange(e) {
				if (e.detail.value && e.detail.value[0]) {
					this.checkbox = '1'
				} else {
					this.checkbox = '0'
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		height: calc(100vh - 40rpx);
		padding-top: 40rpx;
		background: #fff;
		position: relative;
	}

	.form {
		margin: 0 32rpx;

	}

	.input-box {
		border-top: none !important;
		border-left: none !important;
		border-right: none !important;
	}

	.tip {
		padding: 30rpx 24rpx;
		background-color: rgba(51, 112, 255, 0.16);
		color: #3370FF;
		font-size: 22rpx;

	}

	.uni-form-item {
		/* margin: 0 10rpx; */
	}

	.input-box {
		display: block;
		align-items: center;
		height: 80rpx;
		border: 1px solid #eee;
		margin: 10rpx 0;
	}

	.uni-input {
		// height: 100%;
		// background: #f00;
		// margin: 5rpx 20rpx;
		// padding: 25rpx 30rpx;

	}

	.uni-input-wrapper {
		position: relative;
	}

	.code {
		height: 100rpx;


	}

	.code-input {
		width: 60%;
		float: left;
		margin: 0;

	}

	.get-code-btn {
		width: 30%;
		height: 80rpx;
		line-height: 80rpx;
		float: right;
		color: #3370FF;
		margin: 10rpx 0;
		font-size: 32rpx;
	}

	.uni-icon {
		font-family: uniicons;
		font-size: 48rpx;
		font-weight: normal;
		font-style: normal;
		width: 48rpx;
		height: 48rpx;
		line-height: 48rpx;
		color: #999999;
		position: absolute;
		right: 30rpx;
		top: 20rpx;
	}

	.submit-btn {
		text-align: center;
		position: absolute;
		right: 50rpx;
		left: 50rpx;
		top: 800rpx;
		font-size: 32rpx;
		height: 96rpx;
		line-height: 96rpx;
		background-color: #3370FF;
		border-radius: 16rpx;
		text-align: center;
		font-size: 32rpx;
		font-weight: bold;
		color: #fff;
	}

	.submit-btn-ok {
		background-color: #3370FF;
		color: #fff;

	}

	.text {
		font-size: 24rpx;

		text {
			color: #007AFF;
		}
	}

	/* #ifdef MP-WEIXIN */
	.uni-btn-v {
		margin: 0 32rpx;

		.uni-button {
			background: #3370FF !important;
		}
	}

	/* #endif */
	.uni-btn-v {
		margin: 0 32rpx;

		.uni-button {
			background: #3370FF !important;
		}

	}
</style>