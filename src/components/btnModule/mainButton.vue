<template>
  <div class="main-button-wrapper">
    <el-button
      @click="buttonClick"
      :disabled="disabled"
      :class="types"
      :loading="loading"
    >{{ buttonWord }}</el-button>
  </div>
</template>

<script>
export default {
  props: {
    buttonWord: {
      type: String
    },
    disabled: {
      type: Boolean
    },
    loading: {
      type: Boolean
    },
    types: {
      type: String
    }
  },
  data() {
    return {
    
    };
  },
  created() {},
  methods: {
    buttonClick() {
      this.$emit("buttonClick");
    }
  }
};
</script>

<style lang="scss" scoped>
.main-button-wrapper {
  display: inline-block;
  .el-button {
    min-width: 100px;
    height: 36px;
    color: #fff;
    background-color: #6fb5ec;
    font-size: 13px;
    margin-right: 20px;
    padding: 0;
    border: none;
    &.temp {
      background-color: #ecbe6b;
    }
  }
  .border-b{
    background-color: #569AFF;
    color: #fff;
  }
  //暂存
  .el-button.cancelBtn {
    background-color: #fff;
    color: #434f58;
    border: 1px solid #dcdfe6;
    &.turn {
      color: #e35f5f;
    }
  }
  .el-button:hover {
    background: #54a7e8;
    color: #fff;
  }
  .el-button.cancelBtn:hover {
    background-color: #dcdfe6;
  }
  //编辑
  .el-button.edit {
    background-color: #77cae2;
  }
  .el-button.edit:hover {
    background-color: #54b8d5;
  }
  //放弃投标
  .el-button.give {
    background-color: #ec9999;
  }
  .el-button.give:hover {
    background-color: #e37070;
    color: #fff;
  }
  //新建
  .el-button.temp:hover {
    background: #edad38;
  }
  .el-button.is-disabled {
    background: #d8d8d8;
    color: #fff;
  }
  .el-button.temp.is-disabled {
    background: #d8d8d8;
    color: #fff;
  }
  // 默认
  .el-button.default {
    border: 1px solid #dcdfe6;
    background: #fff;
    color: #53555A;
    &:hover {
      border: 1px solid #dcdfe6;
      background: #fff;
    }
    &.is-disabled {
      background: #d8d8d8;
      color: #fff;
    }
  }
  //按钮点击水波纹效果
  .el-button {
    position: relative;
    //隐藏溢出的径向渐变背景
    overflow: hidden;
  }
  .el-button:after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    //设置径向渐变
    background-image: radial-gradient(circle, #666 10%, transparent 10.01%);
    background-repeat: no-repeat;
    background-position: 50%;
    transform: scale(10, 10);
    opacity: 0;
    transition: transform 0.3s, opacity 0.5s;
  }
  .el-button:active:after {
    transform: scale(0, 0);
    opacity: 0.3;
    //设置初始状态
    transition: 0s;
  }
}
</style>
