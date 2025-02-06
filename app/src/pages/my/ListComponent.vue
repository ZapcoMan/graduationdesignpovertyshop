<template>
  <view class="content">
    <fui-list>
      <fui-list-cell
        arrow
        v-for="(item, index) in list"
        :key="index"
        @click="handleClick(item)"
      >
        <view class="fui-list__item">
          <view class="fui-align__center">
            <image class="fui-list__icon" :src="item.icon" mode="widthFix">
            </image>
            <text>{{ item.name }}</text>
          </view>
          <text class="fui-text__explain">{{ item.explain }}</text>
        </view>
      </fui-list-cell>
    </fui-list>
  </view>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  setup() {
    const state = reactive({
      list: [
        {
          name: "发起求助",
          explain: "需要帮助",
          icon: "/static/images/my/application.png",
          path: "/pages/help/helpedit/index",
        },
        {
          name: "在线捐赠",
          explain: "多元化捐赠",
          icon: "/static/images/my/application.png",
          path: "/pages/donate/index",
        },
        {
          name: "收货地址",
          explain: "维护收获地址",
          icon: "/static/images/my/application.png",
          path: "/pages/my/address/index",
        },
        {
          name: "帮助中心",
          explain: "小程序操作流程",
          icon: "/static/images/my/help.png",
          path: "",
        },
        {
          name: "关于我们",
          explain: "快速联系我们",
          icon: "/static/images/my/about.png",
          path: "",
        },
      ],
    });

    const handleClick = (_item: any) => {
      if (_item.path) {
        uni.navigateTo({ url: _item.path });
      } else {
        uni.showToast({ title: "开发中...", icon: "none" });
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

.fui-list__item {
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.fui-align__center {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  align-items: center;
  flex-direction: row;
}

.fui-text__explain {
  font-size: 28rpx;
  color: #7f7f7f;
  flex-shrink: 0;
}

.fui-list__icon {
  width: 48rpx;
  height: 48rpx;
  margin-right: 24rpx;
}
</style>
