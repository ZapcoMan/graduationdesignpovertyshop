<template>
  <view class="container">
    <fui-form
      error-position="1"
      ref="form"
      top="0"
      :model="formData"
      :show="true"
    >
      <fui-form-item asterisk label="捐赠类型">
        <fui-radio-group v-model="formData.donatetype">
          <fui-label v-for="(item, index) in list" :key="index">
            <fui-list-cell :bottomBorder="false">
              <view class="fui-list__cell">
                <text>{{ item.name }}</text>
                <fui-radio
                  isCheckMark
                  checkMarkColor="#465CFF"
                  :value="item.id"
                />
              </view>
            </fui-list-cell>
          </fui-label>
        </fui-radio-group>
      </fui-form-item>

      <fui-form-item v-if="donatetype?.isOnlinePayment" label="捐赠金额">
        <fui-input
          :borderBottom="false"
          :padding="[0]"
          placeholder="请输入..."
          v-model="formData.info"
        />
      </fui-form-item>

      <fui-form-item v-if="!donatetype?.isOnlinePayment" label="时间范围">
        <DatetimeRangeSelect v-model="formData.rangeDate" />
      </fui-form-item>

      <fui-form-item v-if="!donatetype?.isOnlinePayment" label="捐赠内容">
        <fui-textarea
          height="120rpx"
          min-height="120rpx"
          :padding="[0]"
          :border-bottom="false"
          :border-top="false"
          placeholder="请输入捐赠内容..."
          v-model="formData.info"
        />
      </fui-form-item>

      <view class="fui-btn__box">
        <fui-button text="提交捐赠" bold @click="handleSubmit" />
      </view>
    </fui-form>
  </view>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from "vue";
import { onShow } from "@dcloudio/uni-app";
import request from "@/utils/request";

import DatetimeRangeSelect from "@/components/DatetimeRangeSelect/index.vue";

const rules = [
  {
    name: "donatetype",
    rule: ["required"],
    msg: ["请选择捐赠类型"],
  },
];

export default defineComponent({
  components: { DatetimeRangeSelect },
  setup() {
    const state = reactive({
      form: null as any,
      formData: {} as any,
      list: [] as any[],
    });

    const fetchData = () => {
      request
        .post("/generalapi/list", {
          data: {
            current: 1,
            pageSize: 1000,
            isEnable: 1,
            table: "donatetype",
          },
        })
        .then((res: any) => {
          state.list = res?.data?.list || [];
        });
    };

    const donatetype: any = computed(() => {
      return state.formData.donatetype
        ? state.list.find((v) => v.id == state.formData.donatetype)
        : {};
    });

    onShow(() => {
      fetchData();
    });

    const handleSubmit = () => {
      state.form?.validator(state.formData, rules, true).then((res: any) => {
        if (res?.isPassed) {
          const userinfo = uni.getStorageSync("userinfo");
          const { rangeDate, info, ...rest } = state.formData;
          const _donatetype = state.list.find(
            (v) => v.id == state.formData.donatetype
          );
          const _formData = {
            ...rest,
            updateTime: new Date(),
            userinfo,
            info:
              _donatetype?.isOnlinePayment == 1
                ? `【${_donatetype.name}】：${info}元`
                : info,
            status: _donatetype?.isOnlinePayment == 1 ? "已完成" : "已提交",
            startTime: rangeDate?.[0] || new Date(),
            endTime: rangeDate?.[1] || new Date(),
          };

          request
            .post("/generalapi/edit", {
              data: { ..._formData, table: "donate" },
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
      handleSubmit,
      donatetype,
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

.fui-list__cell {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
