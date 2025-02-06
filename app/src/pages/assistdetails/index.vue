<template>
  <view class="container">
    <rich-text :nodes="nodes" />
  </view>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import request from "@/utils/request";

export default defineComponent({
  components: {},
  setup() {
    const state = reactive({
      queryParams: { current: 1, pageSize: 1 } as any,
      data: {} as any,
    });

    const fetchData = () => {
      request
        .post("/generalapi/list", {
          data: { ...state.queryParams, table: "project" },
        })
        .then((res: any) => {
          const _item = res?.data?.list?.[0] || {};
          uni.setNavigationBarTitle({ title: _item.name });
          state.data = _item;
        });
    };

    const nodes = computed(() => {
      return state.data?.content?.replace(
        /<img([\s\w"-=/.:;]+)/gi,
        '<img style="max-width: 100%;" $1'
      );
    });

    onLoad((options) => {
      state.queryParams.id = options?.id || "";
      fetchData();
    });

    return {
      ...toRefs(state),
      nodes,
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  padding: 24rpx;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: #ffffff;
}
</style>
