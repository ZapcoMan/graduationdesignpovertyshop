<template>
  <view class="content">
    <image mode="scaleToFill" src="/static/images/banner.png" />
  </view>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  setup() {
    const state = reactive({});

    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped>
.content {
  margin-top: 32rpx;
  width: 100%;
  height: 160rpx;
  padding: 0 24rpx;
  position: relative;
  box-sizing: border-box;
  image {
    width: 100%;
    height: 100%;
    border-radius: 16rpx;
  }
}
</style>
