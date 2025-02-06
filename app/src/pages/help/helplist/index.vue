<template>
  <view class="container">
    <HelpListItem :list="list" />
  </view>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { onLoad, onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app";
import request from "@/utils/request";

import HelpListItem from "../HelpListItem.vue";

export default defineComponent({
  components: { HelpListItem },
  setup() {
    const state = reactive({
      queryParams: { current: 1, pageSize: 20 } as any,
      list: [] as any[],
    });

    const fetchData = () => {
      request
        .post("/generalapi/list", {
          data: { ...state.queryParams, table: "helplist" },
        })
        .then((res: any) => {
          const _list = res?.data?.list || [];
          if (state.queryParams.current == 1) {
            state.list = _list;
          } else {
            state.list = state.list.concat(_list);
          }
        })
        .finally(() => {
          uni.stopPullDownRefresh();
        });
    };

    onLoad((options) => {
      const userinfo = uni.getStorageSync("userinfo");
      uni.setNavigationBarTitle({ title: options?.title || "" });
      if (options?.type == "1") {
        state.queryParams.userinfo = userinfo;
      } else if (options?.type == "2") {
        state.queryParams.acceptor = userinfo;
      }
      fetchData();
    });

    onPullDownRefresh(() => {
      state.queryParams.current = 1;
      fetchData();
    });

    onReachBottom(() => {
      state.queryParams.current += 1;
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
}
</style>
