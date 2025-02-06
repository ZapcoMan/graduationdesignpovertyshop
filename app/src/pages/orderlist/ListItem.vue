<template>
  <view>
    <fui-list
      :topBorder="false"
      bottomBorder
      bottomLeft="32"
      bottomRight="32"
      v-for="(item, index) in list"
      :key="index"
    >
      <view class="fui-news__item">
        <fui-overflow-hidden :text="item._goods?.name" :size="28" :rows="4" />
        <view class="fui-news__info">
          <fui-text text="订单号：" :size="26" color="#5E5E5E" />
          <fui-text :text="item.orderNumber" :size="26" color="#5E5E5E" />
        </view>
        <view class="fui-news__info">
          <fui-text text="下单时间：" :size="26" color="#5E5E5E" />
          <fui-text
            :text="formatDatetime(item.createTime)"
            :size="26"
            color="#5E5E5E"
          />
        </view>
        <view v-if="item.kdgs" class="fui-news__info">
          <fui-text text="发货信息：" :size="26" color="#5E5E5E" />
          <fui-text :text="item.kdgs" :size="26" color="#5E5E5E" />
          <fui-text :text="`(${item.kddh})`" :size="26" color="#5E5E5E" />
        </view>
        <view class="fui-news__info">
          <fui-text
            :text="item.status"
            :size="25"
            color="#6831FF"
            :padding="['0']"
          />
        </view>
      </view>
    </fui-list>
  </view>
</template>

<script lang="ts">
import dayjs from "dayjs";
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  components: {},
  props: {
    list: Array<any>,
  },
  setup() {
    const state = reactive({});

    const navigateTo = (url: string) => {
      uni.navigateTo({ url });
    };

    const formatDatetime = (_tiem: any) => {
      return _tiem && dayjs(_tiem).format("YYYY-MM-DD HH:mm");
    };

    return {
      ...toRefs(state),
      navigateTo,
      formatDatetime,
    };
  },
});
</script>

<style lang="scss" scoped>
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
