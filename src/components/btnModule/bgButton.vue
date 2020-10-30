<template>
  <el-button type="primary"
             @click.stop="clickHandle"
             :style="{width,height}"
             class="btn-style"
             :class="type"
             :icon="icon"
             :loading="loading"
             :disabled="disabled">
    {{title}}
    <slot name="other"></slot>
  </el-button>
</template>

<script>
export default {
  props: ["icon", "width", "height", "type", "title", "loading", "disabled"],
  methods: {
    clickHandle () {
      this.$emit("clickHandle");
    }
  }
};
</script>


<style lang="scss" scoped>
@import "@/common/style/color.scss";
.btn-style {
  color: $c0;
  padding: 0 14px;
  border-radius: 3px;
  min-width: 80px;
}
.brand-btn {
  font-size: $f-m;
  background: $b-m;
  &:hover {
    background: $m-hover;
  }
  &:focus,
  &:active {
    background: $m-active;
  }
  &.is-disabled {
    background: $dis-c;
  }
}
</style>


