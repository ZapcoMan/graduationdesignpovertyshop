<template>
  <view class="container">
    <AssistItem :list="list" />
  </view>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { onPullDownRefresh, onReachBottom, onShow } from "@dcloudio/uni-app";
import request from "@/utils/request";
import AssistItem from "./AssistItem.vue";

export default defineComponent({
  components: { AssistItem },
  setup() {
    const state = reactive({
      queryParams: { current: 1, pageSize: 20 },
      list: [] as any[],
    });

    const fetchData = () => {
      request
        .post("/generalapi/list", {
          data: { ...state.queryParams, table: "project" },
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
