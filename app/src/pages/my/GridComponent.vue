<template>
  <view class="content">
    <fui-grid :columns="4" :square="false" :showBorder="false">
      <fui-grid-item v-for="(item, index) in list" :key="index">
        <view class="grid-cell" @click="handleClick(item)">
          <view class="grid-cell-icon">
            <image :src="item.icon" mode="scaleToFill" />
          </view>
          <text>{{ item.name }}</text>
        </view>
      </fui-grid-item>
    </fui-grid>
  </view>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  setup() {
    const state = reactive({
      list: [
        {
          name: "求助记录",
          icon: "/static/images/my/qiuzhu.png",
          path: "/pages/help/helplist/index?title=我帮求助&type=1",
        },
        {
          name: "我帮助的",
          icon: "/static/images/my/bagnzhu.png",
          path: "/pages/help/helplist/index?title=我帮助的&type=2",
        },
        {
          name: "义卖订单",
          icon: "/static/images/my/order.png",
          path: "/pages/orderlist/index",
        },

        {
          name: "捐赠记录",
          icon: "/static/images/my/juanzeng.png",
          path: "/pages/donate/list/index",
        },
      ],
    });

    const handleClick = (_item: any) => {
      uni.navigateTo({ url: _item.path });
    };

    return {
      ...toRefs(state),
      handleClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.content {
  margin-top: 32rpx;
}

.grid-cell {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .grid-cell-icon {
    image {
      height: 96rpx;
      width: 96rpx;
      border-radius: 50%;
    }
  }
}
</style>
