<template>
  <div class="login-item">
    <div class="header vh-between">
      <span class="icon el-icon-arrow-left" @click="$router.go(-1)"></span> 
      <span>房东注册</span>
      <span class="icon"></span>
    </div>
    <div class="item-log">
        <el-form :model="loginParams" :rules="rules" ref="loginParams">
            <el-form-item prop="username" >
                <span class="laber">手机号码：</span>
                <el-input
                  v-model="loginParams.username"
                  maxlength="11"
                  placeholder="请输入手机号码"
                  @input="checkBusinessLicense($event, 'username')"
                  clearable>
                  <i slot="prefix" class="user_icon"></i>
                </el-input>
            </el-form-item>
            <el-form-item prop="nick">
                <span class="laber">房东名称：</span>
                <el-input
                  v-model="loginParams.nick"
                  placeholder="请输入房东名称"
                  clearable>
                  <i slot="prefix" class="user_icon"></i>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <span class="laber">登录密码：</span>
              <el-input
                type="password"
                placeholder="请输入登录密码"
                v-model="loginParams.password"
                maxlength="16"
                @input="checkBusinessLicense($event, 'password')"
                clearable>
                <i slot="prefix" class="password_icon"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="password_confirm">
              <span class="laber">确认密码：</span>
              <el-input
                type="password"
                placeholder="请再次输入密码"
                v-model="loginParams.password_confirm"
                maxlength="16"
                @input="checkBusinessLicense($event, 'password_confirm')"
                clearable>
                <i slot="prefix" class="password_icon"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="code">
              <span class="laber">邀请码：</span>
              <el-input
                placeholder="请输入邀请码"
                v-model="loginParams.code"
                maxlength="8"
                @input="checkBusinessLicense($event, 'code')"
                clearable>
                <i slot="prefix" class="password_code"></i>
              </el-input>
            </el-form-item>
            <div class="login-content mt-40">
              <bg-button
                className="blueWhite"
                width="100%"
                height="46px"
                :loading="BtnLoading"
                @clickHandle="toRigister"
                title="立即注册"
              ></bg-button>
            </div>
        </el-form>
    </div>
  </div>
</template>
<script>
import { rules } from "./js/rules"; //校验规则
import regExp from '@c/lib/util/regexp'
export default {
  data () {
    var validatePass = (rule, value, callback) => {            
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.loginParams.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
    };
    return {
      rules:{
        password_confirm:[
            {validator: validatePass, trigger: 'blur' }
        ],  
        ...rules  
      },
     
      loginParams: {
        username: "",
        nick: "",
        password: "",
        password_confirm: "",
        code: "",
      },
      BtnLoading: false,
      login_flag: true,
    };
  },
  created () {
   
  },
  methods: {
    toRigister() {
      let {  loginParams, $http, $utils } = this;
      this.BtnLoading = true;
      if(!this.login_flag){
        return;
      }
      this.login_flag = false;
      this.$refs.loginParams.validate(valid => {
        if (valid) {
          let params = Object.assign({},loginParams);
          // params.username = $utils.getAES(params.username);       //加密
          // params.password = $utils.getAES(params.password);     //加密
          $http.postNew(this.$api.addlogin,params,"/system")
            .then(res=>{
              this.BtnLoading = false;
              this.$store.commit("set_token", res.token);
              this.$message.success("注册成功")
              this.$router.push({
                path: "/home"
              })
            })
            .catch(req=>{
              this.BtnLoading= false;
              this.login_flag = true;
            })
        } else {
          this.login_flag = true;
          return false;
        }
      });
    },
   
    checkBusinessLicense(e, type) {
      //不允许输入中文
      // this.loginParams[type] = this.$utils.formatNotChinese(e);
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
    
    .item-log {
        width: 80%;
        margin: 20px auto 0;
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
        i.password_code {
            background: url("~@a/images/icon-code-disable1@2x.png") no-repeat center;
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
            i.password_code {
                background: url("~@a/images/icon-code-disable@2x.png") no-repeat center;
                background-size: cover;
            }
        }
    }
   
    .login-content {
        text-align: center;
    }
   
    
}
</style>
