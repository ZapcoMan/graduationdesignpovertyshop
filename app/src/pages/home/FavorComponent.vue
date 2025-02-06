<template>
  <view class="content">
    <fui-text
      block
      :padding="['0', '24rpx']"
      size="32"
      text="猜你喜欢"
      type="purple"
    />
    <fui-tabs
      :current="current"
      :isSticky="true"
      :tabs="['贫困生帮扶', '校园物品义卖' /*, '校内求助'*/]"
      :short="false"
      @change="handleChange"
    />
    <ProjectList v-if="current == 0" />
    <GoodList v-if="current == 1" />
    <HelpList v-if="current == 2" />
  </view>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

import ProjectList from "./ProjectList.vue";
import GoodList from "./GoodList.vue";
import HelpList from "./HelpList.vue";

export default defineComponent({
  components: { ProjectList, GoodList, HelpList },
  setup() {
    const state = reactive({
      current: 0,
    });

    const handleChange = ({ index }: any) => {
      state.current = index;
    };

    return {
      ...toRefs(state),
      handleChange,
    };
  },
});
</script>

<style lang="scss" scoped>
.content {
  margin-top: 32rpx;
}
</style>
