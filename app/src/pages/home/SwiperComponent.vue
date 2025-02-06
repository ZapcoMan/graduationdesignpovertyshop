<template>
  <swiper
    :autoplay="true"
    :circular="true"
    :indicator-dots="true"
    :interval="2000"
    :duration="500"
    class="swiper"
  >
    <swiper-item v-for="(item, index) in list" :key="index">
      <view class="swiper-item">
        <image
          style="width: 100%; height: 100%"
          mode="aspectFit"
          :src="item.pic"
        />
      </view>
    </swiper-item>
  </swiper>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import request from "@/utils/request";

export default defineComponent({
  setup() {
    const state = reactive({ list: [] as any[] });

    onMounted(() => {
      request
        .post("/generalapi/list", { data: { isEnable: 1, table: "carousel" } })
        .then((res: any) => {
          state.list = res?.data?.list || [];
        });
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped>
.swiper {
  height: 300rpx;
  width: 100%;
  .swiper-item {
    width: 100%;
    height: 100%;
  }
}
</style>
