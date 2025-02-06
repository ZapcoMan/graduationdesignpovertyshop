<template>
  <view class="container">
    <fui-search-bar @search="handleSearch" />
    <HelpListItem :list="list" />
    <fui-fab :zIndex="10" @click="navigateTo('/pages/help/helpedit/index')">
      <fui-icon name="plus" color="#fff" />
    </fui-fab>
  </view>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { onPullDownRefresh, onReachBottom, onShow } from "@dcloudio/uni-app";
import request from "@/utils/request";

import HelpListItem from "./HelpListItem.vue";

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

    onShow(() => {
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

    const handleSearch = (e: any) => {
      state.queryParams.name = e.detail.value;
      state.queryParams.current = 1;
      fetchData();
    };

    const navigateTo = (url: string) => {
      uni.navigateTo({ url });
    };

    return {
      ...toRefs(state),
      navigateTo,
      handleSearch,
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
