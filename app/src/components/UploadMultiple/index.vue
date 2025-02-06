<template>
  <fui-upload
    immediate
    :url="url"
    @success="success"
    @error="error"
    @complete="complete"
  />
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { baseURL } from "@/utils";

export default defineComponent({
  components: {},
  props: {
    modelValue: {
      type: [String],
      default: null,
    },
  },
  emits: ["update:modelValue", "change"],
  setup(props, { emit }) {
    const state = reactive({ url: `${baseURL}/uploadimage` });

    //上传成功时触发
    const success = (e: any) => {
      const res = JSON.parse(e.res.data.replace(/\ufeff/g, "") || "{}");
      if (res?.data?.list && res?.data?.list[0]) {
        const _list =
          props.modelValue?.split(",")?.map((url: string) => url) || [];
        const _value = _list.concat([res?.data?.list[0]]).join(",");
        emit("update:modelValue", _value);
      }
    };

    //上传失败时触发
    const error = (e: any) => {
      console.log("error", e);
    };

    //选择图片或上传完成时触发
    const complete = (e: any) => {
      console.log("complete", e);
    };
    return {
      ...toRefs(state),
      success,
      error,
      complete,
    };
  },
});
</script>

<style lang="scss" scoped></style>
