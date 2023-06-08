<template>
	<view class="content">
		<p class="p">您好， 欢迎来到智慧管理APP！</p>
		<form @submit="formSubmit" @reset="formReset">
			<view class="uni-form-item input-box">
				<!-- <view class="title">用户名</view> -->
				<input class="uni-input" name="username" v-model="username" placeholder="用户名" />
			</view>
			<view class="uni-form-item input-box">
			    <!-- <view class="title">密码</view> -->
			    <view class="uni-input-wrapper">
			        <input class="uni-input" placeholder="密码" v-model="password" :password="showPassword" />
			        <text class="uni-icon" :class="[!showPassword ? 'uni-eye-active' : '']" @click="changePassword">&#xe568;</text>
			    </view>
			</view>
			<view class="uni-form-item text">
				<checkbox-group @change="checkboxChange">
					<checkbox :value="checkbox" />登录即表明同意<text @click="show1">《用户服务协议》</text>和<text @click="show2">《用户隐私协议》</text>
				</checkbox-group>
			</view>
			<view class="uni-btn-v">
				<button type="primary" form-type="submit">登录</button>
			</view>
		</form>
		
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
				showPassword: true,
				checkbox: '0'
			}
		},
		onLoad() {
			
			
		},
		methods: {
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
				// console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				// var formdata = e.detail.value
				// uni.showModal({
				// 	content: '表单数据内容：' + JSON.stringify(formdata),
				// 	showCancel: false
				// });
				if(!that.username){
					uni.showToast({
						title: '请输入用户名',
						icon: 'none',
					});
					return false
				}
				if(!that.password){
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
				encrypt.setPublicKey(publicKye);	  // 公钥
				
				let data = {
					username: that.username,
					password: encrypt.encrypt(that.password),
					checkCaptcha: false
				}
				uni.showToast({
					title: JSON.stringify(data),
					icon: 'none',
				});
				console.log(encrypt.encrypt("123456"))
				// uni.switchTab({
				// 	url: '/pages/index/index'
				// });
				// return false
				http.post('login', data).then(res => {
					console.log('调用接口',res)
					if(res.code == 200) {
						// 存放token
						uni.setStorageSync('Authorization', res.data.access_token)
						uni.switchTab({
							url: '/pages/index/index'
						});
					}else{
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
		/* background: url("../../static/img/login_bg.png"); */
		background-size: 100% auto;
	}
	.p{
		font-size: 48rpx;padding: 20rpx;
	}
	.uni-form-item{
		/* margin: 0 10rpx; */
	}
	.input-box{
		display: block;
		align-items: center;
		height: 80rpx;
		border: 1px solid #eee;
		margin: 10rpx 0;
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
	    color: #007AFF;
	}
	.text{
		font-size: 24rpx;
		margin: 0 20rpx;
		text{
			color: #007AFF;
		}
	}
	
	::v-deep .uni-checkbox-input{
		transform:scale(0.7) !important;
		border-radius: 50% !important;
	}
	/* #ifdef MP-WEIXIN */

	/* #endif */
	::v-deep .uni-checkbox-input-checked{
		color: #fff !important;
		background-color: rgb(0, 122, 255) !important;
	}
	

</style>
