<template>
  <div>
    <div class="webApp"  ref="webApp">
      <div class="header vh-between">
        <span class="icon el-icon-arrow-left" @click="$router.go(-1)"></span> 
        <span>{{type=='view'?'出租详情':'退房'}}</span>
        <span class="icon right"></span>
      </div>
      <div class="webApp-body">
        <div class="main-content">
          <div class="item-title"><span class="icon el-icon-s-home"></span>房间信息</div>
          <el-row>
            <el-col :span="24" class="" >
                <div class="base-w">地址：</div>
                <el-input
                  v-model="loginParams.address"
                  :disabled="true"
                ></el-input>
                <span class="icon el-icon-location-information"></span>
            </el-col>
            <el-col :span="24" class="" >
                <div class="base-w">房号：</div>
                <el-input
                  :disabled="true"
                  v-model="loginParams.roomNumber"
                ></el-input>
                <span class="icon" style="color:#559aff;">ABC</span>
            </el-col>
            <el-col :span="24" class="" >
                <div class="base-w">入住：</div>
                <el-input
                  :disabled="true"
                  v-model="loginParams.check_time"
                ></el-input>
                <span class="el-icon-date" />
            </el-col>
            <el-col :span="24" class="" >
                <div class="base-w">到期：</div>
                <el-input
                  :disabled="true"
                  v-model="loginParams.expiration_time"
                ></el-input>
                <span class="el-icon-date" />
            </el-col>
            <el-col :span="24" class="" >
                <div class="base-w">收租日：</div>
                <el-input
                  :disabled="true"
                  v-model="loginParams.taxes_time"
                ></el-input>
                <span class="icon">号</span>
            </el-col>
          </el-row>
          
          <div class="item-title"><span class="icon el-icon-s-custom"></span>租客信息</div>
          <el-row>
            <el-col :span="24" class="" >
                <div class="base-w">名称：</div>
                <el-input
                  v-model="loginParams.name"
                  :disabled="true"
                ></el-input>
            </el-col>
            <el-col :span="24" class="" >
                <div class="base-w">电话：</div>
                <el-input
                  :disabled="true"
                  v-model="loginParams.phone"
                ></el-input>
                <span class="el-icon-phone-outline" />
            </el-col>
            <el-col :span="24" class="" >
                <div class="base-w">证件号：</div>
                <el-input
                  :disabled="true"
                  v-model="loginParams.id_number"
                ></el-input>
                <span class="el-icon-user" />
            </el-col>
            <el-col :span="24" class="" >
                <div class="base-w">证件：</div>
                <el-image
                 :src="loginParams.imgUrl"
                ></el-image>
            </el-col>
          </el-row>
          
          <div class="item-title"><span class="icon el-icon-money"></span>费用约定</div>
          <el-row>
            <el-col :span="24" class="" >
                <div class="base-w">房租：</div>
                <el-input
                  v-model="loginParams.house_price "
                  :disabled="true"
                ></el-input>
                <span class="icon">元/期</span>
            </el-col>
            <el-col :span="24" class="" >
                <div class="base-w">管理费：</div>
                <el-input
                  v-model="loginParams.administrative_fee "
                  :disabled="true"
                ></el-input>
                <span class="icon">元/月</span>
            </el-col>
          </el-row>

          <div class="item-title"><span class="icon el-icon-timer"></span>{{type=='view'?'仪表值':`仪表费￥：${700}`}}</div>
          <el-row>
            <el-col :span="24" class="" >
                <div class="base-w">水价：</div>
                <el-input
                  :disabled="true"
                  v-model="loginParams.waterPrice"
                ></el-input>
                <span class="icon">元/吨</span>
            </el-col>
            <el-col :span="24" class="" >
                <div class="base-w">电价：</div>
                <el-input
                  :disabled="true"
                  v-model="loginParams.electricPrice"
                ></el-input>
                <span class="icon">元/度</span>
            </el-col>
            <el-col :span="24" class=""  v-if="type=='view'">
                <div class="base-w">水底：</div>
                <el-input
                  :disabled="true"
                  v-model="loginParams.waterBottom"
                ></el-input>
                <span class="icon">吨</span>
            </el-col>
            <el-col :span="24" class=""  v-if="type=='view'">
                <div class="base-w">电底：</div>
                <el-input
                  :disabled="true"
                  v-model="loginParams.electricBottom"
                ></el-input>
                <span class="icon">度</span>
            </el-col>
            <el-col :span="24" class=""  v-if="type=='edit'">
                <div class="base-w">当前水表：</div>
                <el-input
                  v-model="loginParams.waterBottom"
                   maxlength="10"
                   clearable
                ></el-input>
                <span class="icon">吨</span>
                <p class="explain">最近水表值：10</p>
            </el-col>
            <el-col :span="24" class=""  v-if="type=='edit'">
                <div class="base-w">当前电表：</div>
                <el-input
                  maxlength="10"
                  clearable
                  v-model="loginParams.electricBottom"
                ></el-input>
                <span class="icon">度</span>
                <p class="explain">最近电表值：10</p>
            </el-col>
          </el-row>

          <div  class="item-title"><span class="icon el-icon-money"></span>{{type=='view'?'收到款项':`押金￥：${700}`}}</div>
          <el-row>
            <el-col :span="24" class="" >
                <div class="base-w">租房押金：</div>
                <el-input
                  v-model="loginParams.house_price "
                  :disabled="true"
                ></el-input>
                <span class="icon">元</span>
            </el-col>
            <el-col :span="24" class="" >
                <div class="base-w">钥匙押金：</div>
                <el-input
                  v-model="loginParams.administrative_fee "
                  :disabled="true"
                ></el-input>
                <span class="icon">元/月</span>
            </el-col>
            <el-col :span="24" class="" >
                <div class="base-w">门卡押金：</div>
                <el-input
                  v-model="loginParams.administrative_fee "
                  :disabled="true"
                ></el-input>
                <span class="icon">元/月</span>
            </el-col>
            <el-col :span="24" class="" v-if="type=='view'" >
                <div class="base-w">本期房租：</div>
                <el-input
                  v-model="loginParams.administrative_fee "
                  :disabled="true"
                ></el-input>
                <span class="icon">元/月</span>
            </el-col>
            <el-col :span="24" class=""  v-if="type=='view'">
                <div class="base-w">下期房租：</div>
                <el-input
                  v-model="loginParams.administrative_fee "
                  :disabled="true"
                ></el-input>
                <span class="icon">元/月</span>
            </el-col>
          </el-row>

          <div  class="item-title" v-if="type=='edit'"><span class="icon el-icon-money"></span>应扣租金￥：700</div>
          <el-row v-if="type=='edit'">
           <el-col :span="24" class=""  >
                <div class="base-w">应扣房租：</div>
                <el-input
                  maxlength="10"
                  clearable
                  v-model="loginParams.electricBottom"
                ></el-input>
                <span class="icon">元</span>
            </el-col>
           <el-col :span="24" class="" >
                <div class="base-w">应退房租：</div>
                <el-input
                  maxlength="10"
                  clearable
                  v-model="loginParams.electricBottom"
                ></el-input>
                <span class="icon">元</span>
            </el-col>
          </el-row>

          <div  class="item-title" v-if="type=='edit'"><span class="icon el-icon-money"></span>其它￥：700</div>
          <el-row v-if="type=='edit'">
           <el-col :span="24" class=""  >
                <div class="base-w">损坏赔偿：</div>
                <el-input
                  maxlength="10"
                  clearable
                  v-model="loginParams.electricBottom"
                ></el-input>
                <span class="icon">元</span>
            </el-col>
           <el-col :span="24" class="" >
                <div class="base-w">违约金：</div>
                <el-input
                  maxlength="10"
                  clearable
                  v-model="loginParams.electricBottom"
                ></el-input>
                <span class="icon">元</span>
            </el-col>
          </el-row>

          <div  class="item-title" v-if="type=='edit'"><span class="icon el-icon-money"></span>缴费</div>
          <el-row v-if="type=='edit'">
           <el-col :span="24" class=""  >
               <span id="balance">租客余额￥570=<span style="font-size:13px;">押金570</span></span>
           </el-col>
           <el-col :span="24" class=""  >
               <span id="balance">应扣￥80=<span style="font-size:13px;">仪表费0+应扣房租80</span></span>
           </el-col>
           <el-col :span="24" class=""  >
               <span id="balance">应退￥490=<span style="font-size:13px;">租客余额570-应扣80</span></span>
           </el-col>
          </el-row>


          <div class="item-title"><span class="icon el-icon-s-marketing"></span>备注</div>
          <el-row>
            <el-col :span="24" class="" >
                <div class="base-w">备注：</div>
                <el-input
                  :disabled="true"
                  v-model="loginParams.remarks"
                ></el-input>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="footer" v-if="type=='edit'">
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
      type:this.$route.query.type,
      id:this.$route.query.id,
      loginParams: {
        address: "深圳宝安区",
        roomNumber: "8888",
        check_time: "2020-02-20",
        expiration_time: "2020-02-20",
        taxes_time: "6",
        imgUrl:"https://qncdn.wanshifu.com/dcfa37fea5f0406259e3e33fc3efbd81",
        id_number:'4444444444444444',
        phone:"135454545",
        name:"中国人",
        house_price:"888",
        administrative_fee:"555",

        floor: "15",
        area: "深圳宝安区",
        management: "",
        waterPrice: "",
        electricPrice: "",
        waterBottom: "",
        electricBottom: "",
        balance: "",
        date: "",
        checked: "",
        advance: "",
      },
      loading: false,
     
    };
  },
  created() {
  },
  mounted() {},
  methods: {
    submit(){

    },
    getChange(){

    },
    getdel(){
      let { $http, $utils } = this;
      this.BtnLoading = true;
      let parms ={
        house_id:this.id
      }
      this.$confirm('确定退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        $http.postNew(this.$api.delHouse,parms)
        .then(res=>{
          this.BtnLoading = false;
          this.$message.success("删除成功")
          this.$router.push({ path:'/rentResources'})
        })
        .catch(req=>{
          this.BtnLoading= false;
        })
        
      }).catch(() => {});
      
    },
    checkBusinessLicense(e, type) {
      //不允许输入中文
      this.applyInvoiceData[type] = this.$utils.formatNotChinese(e);
    },
   
   
   
  }
};
</script>
<style lang="scss" scoped>
.ml10 {
  margin-left: 10px;
}
.el-input__inner{
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
  .explain{
    font-size: 12px;
    color: #636363;
    margin-left: 30px;
  }
  .header{
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
    .item-title{
        padding: 0 20px;
        height: 40px;
        line-height: 40px;
        background: #f5f5f5;
        color: #333;
        font-size: 16px;
        span{
          margin-right:10px;
          font-size: 18px;
          color:#559aff;
        }
    }
    .el-col{
        position: relative;
        .upload{
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
      font-size:16px;
      position: relative;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-bottom:1px solid #f5f5f5;
      padding:6px 20px;
      .icon{
        color:#666;
      }
      .el-icon-location-information{
        color:#559aff;
        font-size:18px;
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

.info{
  margin-top:40px;
}

.readonly{
    color: #AEB3BC;
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
  border:2px dashed #DCDFE6;
  border-radius: 8px;
  position: relative;
  .newicon {
    position: absolute;
    left:50%;
    top:40%;
    transform: translate(-50%,-50%);
    font-size: 28px;
    color:#AEB3BC;
  }
  .new-upload {
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  p {
    width: 100%;
    font-size: 16px;
    color:#AEB3BC;
    text-align: center;
    position: absolute;
    bottom: 14px;
    left: 50%;
    transform: translate(-50%,0);
  }
}
::v-deep .el-input__inner {
  border:none;
}
::v-deep .el-input__inner:hover {
  border:none;
}
.base-w {
  width: 80px;
  color:#666;
}
::v-deep input::-webkit-input-placeholder{
  font-weight: normal;
  font-size: 16px;
}
::v-deep input:-moz-placeholder{
  font-weight: normal;
  font-size: 16px;

}
::v-deep input::-moz-placeholder{
  font-weight: normal;
  font-size: 16px;
}
</style>
