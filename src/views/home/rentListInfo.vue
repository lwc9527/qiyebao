<template>
  <div>
    <div class="webApp" ref="webApp">
      <div class="header vh-between">
        <span class="icon el-icon-arrow-left" @click="$router.go(-1)"></span>
        <span>房租详情</span>
        <span class="icon"></span>
      </div>
      <div class="webApp-body">
        <div class="main-content">
          <div class="item-title">
            <span class="icon el-icon-postcard"></span>租客信息
          </div>
          <el-row>
            <el-col :span="24" class>
              <div class="base-w">收账时间：</div>
              <el-input :disabled="true" v-model="params.bill_time"></el-input>
              <span class="icon el-icon-user"></span>
            </el-col>
            <el-col :span="24" class>
              <div class="base-w">记账期数：</div>
              <el-input :disabled="true" v-model="params.month"></el-input>
              <span class="icon el-icon-phone-outline"></span>
            </el-col>
            <el-col :span="24" class>
              <div class="base-w">期数备注：</div>
              <el-input :disabled="true" v-model="params.month_content"></el-input>
              <span class="icon el-icon-phone-outline"></span>
            </el-col>
            <el-col :span="24" class>
              <div class="base-w">记录水表值：</div>
              <el-input :disabled="true" v-model="params.latest_water"></el-input>
              <span class="icon el-icon-phone-outline"></span>
            </el-col>
            <el-col :span="24" class>
              <div class="base-w">记录电表值：</div>
              <el-input :disabled="true" v-model="params.latest_electric"></el-input>
              <span class="icon el-icon-phone-outline"></span>
            </el-col>
          </el-row>

          <div class="item-title">
            <span class="icon el-icon-s-promotion"></span>费用约定
          </div>
          <el-row>
            <el-col :span="24" class>
              <div class="base-w">租金：</div>
              <el-input :disabled="true" v-model="params.rent_price"></el-input>
              <span class="icon el-icon-phone-outline"></span>
            </el-col>
            <el-col :span="24" class>
              <div class="base-w">管理费：</div>
              <el-input :disabled="true" v-model="params.management_price"></el-input>
              <span class="icon el-icon-phone-outline"></span>
            </el-col>
          </el-row>

          <div class="item-title">
            <span class="icon el-icon-timer"></span>仪表值
          </div>
          <el-row>
            <el-col :span="24" class>
              <div class="base-w">现在水表值：</div>
              <el-input clearable maxlength="10" v-model="params.now_electric"    @input="onlyNum(params.now_electric,'now_electric')" placeholder="请输入水表值"></el-input>
              <span class="icon">吨</span>
            </el-col>
            <el-col :span="24" class>
              <div class="base-w">现在电表值：</div>
              <el-input clearable maxlength="10" v-model="params.now_water"  @input="onlyNum(params.now_water,'now_water')" placeholder="请输入电表值"></el-input>
              <span class="icon">度</span>
            </el-col>
            <el-col :span="24" class>
              <div class="base-w">其它费用：</div>
              <el-input clearable maxlength="10" v-model="params.other_bill"  @input="onlyNum(params.other_bill,'other_bill')" placeholder="请输其它费用"></el-input>
            </el-col>
            <el-col :span="24" class>
              <div class="base-w">其它费用备注：</div>
              <el-input clearable maxlength="10" v-model="params.other_content" placeholder="请输其它费用备注"></el-input>
            </el-col>
            <el-col :span="24" class>
              <div class="base-w">总费用：</div>
              <el-input :disabled="true" v-model="total_bill"></el-input>
            </el-col>
          </el-row>
        </div>
      </div>

      <div class="footer">
        <div class="vh-center">
          <el-button class="submit-btn" :loading="loading" @click="submit">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: this.$route.query.data, // 路由带过来的数据 回显
      params: {},
      loading: false,
      total_bill:""
    };
  },
  created() {
    //编辑时 获取路由带过来的数据  回显数据
    this.params = this.data;
  },
  mounted() {},
  methods: {

    onlyNum(val,name){  //限制输入数字，其它的都不可以输入
        val=val.replace(/[^\d]/g,'');
        this.params[name] = val;
        //同步获取总费用
        this.total_bill = this.getTotalMoney();
    }, 
    submit() {
      //提交数据
      let { params, $http } = this;
      let submitData ={
        other_bill:params.other_bill,
        other_content:params.other_content,
        is_payment:params.is_payment,
        paymentData:params.paymentData,
        paymentMsg:params.paymentMsg
      }
      this.BtnLoading = true;
      $http
        .postNew(this.$api.addListbill, submitData)
        .then(res => {
          this.BtnLoading = false;
          if (res.code == "10000") {
            this.$message.success("保存成功");
            setTimeout(() => this.$router.push("/rentList"), 1000);
          }
        })
        .catch(req => {
          this.BtnLoading = false;
        });
    },
    getTotalMoney() {//获取总费用
      let { params, total_bill } = this;
      //水费= (本期-往期)*单价
      let waterPrice = (Math.floor(params.now_water)-Math.floor(params.latest_water))*Math.floor(params.now_wate_price)
      //电费= (本期-往期)*单价
      let electricPrice = (Math.floor(params.now_electric)-Math.floor(params.latest_electric))*Math.floor(params.now_electric_price)
      //总费用= 水费+电费+管理费 +其他费用+租金
      total_bill = waterPrice+electricPrice+Math.floor(params.management_price)+Math.floor(params.other_bill)+Math.floor(params.rent_price)
      return total_bill;
   },
   
  }
};
</script>
<style lang="scss" scoped>
.ml10 {
  margin-left: 10px;
}
.el-input__inner {
  line-height: 100px !important;
}
.webApp {
  background: #fff;
  // padding: 0 0 20vw;
  overflow-y: auto;
  position: absolute;
  // bottom: 50px;
  top: 0px;
  overflow: hidden;
  .remark {
    font-size: 13px;
  }
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    border-bottom: 1px solid #ccc;
  }
  .webApp-body {
    transition: 0.5s all ease;
    transform: translateY(0px);
    // padding: 0px 3vw 0;
    margin-top: 46px;
    .state {
      position: absolute;
      right: 20px;
      top: 20px;
      font-weight: 550;
      color: red;
    }
    .tips {
      text-align: center;
      font-size: 12px;
    }
  }
  .main-content {
    background: #fff;
    // padding: 0 3vw;
    // border-radius: 16px;
    .item-title {
      padding: 0 20px;
      height: 40px;
      line-height: 40px;
      background: #f5f5f5;
      color: #333;
      font-size: 16px;
      span {
        margin-right: 10px;
        font-size: 18px;
        color: #559aff;
      }
    }
    .el-col {
      position: relative;
      .upload {
        opacity: 0;
        position: absolute;
        left: 76%;
        bottom: 0;
        height: 30px;
      }
    }
    .el-col-24 {
      line-height: 30px;
      // font-weight: 550;
      font-size: 16px;
      position: relative;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-bottom: 1px solid #f5f5f5;
      padding: 6px 20px;
      .icon {
        color: #666;
      }
      .el-icon-location-information {
        color: #559aff;
        font-size: 18px;
      }
    }
    .el-radio {
      margin-right: 4vw;
      line-height: 46px;
    }
    .el-input {
      flex: 1;
      user-select: text;
      -webkit-user-select: text;
    }
    .el-select {
      flex: 1;
    }
    ::v-deep .el-input__icon:hover {
      color: #569aff;
    }
    ::v-deep .el-input__icon {
      width: 16px;
      font-size: 16px;
    }
  }

  //虚线
  .dashed {
    width: 100%;
    height: 1px;
    margin: 0;
    margin: 0 3vw;
    background-image: linear-gradient(
      to right,
      #d8d8d8 0%,
      #d8d8d8 50%,
      transparent 50%
    );
    background-size: 8px 4px;
    background-repeat: repeat-x;
    position: absolute;
    bottom: 0;
  }
  // 实线
  .solid {
    height: 1.5px;
    margin: 3vw 0;
    background-color: #d8d8d8;
  }
  .dashed-top {
    width: 100%;
    height: 1px;
    margin: 3vw 0;
    background-image: linear-gradient(
      to right,
      #d8d8d8 0%,
      #d8d8d8 50%,
      transparent 50%
    );
    background-size: 8px 4px;
    background-repeat: repeat-x;
  }
  .dotted {
    height: 1px;
    margin: 0px 0;
    background-image: linear-gradient(
      to right,
      #d8d8d8 0%,
      #d8d8d8 50%,
      transparent 50%
    );
    background-size: 8px 1px;
    background-repeat: repeat-x;
  }
  .sub-title {
    color: #81838a;
  }
  .main-title {
    color: #333333;
  }

  .footer {
    width: 100%;
    height: 80px;
    z-index: 100;
    margin-top: 30px;
    ::v-deep .el-button {
      height: 40px;
      margin-right: 0;
      margin-left: 0px;
      width: 90%;
      border-radius: 5px;
      color: #fff;
      background-color: #559aff;
      font-size: 16px;
    }
  }

  .rowShop {
    .el-col {
      line-height: 25px;
      font-size: 14px;
      color: #333;
    }
  }
  .rowShopItem {
    .el-col {
      line-height: 30px;
      font-size: 12px;
    }
  }
}

