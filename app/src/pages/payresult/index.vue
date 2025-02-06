<template>
  <view class="container">
    <fui-result type="success" title="支付成功" :descr="data.name">
      <fui-button
        width="400rpx"
        height="84rpx"
        text="确定"
        type="success"
        bold
        :margin="['48rpx', '0', '24rpx']"
        @click="handleClick"
      />
    </fui-result>
  </view>
</template>

<script lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  components: {},
  setup() {
    const state = reactive({
      data: {} as any,
    });

    onLoad((options) => {
      state.data = { ...options };
    });

    const handleClick = () => {
      uni.navigateBack();
    };

    return {
      ...toRefs(state),
      handleClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  min-height: 100vh;
  background-color: #ebedf0;
}
</style>
