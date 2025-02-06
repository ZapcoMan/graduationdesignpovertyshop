<template>
  <view>
    <HelpListItem :list="list" />
  </view>
</template>

<script lang="ts">
import request from "@/utils/request";
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import HelpListItem from "@/pages/help/HelpListItem.vue";

export default defineComponent({
  components: { HelpListItem },
  setup() {
    const state = reactive({ list: [] });

    onMounted(() => {
      request.post("/recommend/listHelp", { data: {} }).then((res: any) => {
        state.list = res?.data?.list || [];
      });
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped></style>