@supports (top: env(safe-area-inset-top)) {
  body,
  .header {
    padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-top);
  }
}

// /* 判断iphoneX 将 footer 的 padding-bottom 填充到最底部 */

@supports (bottom: env(safe-area-inset-bottom)) {
  body,
  .footer {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }
}

.rushRed .el-dialog {
  border-radius: 10px;
}
.el-dialog__footer {
  padding: 0px;
}
.dialog-footer {
  .el-button {
    width: 50%;
    height: 40px;
  }
}

.info {
  margin-top: 40px;
}

.readonly {
  color: #aeb3bc;
  font-size: 16px;
  margin-left: 15px;
}
.photo-seat {
  width: 100%;
  height: 128px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
}
.photo-seat-inner {
  width: 90%;
  // margin: 0 auto;
  height: 88px;
  border: 2px dashed #dcdfe6;
  border-radius: 8px;
  position: relative;
  .newicon {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    font-size: 28px;
    color: #aeb3bc;
  }
  .new-upload {
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  p {
    width: 100%;
    font-size: 16px;
    color: #aeb3bc;
    text-align: center;
    position: absolute;
    bottom: 14px;
    left: 50%;
    transform: translate(-50%, 0);
  }
}
::v-deep .el-upload--picture-card {
  width: 100px;
  height: 100px;
  line-height: 100px;
}
::v-deep .el-input__inner {
  border: none;
}
::v-deep .el-input__inner:hover {
  border: none;
}
.base-w {
  width: 80px;
  color: #666;
}
::v-deep input::-webkit-input-placeholder {
  font-weight: normal;
  font-size: 16px;
}
::v-deep input:-moz-placeholder {
  font-weight: normal;
  font-size: 16px;
}
::v-deep input::-moz-placeholder {
  font-weight: normal;
  font-size: 16px;
}
</style>
