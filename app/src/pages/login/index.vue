<template>
  <view class="container">
    <view>
      <image src="/static/images/weixin.png" mode="widthFix" class="quickLoginBtn" @click="handleLogin" />
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { onPullDownRefresh, onReachBottom, onShow } from "@dcloudio/uni-app";
import dayjs from "dayjs";
import request from "@/utils/request";

export default defineComponent({
  components: {},
  setup() {
    const state = reactive({
      userinfo: {} as any,
    });

    const handleRegister = (_data: any) => {
      request
        .post("/account/login-by-weixin", { data: { ..._data } })
        .then((res: any) => {
          uni.showToast({ title: res.msg || "登录成功！", icon: "none" });
          uni.setStorageSync("token", res?.data?.token);
          uni.setStorageSync("userinfo", res?.data?.id);
          uni.switchTab({ url: "/pages/home/index" });
        });
    };

    onShow(() => {
      const token = uni.getStorageSync("token");
      if (token) {
        uni.switchTab({ url: "/pages/home/index" });
      }

    });

    const handleLogin = () => {
      wx.cloud.callFunction({
        name: "login",
        data: {},
        complete: (res: any) => {
          if (res.result?.openid) {
            wx.getUserInfo({
              success: (result) => {
                handleRegister({
                  openid: res?.result?.openid,
                  avatar: result.userInfo?.avatarUrl,
                  username: result.userInfo?.nickName,
                  password: "",
                  isAdmin: 0,
                  updateTime: dayjs().toDate(),
                });
              },
            });
          } else {
            uni.showToast({ title: "登录失败！", icon: "fail" });
          }
        },
      });
    };

    return {
      ...toRefs(state),
      handleLogin,
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  height: 100vh;
  background-color: #ebedf0;

  .quickLoginBtn {
    width: 450rpx;
    height: 82rpx;
  }
}
</style>
