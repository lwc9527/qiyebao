<template>
  <div class="button-wrapper">
    <el-button
      @click.stop="buttonClick"
      :disabled="disabled"
      :style="styleChange"
      :icon="buttonIcon"
    >{{buttonWord}}</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    styleChange() {
      return {
            background: this.buttonColor,
            width: this.buttonWidth,
            borderColor:this.borderColor, 
            height: this.buttonHeight,
            color:this.fontColor,}
        }
  },
  methods: {
    buttonClick() {
      this.$emit("buttonClick", this.buttonWord);
    }
  },
  props: {
    buttonWord:{
        type:String
    },
    "buttonColor":{
        type:String
    },
    "borderColor":{
        type:String
    },
    "buttonWidth":{
        type:String
    },
    "buttonHeight":{
        type:String
    },
    "fontColor":{
        type:String
    },
    "buttonIcon":{
        type:String
    },
    "disabled":{
        type:String
    },
  }
};
</script>
<style lang="scss" >
.button-wrapper {
  display: inline-block;
  .el-button {
    color: #fff;
    padding-top: 10px;
    padding: 0;
  }
}
</style>