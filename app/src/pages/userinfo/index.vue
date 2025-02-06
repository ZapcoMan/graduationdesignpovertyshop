<template>
  <view class="container">
    <view style="margin-top: 48rpx; text-align: center">
      <button
        open-type="chooseAvatar"
        @chooseavatar="onChooseAvatar"
        style="display: contents"
      >
        <fui-avatar :src="userinfo?.avatar" size="large" />
      </button>
    </view>
    <view style="padding: 0 96rpx">
      <fui-input
        v-model="userinfo.username"
        marginTop="24"
        :isFillet="false"
        inputBorder
        :padding="['24rpx', '24rpx']"
        placeholder="请输入昵称"
        textAlign="center"
        type="nickname"
      />
    </view>
    <view style="margin-top: 48rpx; padding: 0 96rpx">
      <fui-button
        text="保存"
        bold
        radius="96rpx"
        width="100%"
        @click="handleSave"
      />
    </view>
  </view>
</template>

<script lang="ts">
import request from "@/utils/request";
import { onLoad } from "@dcloudio/uni-app";
import dayjs from "dayjs";
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  components: {},
  setup() {
    const state = reactive({
      userinfo: {} as any,
    });

    const fetchData = () => {
      request.get("/account/getUserInfo", { data: {} }).then((res: any) => {
        state.userinfo = res?.data?.userinfo || {};
      });
    };

    onLoad(() => {
      fetchData();
    });

    const onChooseAvatar = (e: any) => {
      const { avatarUrl } = e.detail;
      state.userinfo.avatar = avatarUrl;
    };

    const handleSave = () => {
      request
        .post("/account/update", {
          data: { ...state.userinfo, updateTime: dayjs().toDate() },
        })
        .then((res: any) => {
          uni.showToast({ title: res?.msg || "成功！", icon: "none" });
          uni.navigateBack();
        });
    };

    return {
      ...toRefs(state),
      onChooseAvatar,
      handleSave,
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  min-height: 100vh;
  background-color: #ebedf0;
}
</style>
