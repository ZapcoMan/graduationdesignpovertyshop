<template>
  <view class="container">
    <SwiperComponent />
    <GridComponent />
    <BannerComponent />
    <FavorComponent />
  </view>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { onShow } from "@dcloudio/uni-app";

import SwiperComponent from "./SwiperComponent.vue";
import GridComponent from "./GridComponent.vue";
import BannerComponent from "./BannerComponent.vue";
import FavorComponent from "./FavorComponent.vue";

export default defineComponent({
  components: {
    SwiperComponent,
    GridComponent,
    BannerComponent,
    FavorComponent,
  },
  setup() {
    const state = reactive({});

    onShow(() => {});

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
  position: relative;
  box-sizing: border-box;
}
</style>
