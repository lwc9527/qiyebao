<template>
  <div id="app">
    <router-view v-loading="!isShow" v-if="isShow" />
  </div>
</template>
<script>
export default {
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isShow: true,
    };
  },
  methods: {
    reload() {
      this.isShow = false;
      this.$nextTick(() => {
        this.isShow = true;
      });
    },
  },
};
</script>
<style lang="scss">

</style>
