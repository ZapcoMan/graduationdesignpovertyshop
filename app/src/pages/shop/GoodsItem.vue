<template>
  <fui-row marginTop="24rpx" marginBottom="24rpx" gutter="24">
    <fui-col :span="12" v-for="(item, index) in list" :key="index">
      <view class="list-item" @click="handleClick(item)">
        <image class="list-item-icon" :src="item.thumbnail" mode="aspectFill" />
        <view style="padding: 12rpx 24rpx">
          <view>
            <fui-overflow-hidden :rows="2" :size="28" :text="item.name" />
          </view>
          <view class="fui-goods__item-price">
            <fui-text font-weight="500" text="￥" :size="22" color="#FF2B2B" />
            <fui-text
              font-weight="500"
              lineHeight
              :text="getPrice(item.price, 1)"
              :size="34"
              color="#FF2B2B"
            />
            <fui-text
              font-weight="500"
              :text="getPrice(item.price, 2)"
              :size="24"
              color="#FF2B2B"
            />
          </view>
        </view>
      </view>
    </fui-col>
  </fui-row>
</template>

<script lang="ts">
import request from "@/utils/request";
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

    const getPrice = (price: number, type: number) => {
      if (!price) return "";
      const _price = price.toFixed(2);
      const arr = _price.toString().split(".");
      return type === 1 ? arr[0] : `.${arr[1]}`;
    };

    const handleClick = (item: any) => {
      request.post("/recommend/add", { data: { ...item } });
      navigateTo(`/pages/shopdetails/index?id=${item.id}`);
    };

    return {
      ...toRefs(state),
      handleClick,
      getPrice,
    };
  },
});
</script>

<style lang="scss" scoped>
.list-item {
  flex: 1;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 12rpx;
  margin-bottom: 24rpx;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
}

.list-item-icon {
  width: 100%;
}

.fui-goods__item-price {
  flex: 1;
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  align-items: flex-end;
  padding-top: 24rpx;
}
</style>
