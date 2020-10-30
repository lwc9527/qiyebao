<template>
  <div class="login-item">
    <div class="item-img"><img src="~@a/images/logo.jpg" alt=""></div>
    <div class="item-log">
        <el-form :model="loginParams" :rules="rules" ref="loginParams">
            <el-form-item prop="username" >
                <span class="laber">账号：</span>
                <el-input
                  v-model="loginParams.username"
                  placeholder="请输入账号"
                  @keyup.enter.native="toLogin"
                  @input="checkBusinessLicense($event, 'username')"
                  clearable>
                  <i slot="prefix" class="user_icon"></i>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <span class="laber">密码：</span>
              <el-input
                type="password"
                placeholder="请输入密码"
                v-model="loginParams.password"
                maxlength="16"
                @keyup.enter.native="toLogin"
                @input="checkBusinessLicense($event, 'password')"
                clearable>
                <i slot="prefix" class="password_icon"></i>
              </el-input>
            </el-form-item>
            <div class="login-content mt-40">
              <bg-button
                className="blueWhite"
                width="100%"
                height="46px"
                :loading="BtnLoading"
                @clickHandle="toLogin"
                title="登录"
              ></bg-button>
            </div>
            <router-link to="/register" tag="div" class="login-content mt-20">
              <el-button style="width:100%">免费注册</el-button>
            </router-link>
        </el-form>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      rules:{
        username: [{
          required: true,
          message: '请输入账号',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
      },
      loginParams: {
        username: "",
        password: "",
      },
      BtnLoading: false,
      login_flag: true,
    };
  },
  created () {
   
  },
  methods: {
    toLogin() {
      console.log(111)
       this.$router.push({
          path: "/home"
        })
      // let {  loginParams, $http, $utils } = this;
      // this.BtnLoading = true;
      // if(!this.login_flag){
      //   return;
      // }
      // this.login_flag = false;
      // this.$refs.loginParams.validate(valid => {
      //   if (valid) {
      //     let params = Object.assign({},loginParams);
      //     // params.username = $utils.getAES(params.username);       //加密
      //     // params.password = $utils.getAES(params.password);     //加密
      //     $http.postNew(this.$api.myLogin,params,"/system")
      //       .then(res=>{
      //         this.BtnLoading = false;
      //         console.log(res)
      //         this.$store.commit("set_token", res.token);
      //         this.$message.success("登录成功")
      //         this.$router.push({
      //           path: "/home
      //         })
      //       })
      //       .catch(req=>{
      //         this.BtnLoading= false;
      //         this.login_flag = true;
      //       })
      //   } else {
      //     this.login_flag = true;
      //     return false;
      //   }
      // });
    },
    
    checkBusinessLicense(e, type) {
      //不允许输入中文
      this.loginParams[type] = this.$utils.formatNotChinese(e);
    },
  }
};
</script>
<style lang="scss" scoped>

.login-item {
    width: 100%;
    .el-form-item{
      margin-bottom:10px;
      .el-input{
        font-size: 14px;
      }
    }
    .item-title {
        color: #334B72;
        text-align: center;
        font-size: 16px;
        line-height: 70px;
    }
    .item-img{
        width: 100%;
        margin: 70px 0 30px;
        text-align: center;
        img{
            width: 70px;
            height: 70px;
            border-radius: 50%;
            border: 1px solid #f5f5f5;
        }
    }
    .item-log {
        width: 80%;
        margin: 0 auto;
        box-sizing: border-box;
        .laber{
            font-size: 14px;
        }
        .el-input__inner {
            color: #00C2FF;
            border: none;
            font-size:14px !important;
        }
        .el-button--success{
            width: 150px;
            height:34px;
            line-height:34px;
            font-size:13px;
            text-align: center;
            margin:0 2px;
            padding:0;
        }
        i {
            position: absolute;
            width: 24px;
            height: 24px;
            left: 1px;
            top: 50%;
            transform: translateY(-50%);
        }
        i.user_icon {
            background: url("~@a/images/icon-user-disable1@2x.png") no-repeat center;
            background-size: cover;
        }
        i.password_icon {
            background: url("~@a/images/icon-password-disable1@2x.png") no-repeat center;
            background-size: cover;
        }
        &:hover {
            i.user_icon {
                background: url("~@a/images/icon-user-disable@2x.png") no-repeat center;
                background-size: cover;
            }
            i.password_icon {
                background: url("~@a/images/icon-password-disable@2x.png") no-repeat center;
                background-size: cover;
            }
        }
    }
   
    .login-content {
        text-align: center;
    }
   
    
}
</style>
