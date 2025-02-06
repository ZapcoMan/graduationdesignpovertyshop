<template>
  <view class="container">
    <fui-form
      error-position="1"
      ref="form"
      top="0"
      :model="formData"
      :show="true"
    >
      <fui-form-item asterisk label="标题">
        <fui-input
          :borderBottom="false"
          :padding="[0]"
          placeholder="请输入标题"
          v-model="formData.name"
        />
      </fui-form-item>
      <fui-form-item asterisk label="手机号码">
        <fui-input
          v-model="formData.phone"
          :borderBottom="false"
          :padding="[0]"
          placeholder="请输入手机号码"
        />
      </fui-form-item>

      <fui-form-item label="求助详情">
        <fui-textarea
          height="120rpx"
          min-height="120rpx"
          :padding="[0]"
          :border-bottom="false"
          :border-top="false"
          placeholder="请输入求助详情..."
          v-model="formData.content"
        />
      </fui-form-item>

      <fui-form-item label="求助图片" :padding="['28rpx', '32rpx', '8rpx']">
        <UploadMultiple v-model="formData.pic" />
      </fui-form-item>

      <view class="fui-btn__box">
        <fui-button text="发布求助" bold @click="handleSubmit" />
      </view>
    </fui-form>
  </view>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import UploadMultiple from "@/components/UploadMultiple/index.vue";
import request from "@/utils/request";

const rules = [
  {
    name: "name",
    rule: ["required"],
    msg: ["请输入标题"],
  },
  {
    name: "phone",
    rule: ["required", "isMobile"],
    msg: ["请输入手机号", "请输入正确的手机号"],
  },
];

export default defineComponent({
  components: { UploadMultiple },
  setup() {
    const state = reactive({ form: null as any, formData: {} as any });

    const navigateTo = (url: string) => {
      uni.navigateTo({ url });
    };

    const handleSubmit = () => {
      state.form.validator(state.formData, rules, true).then((res: any) => {
        if (res?.isPassed) {
          const userinfo = uni.getStorageSync("userinfo");
          request
            .post("/generalapi/edit", {
              data: {
                ...state.formData,
                createTime: new Date(),
                status: "待帮助",
                userinfo,
                table: "helplist",
              },
            })
            .then((res: any) => {
              uni.showToast({ title: res?.msg || "成功", icon: "none" });
            })
            .finally(() => {
              uni.navigateBack();
            });
        }
      });
    };

    return {
      ...toRefs(state),
      navigateTo,
      handleSubmit,
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
.fui-btn__box {
  padding: 48rpx;
}
</style>
