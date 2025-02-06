<template>
  <view class="container">
    <image class="goods-icon" :src="data.thumbnail" mode="aspectFill" />
    <view style="padding: 12rpx 24rpx">
      <view>
        <text>{{ data.name }}</text>
      </view>
      <view class="fui-goods__item-price">
        <fui-text font-weight="500" text="￥" :size="22" color="#FF2B2B" />
        <fui-text
          font-weight="500"
          lineHeight
          :text="getPrice(data.price, 1)"
          :size="34"
          color="#FF2B2B"
        />
        <fui-text
          font-weight="500"
          :text="getPrice(data.price, 2)"
          :size="24"
          color="#FF2B2B"
        />
      </view>
    </view>

    <fui-form ref="form">
      <fui-form-item label="收货地址" arrow highlight>
        <CustomSelect
          v-model="formData.addressid"
          :list="list"
          placeholder="请选收货地址"
          @change="(item:any) => (formData.address = item.text)"
        />
      </fui-form-item>
    </fui-form>

    <fui-text
      block
      :padding="['12rpx', '24rpx']"
      size="32"
      text="商品详情"
      type="purple"
    />
    <view style="padding: 0 12rpx">
      <rich-text :nodes="nodes" />
    </view>
    <view style="height: 120rpx">
      <view class="fui-goodsbar__fixed">
        <view class="footer-btn">
          <fui-button
            text="立即购买"
            type="danger"
            height="72rpx"
            width="600rpx"
            :size="28"
            radius="40rpx"
            @click="handleClick"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import CustomSelect from "@/components/custom-select/index.vue";
import request from "@/utils/request";

export default defineComponent({
  components: { CustomSelect },
  setup() {
    const state = reactive({
      queryParams: { current: 1, pageSize: 1 } as any,
      data: {} as any,
      list: [],
      formData: {} as any,
    });

    const fetchData = () => {
      request
        .post("/generalapi/list", {
          data: { ...state.queryParams, table: "goods" },
        })
        .then((res: any) => {
          const _item = res?.data?.list?.[0] || {};
          uni.setNavigationBarTitle({ title: _item.name });
          state.data = _item;
        });
    };

    const nodes = computed(() => {
      return state.data?.content?.replace(
        /<img([\s\w"-=/.:;]+)/gi,
        '<img style="max-width: 100%;" $1'
      );
    });

    const getPrice = (price: number, type: number) => {
      if (!price) return "";
      const _price = price.toFixed(2);
      const arr = _price.toString().split(".");
      return type === 1 ? arr[0] : `.${arr[1]}`;
    };

    onLoad((options) => {
      state.queryParams.id = options?.id || "";
      fetchData();
      request.get("/address/get-by-user").then((res: any) => {
        state.list = res?.data?.list || [];
      });
    });

    //购买
    const handleClick = () => {
      if (!state.formData.address) {
        uni.showToast({ title: "请选择收货地址", icon: "none" });
        return;
      }
      request
        .post("/orderlist/submitOrder", {
          data: { id: state.data?.id, address: state.formData.address },
        })
        .then((res: any) => {
          uni.navigateTo({
            url: `/pages/payresult/index?id=${state.data.id}&name=${state.data.name}`,
          });
        });
    };

    return {
      ...toRefs(state),
      nodes,
      getPrice,
      handleClick,
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

.goods-icon {
  width: 100%;
  height: 750rpx;
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

.footer-btn {
  padding-top: 12rpx;
  height: 115rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #cccccc;
}

.fui-goodsbar__fixed {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  /* #ifndef APP-NVUE */
  z-index: 10;
  /* #endif */
}
</style>
