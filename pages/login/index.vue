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
				// let publicKye = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDwrmcGuDoVUUA431A9Tdk0Yj/So7AvpzSU25IuxPJnMgeyOfMVoBAQKiGwlxppw+2sx1kQ2i18SrN6G2QsTTaejOg93xdX0H5UiDRWRA84UXBWVNP3MkG/d7EyaYaYmpjl+kVsvDiD6Io+hWTVyVwOX/s0B95DBYYbMqrWw9f3bwIDAQAB'
				let publicKye = 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANL378k3RiZHWx5AfJqdH9xRNBmD9wGD2iRe41HdTNF8RUhNnHit5NpMNtGL0NPTSSpPjjI1kJfVorRvaQerUgkCAwEAAQ==';
				encrypt.setPublicKey(publicKye);	  // 公钥
				// console.log(111,encrypt.encrypt("999999"))
				
				// let privateKey = `-----BEGIN PRIVATE KEY-----
				// MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAPCuZwa4OhVRQDjf
				// UD1N2TRiP9KjsC+nNJTbki7E8mcyB7I58xWgEBAqIbCXGmnD7azHWRDaLXxKs3ob
				// ZCxNNp6M6D3fF1fQflSINFZEDzhRcFZU0/cyQb93sTJphpiamOX6RWy8OIPoij6F
				// ZNXJXA5f+zQH3kMFhhsyqtbD1/dvAgMBAAECgYEAh+FuuRR5dl+Q6orpOjMhVbnC
				// XqGbbsvvm7r7JPx7/lb4kV62JpdfekDPFGu6tcuv+8PwPNtwoqNqAJ5GR9yv4GtR
				// RP1inIQSL167zDak9lVXXP9TJ6K+2AfKwOVWJ99OuZvvD8Mmbek4EV7pZDe56xZO
				// gkDJNiZvsJ1uL7ZV/sECQQD62s0jSSuCSE1X1SFcbS3OBfCrlFjUOMs4/HgQ5guK
				// oIjbGneyF5hw9D4/mMMXi/kbv4BavEYu39W7PMQXUmR7AkEA9Z4umRpSyKg/3MT6
				// Nyorw3kauXckqgr7nbmYFUVoGvB/XaejYYp3rK6PJDwxdlKxWxUQEAWLXuJVidCe
				// PR2InQJAYusy504sJQTD0vXNYPgAjvRSsiYeXRlEMeWEpw0/0dt5/ARU3NpnF2uI
				// vGVN0RQ2GBYM1DrX5hYH3vyYSqYHzwJBAKk6HVz7WAJMegO/663KbnC1pgYW4roN
				// 6yLW1sQBGCNHhFmgwN7Zqm7drl4G4wVlIDFjJ7gCOe5b/xd/FyeAi7kCQEC8kfDQ
				// 8j+wkrhwlkMPquOotHqQEv386y9H7fflcOFuHg0Py93fGFmJA6/Fp5TMqsyxo55g
				// ZmjE/Qp04FIEAxs=
				// -----END PRIVATE KEY-----
				// `;
				// var decrypt = new JSEncrypt();
				// decrypt.setPrivateKey(privateKey);
				// let decryption = decrypt.decrypt(encrypt.encrypt("999999"));
				// console.log(222,decryption)
				
				let data = {
					username: that.username,
					password: encrypt.encrypt(that.password),
					checkCaptcha: false
				}
				uni.showToast({
					title: JSON.stringify(data),
					icon: 'none',
				});
				// console.log(encrypt.encrypt("123456"))
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
