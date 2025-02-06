<template>
  <view>
    <AssistItem :list="list" />
  </view>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import request from "@/utils/request";
import AssistItem from "@/pages/assistlist/AssistItem.vue";

export default defineComponent({
  components: { AssistItem },
  setup() {
    const state = reactive({ list: [] });

    onMounted(() => {
      request.post("/recommend/listProject", { data: {} }).then((res: any) => {
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
