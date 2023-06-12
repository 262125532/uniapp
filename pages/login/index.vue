<template>
	<view class="content">
		<view class="header">
			<image class="logo" src ='../../static/img/logo-white.png'></image>
			<p class="title">你好 <br>欢迎来到智能作业监管APP！</p>
			<image class="product" src ='../../static/img/天玑铁甲卫士.png'></image>
		</view>
		
		<view class="form">
			<form @submit="formSubmit" @reset="formReset" >
				
				<view v-if="loginByPhone">
					<view class="uni-form-item input-box" >
						<!-- <view class="title">用户名</view> -->
						<input class="uni-input" name="username" v-model="telNumber" placeholder="手机号" />
					</view>
					<view class="uni-form-item input-box code-input">
						<!-- <view class="title">用户名</view> -->
						<input class="uni-input" name="username" v-model="phoneCode" placeholder="验证码" />
					</view>
					
					<view class="uni-flex uni-row">
						<view v-if="!timer" class="flex-item  get-code-btn" @click="getCode">
							获取验证码
						</view>
						<view v-if="timer" class="flex-item  get-code-btn">
							{{ seconds }}s
						</view>
					</view>
					
					
				</view>
				
				<view v-if="!loginByPhone">
					<view class="uni-form-item input-box" >
						<!-- <view class="title">用户名</view> -->
						<input class="uni-input" name="username" v-model="username" placeholder="用户名" />
					</view>
					<view class="uni-form-item input-box">
					    <!-- <view class="title">密码</view> -->
					    <view class="uni-input-wrapper">
					        <input class="uni-input" placeholder="密码" v-model="password" :password="showPassword" />
					        <!-- <text class="uni-icon" :class="[!showPassword ? 'uni-eye-active' : '']" @click="changePassword">&#xe568;</text> -->
					    </view>
					</view>
				</view>
				
				
				
				
				<view class="uni-btn-v">
					<!-- <button type="primary" form-type="submit">登录</button> -->
					<view class="submit-btn" @click="formSubmit">
						登录
					</view>
				</view>
				
				<view class="type">
					<view class="" v-if="!loginByPhone" @click="changeLoginType">验证码登录</view>
					<view class="" v-if="loginByPhone" @click="changeLoginType">密码登录</view>
					<view class="forget-pwd" @click="goto('/pages/my/changePwd')">
						忘记密码
					</view>
				</view>
				
				
				<view class="uni-form-item agreement">
					<checkbox-group @change="checkboxChange">
						<checkbox :value="checkbox" />登录即表明同意<text @click="show1">《用户服务协议》</text>和<text @click="show2">《用户隐私协议》</text>
					</checkbox-group>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	import http from '../../common/request';
	import JSEncrypt from '../../common/jsencrypt.min.js'
	export default {
		data() {
			return {
				username: '',
				password: '',
				phoneCode: '',
				telNumber: '',
				showPassword: true,
				checkbox: '0',
				loginByPhone: true,
				timer: null,
				seconds: 60,
			}
		},
		onLoad() {
			
		},
		watch: {
			seconds(newVal) {
				let that = this;
				console.log(newVal)
				if(newVal == 0) {
					clearInterval(that.timer)
					that.seconds = 60;
					that.timer= null;
				}
			}
		},
		methods: {
			goto(url) {
				uni.navigateTo({
					url:url
				})
			},
			getCode(){
				let that = this
				if( !that.telNumber ){
					uni.showToast({
						title: '请输入手机号',
						icon: 'none',
					});
					return false
				}else{
					http.get("phoneCode", "", that.telNumber).then(res => {
						console.log(22, res)
						if(res.code == 200) {
							uni.showToast({
								title: '验证码已发送',
								icon: 'none',
							});
							that.timer = setInterval(() => {
								that.seconds = that.seconds - 1
							}, 1000)
						}else {
							uni.showToast({
								title: res.msg,
								icon: 'none',
							});
						}
					})
				}
			},
			changeLoginType() {
				this.loginByPhone = !this.loginByPhone;
			},
			show1(){
				uni.showModal({
				    title: "用户服务协议",
				    content: "用户服务协议用户服务协议用户服务协议用户服务协议",
				    showCancel: false,
				    confirmText: "确定",
				    confirmColor: "#333",
				    success(res) {
				        if (res.confirm) {
				            // console.log('确认')                                   
				        }
				    }
				})
			},
			show2(){
				uni.showModal({
				    title: "用户隐私协议",
				    content: "用户隐私协议用户隐私协议用户隐私协议用户隐私协议用户隐私协议",
				    showCancel: false,
				    confirmText: "确定",
				    confirmColor: "#333",
				    success(res) {
				        if (res.confirm) {
				            // console.log('确认')                                   
				        }
				    }
				})
			},
			formSubmit: function(e) {
				// console.log('调用接口',this.username,this.password,e )
				let that = this;
				if(that.loginByPhone) {
					if( !that.telNumber ){
						uni.showToast({
							title: '请输入手机号',
							icon: 'none',
						});
						return false
					}
					if( !that.phoneCode ){
						uni.showToast({
							title: '请输入验证码',
							icon: 'none',
						});
						return false
					}
					
					if(that.checkbox == '0'){
						uni.showToast({
							title: '请勾选用户协议',
							icon: 'none',
						});
						return false
					}
					
					let data = {
						telNumber: that.telNumber,
						phoneCode: that.phoneCode,
					}
					
					http.post('loginByCode', data).then(res => {
						console.log('调用接口',res)
						if(res.code == 200) {
							// 存放token tenant
							uni.setStorageSync('Authorization', 'Bearer ' + res.data.access_token)
							uni.setStorageSync('tenant', res.data.tenant)
							uni.setStorageSync('username', res.data.username)
							uni.setStorageSync('telNumber', res.data.telNumber)
							uni.switchTab({
								url: '/pages/home/index'
							});
						}else{
							uni.showToast({
								title: res.msg,
								icon: 'none',
							});
						}
					})
					
					
				}else{
					if(!that.username ){
						uni.showToast({
							title: '请输入用户名',
							icon: 'none',
						});
						return false
					}
					if(!that.password ){
						uni.showToast({
							title: '请输入密码',
							icon: 'none',
						});
						return false
					}
					
					if(that.checkbox == '0'){
						uni.showToast({
							title: '请勾选用户协议',
							icon: 'none',
						});
						return false
					}
					
					
					// 加密过程
					var encrypt = new JSEncrypt();
					let publicKye = 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANL378k3RiZHWx5AfJqdH9xRNBmD9wGD2iRe41HdTNF8RUhNnHit5NpMNtGL0NPTSSpPjjI1kJfVorRvaQerUgkCAwEAAQ==';
					encrypt.setPublicKey(publicKye);	  
					// 公钥
					
					// let privateKey = `-----BEGIN PRIVATE KEY-----
					// MIIBUwIBADANBgkqhkiG9w0BAQEFAASCAT0wggE5AgEAAkEA0vfvyTdGJkdbHkB8mp0f3FE0GYP3AYPaJF7jUd1M0XxFSE2ceK3k2kw20YvQ09NJKk+OMjWQl9WitG9pB6tSCQIDAQABAkA2SimBrWC2/wvauBuYqjCFwLvYiRYqZKThUS3MZlebXJiLB+Ue/gUifAAKIg1avttUZsHBHrop4qfJCwAI0+YRAiEA+W3NK/RaXtnRqmoUUkb59zsZUBLpvZgQPfj1MhyHDz0CIQDYhsAhPJ3mgS64NbUZmGWuuNKp5coY2GIj/zYDMJp6vQIgUueLFXv/eZ1ekgz2Oi67MNCk5jeTF2BurZqNLR3MSmUCIFT3Q6uHMtsB9Eha4u7hS31tj1UWE+D+ADzp59MGnoftAiBeHT7gDMuqeJHPL4b+kC+gzV4FGTfhR9q3tTbklZkD2A==
					//  -----END PRIVATE KEY-----
					// `
					// var decrypt = new JSEncrypt();
					// decrypt.setPrivateKey(privateKey);
					// let decryption = decrypt.decrypt(encrypt.encrypt("Sany@test3"));
					
					let data = {
						username: that.username,
						password: encrypt.encrypt(that.password),
						checkCaptcha: false
					}
					// console.log(encrypt.encrypt("123456"))
					// uni.switchTab({
					// 	url: '/pages/index/index'
					// });
					// return false
					
					http.post('login', data).then(res => {
						console.log('调用接口',res)
						if(res.code == 200) {
							// 存放token tenant
							uni.setStorageSync('Authorization', 'Bearer ' + res.data.access_token)
							uni.setStorageSync('tenant', res.data.tenant)
							uni.setStorageSync('username', res.data.username)
							uni.setStorageSync('telNumber', res.data.telNumber)
							uni.switchTab({
								url: '/pages/home/index'
							});
						}else{
							uni.showToast({
								title: res.msg,
								icon: 'none',
							});
						}
					})
					
					
				}
				
			},
			formReset: function(e) {
				this.username = ''
				this.password = ''
			},
			changePassword: function() {
			    this.showPassword = !this.showPassword;
			},
			checkboxChange(e){
				if(e.detail.value && e.detail.value[0]){
					this.checkbox = '1'
				}else{
					this.checkbox = '0'
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		// height: 100vh;
		// background: linear-gradient(180deg, #F0F8FF 100%, #FFFFFF 100%);
	}
	.header{
		background: url("../../static/img/login-bg.png") no-repeat;
		padding-top: 40rpx;
	}
	.logo{
		width: 250rpx;
		height: 64rpx;
		margin: 80rpx auto 32rpx auto;
		display: block;
	}
	.product{
		width: 240rpx;
		height: 136rpx;
		margin: 24rpx auto 32rpx auto;
		display: block;
		
	}
	.form{
		margin: 100rpx 32rpx 0 32rpx;
		
	}
	.submit-btn{
		height: 96rpx;
		line-height: 96rpx;
		background-color: #3370FF;
		border-radius: 16rpx;
		text-align: center;
		font-size: 32rpx;
		font-weight: bold;
		color: #fff;
		margin-top: 48rpx;
	}
	.title{
		text-align: center;
		font-size: 28rpx;
		color: #fff;
	}
	.uni-form-item{
		/* margin: 0 10rpx; */
	}
	.input-box{
		border-top: none !important;
		border-left: none !important;
		border-right:none !important;
		display: block;
		align-items: center;
		height: 80rpx;
		border: 1px solid #eee;
	}
	.uni-input{
		// height: 100%;
		// background: #f00;
		// margin: 5rpx 20rpx;
		// padding: 25rpx 30rpx;
		
	}
	.uni-input-wrapper {
		position: relative;
	}
	.code{
		
		
	}
	.code-input{
		width: 60%;
		float: left;
	}
	.get-code-btn{
		// width: 30%;
		height: 80rpx;
		line-height: 80rpx;
		float: right;
		color: #3370FF;
		margin: 10rpx 0;
		font-size: 32rpx;
		text-align: center;
		flex: 1;
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
	.uni-eye-active {
	    color: #3370FF;
	}
	.agreement{
		font-size: 24rpx;
		text{
			color: #3370FF;
		}
	}
	
	::v-deep .uni-checkbox-input{
		transform:scale(0.7) !important;
		border-radius: 50% !important;
	}
	/* #ifdef MP-WEIXIN */
	.uni-btn-v{
		.uni-button{
			background: #3370FF!important;
		}
	}

	/* #endif */
	::v-deep .uni-checkbox-input-checked{
		color: #fff !important;
		background-color: rgb(0, 122, 255) !important;
	}
	.uni-btn-v{
		.uni-button{
			background: #3370FF!important;
		}
		
	}
	
	.type{
		width: 100%;
		margin: 30rpx 0 60rpx 0;
		color: rgba(0,0,0,0.6);
		font-size: 28rpx;
		position: relative;
	}
	
	.forget-pwd{
		color: rgba(0,0,0,0.6);
		text-align: right;
		position: absolute;
		right: 0rpx;
		top: 0rpx;
		
	}
	

</style>
