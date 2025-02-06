<template>
  <view class="container">
    <fui-list>
      <fui-list-cell
        arrow
        v-for="(item, index) in list"
        :key="index"
        @click="handleClick(item)"
      >
        <view>
          <text>{{ item.text }}</text>
        </view>
      </fui-list-cell>
    </fui-list>

    <view class="flex" style="justify-content: space-around; margin-top: 48rpx">
      <fui-button width="240rpx" text="添加" @click="handleClick({})" />
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { onShow } from "@dcloudio/uni-app";
import request from "@/utils/request";

export default defineComponent({
  components: {},
  setup() {
    const state = reactive({ list: [] as any });

    const fetchData = () => {
      request.get("/address/get-by-user").then((res: any) => {
        state.list = res?.data?.list || [];
      });
    };

    onShow(() => {
      fetchData();
    });

    const navigateTo = (url: string) => {
      uni.navigateTo({ url });
    };

    const handleClick = (item: any) => {
      let url = "/pages/my/addressedit/index";
      if (item.id) {
        url += `?id=${item.id}&text=${item.text}`;
      }
      uni.navigateTo({ url });
    };

    return {
      ...toRefs(state),
      navigateTo,
      handleClick,
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
}
</style>
