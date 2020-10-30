<template>
  <div>
    <div class="webApp"  ref="webApp">
      <div class="header vh-between">
        <span class="icon el-icon-arrow-left" @click="$router.go(-1)"></span> 
        <span>{{num=='1'?'出租登记':'出租详情'}}</span>
        <span class="icon right" @click="getdel()" v-if="num=='2'">删除<span class="el-icon-delete"></span></span>
        <span class="icon" v-else></span>
      </div>
      <div class="webApp-body">
        <div class="main-content">
          <div class="item-title"><span class="icon el-icon-postcard"></span>租客信息</div>
          <el-row>
            <el-col :span="24" class="" >
                <div class="base-w">姓名：</div>
                <el-input
                  clearable
                  maxlength="10"
                  v-model="params.user_name"
                  placeholder="请输入租客名称"
                ></el-input>
                <span class="icon el-icon-user"></span>
            </el-col>
            <el-col :span="24" class="" >
                <div class="base-w">电话：</div>
                <el-input
                  clearable
                  maxlength="10"
                  v-model="params.user_phone"
                  placeholder="请输入租客电话"
                ></el-input>
                <span class="icon el-icon-phone-outline"></span>
            </el-col>
             <el-col :span="24" class="" >
                <div class="base-w">入住：</div>
                <el-date-picker
                  v-model="params.start_time"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  :editable="false"
                  placeholder="选择日期">
                </el-date-picker>
                <span class="icon el-icon-date"></span>
            </el-col>
            <el-col :span="24" class="" >
                <div class="base-w">到期：</div>
                <el-date-picker
                  v-model="params.end_time"
                  type="date"
                  :editable="false"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
                <span class="icon el-icon-date"></span>
            </el-col>
            <el-col :span="24" class="" >
                <div class="base-w">证件号：</div>
                <el-input
                  clearable
                  maxlength="10"
                  v-model="params.id_card"
                  placeholder="请输入租客证件号"
                ></el-input>
                <span class="icon el-icon-postcard"></span>
            </el-col>
            <el-col :span="24" class="" >
                <div class="base-w">证件图：</div>
                <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-col>
          </el-row>
          <div class="item-title"><span class="icon el-icon-s-promotion"></span>费用约定</div>
          <el-row>
            <el-col :span="24" class="" >
                <div class="base-w">租金：</div>
                <el-input
                  clearable
                  maxlength="10"
                  v-model="params.rent_price"
                  placeholder="请输入租金"
                ></el-input>
                <span class="icon">元</span>
            </el-col>
            <el-col :span="24" class="" >
                <div class="base-w">租房押金：</div>
                <el-input
                  clearable
                  maxlength="10"
                  v-model="params.house_deposit"
                  placeholder="请输入租房押金"
                ></el-input>
                <span class="icon">元</span>
            </el-col>
            <el-col :span="24" class="" >
                <div class="base-w">钥匙押金：</div>
                <el-input
                  clearable
                  maxlength="10"
                  v-model="params.key_deposit"
                  placeholder="请输入钥匙押金"
                ></el-input>
                <span class="icon">元</span>
            </el-col>
            <el-col :span="24" class="" >
                <div class="base-w">门卡押金：</div>
                <el-input
                  clearable
                  maxlength="10"
                  v-model="params.door_deposit"
                  placeholder="请输入门卡押金"
                ></el-input>
                <span class="icon">元</span>
            </el-col>
            <el-col :span="24" class="" >
                <div class="base-w">钥匙数量：</div>
                <el-input
                  clearable
                  maxlength="10"
                  v-model="params.key_num"
                  placeholder="请输入钥匙数量"
                ></el-input>
                <span class="icon">把</span>
            </el-col>
            <el-col :span="24" class="" >
                <div class="base-w">门卡数量：</div>
                <el-input
                  clearable
                  maxlength="10"
                  v-model="params.door_num"
                  placeholder="请输入门卡数量"
                ></el-input>
                <span class="icon">把</span>
            </el-col>
            <el-col :span="24" class="" >
                <div class="base-w">本期租金：</div>
                <el-input
                  clearable
                  maxlength="10"
                  v-model="params.now_deposit"
                  placeholder="请输入本期租金"
                ></el-input>
                <span class="icon">元</span>
            </el-col>
          </el-row>
          <div class="item-title"><span class="icon el-icon-timer"></span>仪表值</div>
          <el-row>
            <el-col :span="24" class="" >
                <div class="base-w">水表值：</div>
                <el-input
                  clearable
                  maxlength="10"
                  v-model="params.latest_water"
                  placeholder="请输入水表值"
                ></el-input>
                <span class="icon">吨</span>
            </el-col>
            <el-col :span="24" class="" >
                <div class="base-w">电表值：</div>
                <el-input
                  clearable
                  maxlength="10"
                  v-model="params.latest_electric"
                  placeholder="请输入电表值"
                ></el-input>
                <span class="icon">度</span>
            </el-col>
          </el-row>
          <div class="item-title"><span class="icon el-icon-s-marketing"></span>收到款项</div>
          <el-row>
            <el-col :span="24" class="" >
                <div class="base-w">合计：</div>
                <el-input
                  clearable
                  maxlength="10"
                  v-model="params.total_price"
                  placeholder="请输入合计金额"
                ></el-input>
                <span class="icon">元</span>
            </el-col>
            <el-col :span="24" class="" >
                <div class="base-w">备注：</div>
                <el-input
                  clearable
                  v-model="params.content"
                  placeholder="请输入备注"
                ></el-input>
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
      num:this.$route.query.num,//1 登记   2 修改
      info:this.$route.query.info,// 修改时 带过来的数据 回显用
      params: {
        room_id:this.$route.query.id,
        start_time: "",
        end_time: "",
        user_name: "",
        user_phone: "",
        id_card: "",
        latest_water: "",
        latest_electric: "",
        rent_price: "",
        house_deposit: "",
        key_deposit: "",
        door_deposit: "",
        key_num: "",
        door_num: "",
        now_deposit: "",
        total_price: "",
        content: "",
      },
      dialogImageUrl: '',
      dialogVisible: false,
      loading: false,
     
    };
  },
  created() {
    //编辑时 获取路由带过来的数据  回显数据
    if(this.num == 2) this.params = this.info;
  },
  mounted() {},
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    submit(){//提交数据
       let { params,$http} = this;
        console.log(this.params);
        this.BtnLoading = true;
        let apiUrl= this.num == 1 ? this.$api.addRentOut : this.$api.editlessee
        $http.postNew(apiUrl,params)
        .then(res=>{
          this.BtnLoading = false;
          if(res.code == '10000'){
            this.$message.success("添加成功");
            setTimeout(() => this.$router.push("/rentOut") , 1000);
          }
        })
        .catch(req=>{
          this.BtnLoading= false;
        })
     
    },
    getdel(){
      let { $http, $utils,params } = this;
      this.BtnLoading = true;
      let parms ={
        room_id:params.room_id,
      }
      this.$confirm('删除后不可恢复!', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        $http.postNew(this.$api.delRoom,parms)
        .then(res=>{
          this.BtnLoading = false;
          this.$message.success("删除成功")
          this.$router.push('/rentOut')
        })
        .catch(req=>{
          this.BtnLoading= false;
        })
      }).catch(() => {});
    },
    getChange(){

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
::v-deep .el-upload--picture-card {
  width:100px;
  height:100px;
  line-height:100px;
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
