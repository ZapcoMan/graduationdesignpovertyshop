<template>
  <view class="container">
    <view class="fui-news__item">
      <view class="tool-title">
        <fui-text text="求助标题" :size="28" lineHeight color="#333333" />
      </view>

      <fui-overflow-hidden :text="formData.name" :size="36" />
      <view class="tool-title">
        <fui-text text="求助详情" :size="28" lineHeight color="#333333" />
      </view>
      <fui-overflow-hidden
        :text="formData.content"
        :size="26"
        color="#7F7F7F"
      />
      <view class="tool-title">
        <fui-text text="求助照片" :size="28" lineHeight color="#333333" />
      </view>
      <view class="fui-image__list" v-if="formData.pic">
        <fui-lazyload
          :src="src"
          v-for="(src, idx) in formData.pic?.split(',') || []"
          :key="idx"
          :width="formData.pic?.split(',')?.length > 1 ? 200 : 400"
          :height="formData.pic?.split(',')?.length > 1 ? 200 : 0"
          marginRight="20"
          mode="aspectFill"
        />
      </view>
      <view class="fui-news__info">
        <fui-text text="联系电话：" :size="25" color="#7F7F7F" />
        <fui-text :text="formData.phone" :size="25" color="#7F7F7F" />
      </view>
      <view class="fui-news__info">
        <fui-text text="求助时间：" :size="25" color="#7F7F7F" />
        <fui-text :text="createTime" :size="25" color="#7F7F7F" />
      </view>
      <view v-if="userinfo == formData.userinfo" class="fui-news__info">
        <fui-text text="求助结果：" :size="25" color="#7F7F7F" />
        <fui-text :text="formData.results" :size="25" color="#7F7F7F" />
      </view>
      <view v-if="userinfo == formData.userinfo" class="fui-news__info">
        <fui-text text="帮助者电话" :size="25" color="#7F7F7F" />
        <fui-text :text="formData.bzphone" :size="25" color="#7F7F7F" />
      </view>
      <view v-if="formData.finishTime" class="fui-news__info">
        <fui-text text="完成时间：" :size="25" color="#7F7F7F" />
        <fui-text :text="finishTime" :size="25" color="#7F7F7F" />
      </view>
      <view class="fui-news__info">
        <fui-text text="状态：" :size="25" color="#FF2B2B" />
        <fui-text :text="formData.status" :size="25" color="#FF2B2B" />
      </view>
    </view>

    <fui-form
      v-if="!(formData.acceptor || userinfo == formData.userinfo)"
      error-position="1"
      ref="form"
      top="0"
      :model="formData"
      :show="true"
    >
      <view class="tool-title" style="margin-left: 24rpx">
        <fui-text text="我要帮助" :size="28" lineHeight color="#333333" />
      </view>
      <fui-form-item asterisk label="手机号码">
        <fui-input
          v-model="formData.bzphone"
          :borderBottom="false"
          :padding="[0]"
          placeholder="请输入手机号码"
        />
      </fui-form-item>

      <fui-form-item label="帮助信息">
        <fui-textarea
          height="120rpx"
          min-height="120rpx"
          :padding="[0]"
          :border-bottom="false"
          :border-top="false"
          placeholder="请输入帮助信息..."
          v-model="formData.results"
        />
      </fui-form-item>

      <view class="fui-btn__box">
        <fui-button text="我要帮助" bold @click="handleSubmit" />
      </view>
    </fui-form>
  </view>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from "vue";
import UploadMultiple from "@/components/UploadMultiple/index.vue";
import request from "@/utils/request";
import { onLoad } from "@dcloudio/uni-app";
import dayjs from "dayjs";

const rules = [
  {
    name: "bzphone",
    rule: ["required", "isMobile"],
    msg: ["请输入手机号", "请输入正确的手机号"],
  },
  {
    name: "results",
    rule: ["required"],
    msg: ["请输入帮助信息"],
  },
];

export default defineComponent({
  components: { UploadMultiple },
  setup() {
    const state = reactive({
      form: null as any,
      formData: {} as any,
      userinfo: "",
    });

    const navigateTo = (url: string) => {
      uni.navigateTo({ url });
    };

    const createTime = computed(() => {
      return dayjs(state.formData?.createTime).format("YYYY-MM-DD HH:mm");
    });

    const finishTime = computed(() => {
      return dayjs(state.formData?.finishTime).format("YYYY-MM-DD HH:mm");
    });

    onLoad((options) => {
      state.userinfo = uni.getStorageSync("userinfo");
      request
        .post("/generalapi/list", {
          data: { current: 1, pageSize: 1, id: options?.id, table: "helplist" },
        })
        .then((res: any) => {
          state.formData = res?.data?.list?.[0] || {};
        });
    });

    const handleSubmit = () => {
      state.form.validator(state.formData, rules, true).then((res: any) => {
        if (res?.isPassed) {
          const userinfo = uni.getStorageSync("userinfo");
          request
            .post("/generalapi/edit", {
              data: {
                ...state.formData,
                status: "已完成",
                acceptor: userinfo,
                receiveTime: new Date(),
                finishTime: new Date(),
                updateTime: new Date(),
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
      createTime,
      finishTime,
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.fui-btn__box {
  padding: 48rpx;
}

.tool-title {
  border-left: 8rpx solid #6831ff;
  padding-left: 12rpx;
  margin-top: 24rpx;
  margin-bottom: 8rpx;
}

.fui-news__item {
  /* #ifndef APP-NVUE */
  width: 100%;
  box-sizing: border-box;
  /* #endif */
  padding: 20rpx 32rpx;
  background-color: #fff;
}

.fui-news__item:active {
  background-color: rgba(0, 0, 0, 0.2);
}

.fui-image__list {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  padding-top: 20rpx;
  padding-bottom: 16rpx;
}

.fui-news__info {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  transform: scale(0.8);
  transform-origin: 0 100%;
}
</style>
