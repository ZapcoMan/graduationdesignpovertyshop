<template>
  <view class="container">
    <fui-textarea v-model="data.text" placeholder="请输入收货地址" />
    <view class="flex" style="justify-content: space-around; margin-top: 48rpx">
      <fui-button width="240rpx" text="保存" @click="handleSubmit" />
      <fui-button
        v-if="data.id"
        type="danger"
        width="240rpx"
        text="删除"
        @click="handleDelete"
      />
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import request from "@/utils/request";

export default defineComponent({
  components: {},
  setup() {
    const state = reactive({ data: {} as any });

    onLoad((options) => {
      state.data = { ...options };
    });

    const handleSubmit = () => {
      const { id, text } = state.data;
      if (!text) {
        uni.showToast({ title: "地址不能为空！", icon: "none" });
        return;
      }
      const userinfo = uni.getStorageSync("userinfo");
      request
        .post("/generalapi/edit", {
          data: { table: "address", id, text, userinfo },
        })
        .then((res: any) => {
          uni.showToast({ title: res?.msg || "成功", icon: "none" });
        })
        .finally(() => {
          uni.navigateBack();
        });
    };

    const handleDelete = () => {
      const { id } = state.data;

      uni.showModal({
        title: "提示",
        content: "确定要删除吗？",
        success: (res) => {
          if (res.confirm) {
            request
              .post("/generalapi/delete", { data: { table: "address", id } })
              .then((res: any) => {
                uni.showToast({ title: res?.msg || "成功", icon: "none" });
              })
              .finally(() => {
                uni.navigateBack();
              });
          } else if (res.cancel) {
          }
        },
      });
    };

    return {
      ...toRefs(state),
      handleSubmit,
      handleDelete,
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
