<template>
  <view class="container">
    <fui-search-bar @search="handleSearch" />
    <GoodsItem :list="list" />
  </view>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { onPullDownRefresh, onReachBottom, onShow } from "@dcloudio/uni-app";
import request from "@/utils/request";
import GoodsItem from "./GoodsItem.vue";

export default defineComponent({
  components: { GoodsItem },
  setup() {
    const state = reactive({
      queryParams: { current: 1, pageSize: 20 } as any,
      list: [] as any[],
    });

    const fetchData = () => {
      request
        .post("/generalapi/list", {
          data: { ...state.queryParams, table: "goods" },
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

    const handleSearch = (e: any) => {
      state.queryParams.name = e.detail.value;
      state.queryParams.current = 1;
      fetchData();
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
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: #ebedf0;
  padding: 0 24rpx;
}
</style>
