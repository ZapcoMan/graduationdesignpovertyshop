<template>
  <view>
    <view @click="show = true">
      <text v-if="currentValue">{{ currentValue }}</text>
      <text v-else class="placeholder">{{ placeholder }}</text>
    </view>
    <fui-select
      :show="show"
      :options="list"
      :title="placeholder"
      @confirm="confirm"
      @close="show = false"
    />
  </view>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
  type PropType,
} from "vue";

export default defineComponent({
  components: {},
  props: {
    placeholder: {
      type: String,
      default: "请选择",
    },
    modelValue: {
      type: [Number, String],
      default: "",
    },
    list: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
  },
  emits: ["update:modelValue", "change"],
  setup(props, { emit }) {
    const state = reactive({ show: false });

    const currentValue = computed(() => {
      const item = props.list.find((v) => v.id == props.modelValue);
      return item?.text;
    });

    const confirm = (item: any) => {
      emit("update:modelValue", item?.options?.id);
      emit("change", item?.options);
      state.show = false;
    };

    return {
      ...toRefs(state),
      currentValue,
      confirm,
    };
  },
});
</script>

<style lang="scss" scoped>
.placeholder {
  color: #a8abb2;
}
</style>
