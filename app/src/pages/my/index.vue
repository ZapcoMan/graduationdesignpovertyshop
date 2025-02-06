<template>
  <view class="container">
    <view class="userinfo">
      <view class="avatar">
        <fui-avatar :src="userinfo.avatar" />
      </view>
      <view class="flex row-between">
        <view>
          <view>
            <fui-text :text="userinfo.username" type="black" :size="28" />
          </view>
          <fui-tag
            :text="userinfo.isAdmin ? '管理员' : '普通用户'"
            type="success"
            theme="light"
            size="20"
            :padding="['8rpx', '12rpx']"
          />
        </view>
        <fui-icon
          size="48"
          color="#465CFF"
          name="setup-fill"
          @click="navigateTo('/pages/userinfo/index')"
        />
      </view>
    </view>
    <GridComponent />
    <ListComponent />
  </view>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { onShow } from "@dcloudio/uni-app";
import request from "@/utils/request";
import GridComponent from "./GridComponent.vue";
import ListComponent from "./ListComponent.vue";

export default defineComponent({
  components: { GridComponent, ListComponent },
  setup() {
    const state = reactive({ userinfo: {} as any });

    const fetchData = () => {
      request.get("/account/getUserInfo", { data: {} }).then((res: any) => {
        state.userinfo = res?.data?.userinfo || {};
      });
    };

    onShow(() => {
      fetchData();
    });

    const navigateTo = (url: string) => {
      uni.navigateTo({ url });
    };

    return {
      ...toRefs(state),
      navigateTo,
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: #ffffff;

  .userinfo {
    padding: 48rpx 48rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #ebedf0;

    .avatar {
      margin-right: 24rpx;
    }
  }
}
</style>
