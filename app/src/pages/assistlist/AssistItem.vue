<template>
  <view
    v-for="(item, index) in list"
    :key="index"
    class="flex list-item"
    @click="handleClick(item)"
  >
    <view>
      <image class="list-item-icon" :src="item.thumbnail" mode="aspectFill" />
    </view>
    <view class="list-item-content">
      <view>
        <text class="list-item-title text-limit limit-1">{{ item.name }}</text>
      </view>

      <view style="height: 72rpx">
        <text class="list-item-explain text-limit limit-2">
          {{ item.intro }}
        </text>
      </view>
      <view>
        <text class="list-item-explain">管理者：{{ item.user }}</text>
      </view>
      <view class="flex row-between">
        <fui-tag
          :text="item.status"
          type="success"
          theme="light"
          size="20"
          :padding="['8rpx', '12rpx']"
        />
        <text class="list-item-explain">{{ getDate(item.updateTime) }}</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from "vue";
import dayjs from "dayjs";
import request from "@/utils/request";
export default defineComponent({
  components: {},
  props: {
    list: Array<any>,
  },
  setup(props) {
    const state = reactive({});

    const getDate = (_time: any) => {
      return _time && dayjs(_time).format("YYYY-MM-DD HH:mm");
    };

    const navigateTo = (url: string) => {
      uni.navigateTo({ url });
    };

    const handleClick = (item: any) => {
      request.post("/recommend/add", { data: { ...item } });
      navigateTo(`/pages/assistdetails/index?id=${item.id}`);
    };

    return {
      ...toRefs(state),
      handleClick,
      getDate,
    };
  },
});
</script>

<style lang="scss" scoped>
.list-item {
  padding: 24rpx;
  border-bottom: 1rpx dashed #f8f8f8;

  :active {
    opacity: 0.6;
  }
}
.list-item-content {
  padding-left: 24rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.list-item-icon {
  width: 260rpx;
  height: 210rpx;
  border-radius: 12rpx;
  border: 1rpx solid #cccccc;
}

.list-item-title {
  font-size: 28rpx;
  color: #333333;
  font-weight: 700;
}

.list-item-explain {
  font-size: 24rpx;
  color: #8d8d8d;
}
.text-limit {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5;
  max-height: 3em;
  width: 100%;
}

.limit-1 {
  -webkit-line-clamp: 1;
}

.limit-2 {
  -webkit-line-clamp: 2;
}
</style>
