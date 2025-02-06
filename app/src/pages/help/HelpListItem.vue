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
      <view
        class="fui-news__item"
        @click="navigateTo(`/pages/help/helpdetails/index?id=${item.id}`)"
      >
        <fui-overflow-hidden :text="item.name" :size="36" :rows="2" />
        <fui-overflow-hidden
          :text="item.content"
          :size="26"
          color="#7F7F7F"
          :rows="4"
        />
        <view class="fui-image__list" v-if="item.pic">
          <fui-lazyload
            :src="src"
            v-for="(src, idx) in item.pic?.split(',') || []"
            :key="idx"
            :width="item.pic?.split(',')?.length > 1 ? 200 : 400"
            :height="item.pic?.split(',')?.length > 1 ? 200 : 0"
            marginRight="20"
            mode="aspectFill"
          />
        </view>
        <view class="fui-news__info">
          <fui-text
            :text="item.status"
            :size="25"
            color="#FF2B2B"
            :padding="['0', '20rpx', '0', '0']"
          />
        </view>
      </view>
    </fui-list>
  </view>
</template>

<script lang="ts">
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

    return {
      ...toRefs(state),
      navigateTo,
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
