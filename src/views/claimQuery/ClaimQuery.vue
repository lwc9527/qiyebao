<template>
  <div class="main">
    <div class="header vh-between">
      <span class="icon el-icon-arrow-left">理赔查询</span>
      <span class="icon"></span>
    </div>
    <div class="notice">此通道可用于：查看理赔详情,补传理赔材料,完善领款信息</div>
    <div class="item-log">
        <el-form :model="form" ref="form">
            <el-form-item prop="no" >
                <span class="laber">报案号</span>
                <input 
                  type="text" 
                  v-model="form.no"
                  placeholder="请输入报案号"
                >
            </el-form-item>
            <el-form-item prop="username" >
                <span class="laber">姓名</span>
                <input 
                  type="text" 
                  v-model="form.username"
                  placeholder="请输入被保险人姓名"
                >
            </el-form-item>
            <el-form-item prop="code" >
                <span class="laber">证件号</span>
                <input 
                  type="text" 
                  style="border:none"
                  v-model="form.code"
                  placeholder="请输入被保险人证件号"
                >
            </el-form-item>
            <div class="query_btn"> 
              <el-button style="width:100%;font-size:14px" type="primary" round @click="query">查詢</el-button>
            </div>
        </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        username: "",
        no: "",
        code: "",
      }
    };
  },
  created () {
   
  },
  methods: {
   query(){
     console.log(111, this.form)
   }
  }
}
</script>
<style lang="scss" scoped>
.main {
  .notice {
    margin: 0;
    height: 40px;
    width: 100%;
    line-height: 40px;
    font-size: 14px;
    color: #ff6600;
    text-align: center;
    background: #fff; 
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    // &::after{
    //   position: absolute;
    //   content: '';
    //   background: #f5f5f5;
    //   display: block;
    //   width: 100%;
    //   height: 1px; /*no*/
    //   transform: scale(1, 0.5);
    //   bottom: 0px;
    //   left: 0;
    // }
  }
  .item-log {
      padding: 0 20px 20px 20px;
      background: #fff;
      .el-form-item {
        position: relative;
        border-bottom: 1px solid #f5f5f5;
        // &::after{
        //   position: absolute;
        //   content: '';
        //   background: #f5f5f5;
        //   display: block;
        //   width: 100%;
        //   height: 1px; /*no*/
        //   transform: scale(1, 0.5);
        //   bottom: -10px;
        //   left: 0;
        // }
        .el-form-item__content {
          span {
            display: inline-block;
            width: 20%;
          }
          input {
            display: inline-block;
            width: 80%;
            line-height: 40px;
          }
        }

      }
      
      .query_btn {
        margin-top: 20px;
        .el-button--primary {
          border-color: transparent;
          background: linear-gradient(90deg, rgba(255,102,0,.5), rgba(255,102,0,1));
        }
      }
  }
}
</style>
