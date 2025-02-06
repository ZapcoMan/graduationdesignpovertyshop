<template>
  <view class="container">
    <ListItem :list="list" />
  </view>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { onPullDownRefresh, onReachBottom, onShow } from "@dcloudio/uni-app";
import request from "@/utils/request";

import ListItem from "./ListItem.vue";

export default defineComponent({
  components: { ListItem },
  setup() {
    const state = reactive({
      queryParams: { current: 1, pageSize: 20 } as any,
      list: [] as any[],
    });

    const fetchData = () => {
      request
        .post("/generalapi/list", {
          data: { ...state.queryParams, table: "donate" },
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

    onShow(() => {
      const userinfo = uni.getStorageSync("userinfo");
      state.queryParams.userinfo = userinfo;
      state.queryParams.current = 1;
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

    return {
      ...toRefs(state),
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
