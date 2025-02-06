<template>
  <view style="padding: 0 24rpx">
    <GoodsItem :list="list" />
  </view>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import request from "@/utils/request";
import GoodsItem from "@/pages/shop/GoodsItem.vue";

export default defineComponent({
  components: { GoodsItem },
  setup() {
    const state = reactive({ list: [] });

    onMounted(() => {
      request.post("/recommend/listGoods", { data: {} }).then((res: any) => {
        state.list = res?.data?.list || [];
      });
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped></style>
