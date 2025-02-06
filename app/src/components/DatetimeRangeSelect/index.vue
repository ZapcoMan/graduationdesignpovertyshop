<template>
  <view>
    <view @click="show = true">
      <text v-if="currentValue">{{ currentValue }}</text>
      <text v-else class="placeholder">{{ placeholder }}</text>
    </view>
    <fui-date-picker
      range
      :show="show"
      type="3"
      @change="change"
      @cancel="show = false"
    />
  </view>
</template>

<script lang="ts">
import dayjs from "dayjs";
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
    modelValue: Array<any>,
  },
  emits: ["update:modelValue", "change"],
  setup(props, { emit }) {
    const state = reactive({ show: false });

    const currentValue = computed(() => {
      return `${
        (props.modelValue?.[0] &&
          dayjs(props.modelValue?.[0]).format("YYYY-MM-DD")) ||
        ""
      } - ${
        (props.modelValue?.[1] &&
          dayjs(props.modelValue?.[1]).format("YYYY-MM-DD")) ||
        ""
      }`;
    });

    const change = ({ startDate, endDate }: any) => {
      const _dateRange = [
        dayjs(startDate.result).toDate(),
        dayjs(endDate.result).toDate(),
      ];
      emit("update:modelValue", _dateRange);
      emit("change", _dateRange);
      state.show = false;
    };

    return {
      ...toRefs(state),
      currentValue,
      change,
    };
  },
});
</script>

<style lang="scss" scoped>
.placeholder {
  color: #a8abb2;
}
</style>
