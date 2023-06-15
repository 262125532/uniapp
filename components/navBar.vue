<template>
    <view class="navBar" :style="{'background':navBar.bgcolor || '#F8F8F8'}">
        <view class="left" v-if="navBar.back" @click="dialog()">
			<view class="uni-icon uni-icon-back" :style="{'color':navBar.backcolor}"></view>
        </view>
        <view class="center" :style="{'color':navBar.titlecolor}">
            {{navBar.title}}
        </view>
<!--        <view class="btn" v-if="navBar.btn" @click="okBtn()">{{navBar.btn}}</view> -->
    </view>
</template>
<script>
export default {
    name: 'navBar',
    components: {},
    props: ['navBar','callback','previousText'],
    data () {
        return {
			
        };
    },
    methods: {
        back(){
            uni.navigateBack();
        },
        dialog(){
			let that = this
            if(that.navBar.previousText){
				uni.showModal({
				    title: "",
				    content: that.navBar.previousText,
				    showCancel: false,
				    confirmText: "确定",
				    confirmColor: "#333",
				    success(res) {
				        that.back()
				    }
				})
            }else{
                that.back()
            }
        },
        // 回调函数保存
        okBtn(){
            this.callback()
        }
    },
    mounted () {
        console.log(111,this.navBar)
    },
    watch: {

    }
}
</script>
<style scoped lang="scss">
.navBar{
    width: 750rpx;
    height: 88rpx;
    background: #34C266;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    .left{
        position: absolute;
		width: 80rpx;
		height: 88rpx;
		text-align: center;
		line-height: 80rpx;
        left: 0;
        top: 0;
        z-index: 1;
        font-size: 48rpx;
    }
    .center{
        width: 750rpx;
        height: 88rpx;
        line-height: 88rpx;
        font-size: 32rpx;
        color: #fff;
        text-align: left;
		text-indent: 80rpx;
    }
    .btn{
        position: absolute;
        right: 28rpx;
        top: 28rpx;
        z-index: 1;
        font-size: 28rpx;
        color: #fff;
    }
}
</style>