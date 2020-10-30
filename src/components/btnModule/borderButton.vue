<template>
  <el-button
    type="default"
    @click.stop="clickHandle"
    :style="{ width, height, minWidth }"
    :class="type"
    class="border-btn"
    :loading="loading"
    :disabled="disabled"
  >
    <slot name="left"></slot>
    {{ title }}
    <slot name="right"></slot>
  </el-button>
</template>

<script>
export default {
  props: [
    "type",
    "width",
    "minWidth",
    "height",
    "title",
    "loading",
    "disabled",
  ],
  methods: {
    clickHandle() {
      this.$emit("clickHandle");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/common/style/color.scss";
@import "@/common/style/common.scss";
.border-btn {
  padding: 0 14px;
  font-size: 14px;
  border-radius: 3px;
  min-width: 80px;
  &:focus,
  &:active {
    background: $c0;
  }
  span {
    @include flex-custom(center, center);
  }
}
.defBorder-btn {
  border: 1px solid $br-d;
  color: $f-m !important;
  &:hover,
  &:active {
    background: $grey-c !important;
  }
}
.mainBorder-btn {
  border: 1px solid $br-d;
  color: $b-m !important;
  &:hover,
  &:active {
    background: $b-g !important;
  }
}
.refuBorder-btn {
  border: 1px solid $br-ref;
  color: $f-ref !important;
  &:hover,
  &:active {
    background: $refused-c !important;
  }
}
</style>
