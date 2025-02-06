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
          name: "贫困帮扶",
          icon: "/static/images/bangfu.png",
          path: "/pages/assistlist/index",
        },
        {
          name: "校物义卖",
          icon: "/static/images/shangdian.png",
          path: "/pages/shop/index",
        },
        {
          name: "校内求助",
          icon: "/static/images/qiuzhu.png",
          path: "/pages/help/index",
        },
        {
          name: "在线捐赠",
          icon: "/static/images/juanzeng.png",
          path: "/pages/donate/index",
        },
      ],
    });

    const handleClick = (_item: any) => {
      if (
        _item.path?.startsWith("/pages/shop/index") ||
        _item.path?.startsWith("/pages/help/index")
      ) {
        uni.switchTab({ url: _item.path });
      } else {
        uni.navigateTo({ url: _item.path });
      }
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
      height: 100rpx;
      width: 100rpx;
      border-radius: 50%;
    }
  }
}
</style>
