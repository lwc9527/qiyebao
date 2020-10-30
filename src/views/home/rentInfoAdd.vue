<template>
  <div>
    <div class="webApp"  ref="webApp">
      <div class="header vh-between">
        <span class="icon el-icon-arrow-left" @click="$router.go(-1)"></span> 
        <span>{{num=='1'?'增加房源':'房源详情'}}</span>
        <span class="icon right" @click="getdel()" v-if="num=='2'">删除<span class="el-icon-delete"></span></span>
        <span class="icon right"  v-else></span>
      </div>
      <div class="webApp-body">
        <div class="main-content">
          <div class="item-title"><span class="icon el-icon-s-home"></span>基本信息</div>
          <el-row>
            <el-col :span="24" class="" >
                <div class="base-w">类型：</div>
                <el-select v-model="loginParams.business_type" placeholder="请选择类型">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-col>
            <el-col :span="24" class="">
                <div class="base-w">户型：</div>
                <el-select v-model="loginParams.house_type_id" placeholder="请选择户型">
                  <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-col>
            <el-col :span="24" class="" >
                <div class="base-w">房号：</div>
                <el-input
                  clearable
                  maxlength="10"
                  v-model="loginParams.house_num"
                  @input="checkBusinessLicense($event, 'house_num')"
                  placeholder="请输入房号"
                ></el-input>
                <span class="icon" style="color:#559aff;">ABC</span>
            </el-col>
            <el-col :span="24" class="" >
                <div class="base-w">租金：</div>
                <el-input
                  clearable
                  maxlength="10"
                  v-model="loginParams.rent_price"
                  @input="checkBusinessLicense($event, 'rent_price')"
                  placeholder="请输入租金"
                ></el-input>
                <span class="icon">元</span>
            </el-col>
            <el-col :span="24" class="" >
                <div class="base-w">收租日：</div>
                <el-input
                  clearable
                  maxlength="10"
                  v-model="loginParams.rent_collection_day"
                  @input="checkBusinessLicense($event, 'rent_collection_day')"
                  placeholder="请输入"
                ></el-input>
                <span class="icon">号</span>
            </el-col>
            <el-col :span="24" class="" >
                <div class="base-w">楼层：</div>
                <el-input
                  clearable
                  maxlength="10"
                  v-model="loginParams.floor"
                  @input="checkBusinessLicense($event, 'floor')"
                  placeholder="请输入楼层"
                ></el-input>
                <span class="icon">楼</span>
            </el-col>
            <el-col :span="24" class="" >
                <div class="base-w">面积：</div>
                <el-input
                  clearable
                  maxlength="10"
                  v-model="loginParams.area"
                  @input="checkBusinessLicense($event, 'area')"
                  placeholder="请输入面积"
                ></el-input>
                <span class="icon">平方</span>
            </el-col>
          </el-row>
          <div class="item-title"><span class="icon el-icon-s-promotion"></span>固定费用</div>
          <el-row>
            <el-col :span="24" class="" >
                <div class="base-w">管理费：</div>
                <el-input
                  clearable
                  maxlength="10"
                  v-model="loginParams.management_price"
                  @input="checkBusinessLicense($event, 'management_price')"
                  placeholder="请输入管理费"
                ></el-input>
                <span class="icon">元/月</span>
            </el-col>
          </el-row>
          <div class="item-title"><span class="icon el-icon-timer"></span>仪表值</div>
          <el-row>
            <el-col :span="24" class="" >
                <div class="base-w">水价：</div>
                <el-input
                  clearable
                  maxlength="10"
                  v-model="loginParams.water_price"
                  @input="checkBusinessLicense($event, 'water_price')"
                  placeholder="请输入水价"
                ></el-input>
                <span class="icon">元/吨</span>
            </el-col>
            <el-col :span="24" class="" >
                <div class="base-w">电价：</div>
                <el-input
                  clearable
                  maxlength="10"
                  v-model="loginParams.electric_price"
                  @input="checkBusinessLicense($event, 'electric_price')"
                  placeholder="请输入电价"
                ></el-input>
                <span class="icon">元/度</span>
            </el-col>
            <el-col :span="24" class="" >
                <div class="base-w">水最低用量：</div>
                <el-input
                  clearable
                  maxlength="10"
                  v-model="loginParams.water_low"
                  @input="checkBusinessLicense($event, 'water_low')"
                  placeholder="请输入最低用水"
                ></el-input>
                <span class="icon">吨</span>
            </el-col>
            <el-col :span="24" class="" >
                <div class="base-w">电最低用量：</div>
                <el-input
                  clearable
                  maxlength="10"
                  v-model="loginParams.electric_low"
                  @input="checkBusinessLicense($event, 'electric_low')"
                  placeholder="请输入最低用电"
                ></el-input>
                <span class="icon">度</span>
            </el-col>
            <el-col :span="24" class="" >
                <div class="base-w">入住水表值：</div>
                <el-input
                  clearable
                  maxlength="10"
                  v-model="loginParams.latest_water"
                  @input="checkBusinessLicense($event, 'latest_water')"
                  placeholder="请输入水价值"
                ></el-input>
                <span class="icon">吨</span>
            </el-col>
            <el-col :span="24" class="" >
                <div class="base-w">入住电表值：</div>
                <el-input
                  clearable
                  maxlength="10"
                  v-model="loginParams.latest_electric"
                  @input="checkBusinessLicense($event, 'latest_electric')"
                  placeholder="请输入电表值"
                ></el-input>
                <span class="icon">度</span>
            </el-col>
          </el-row>
          <div class="item-title"><span class="icon el-icon-s-marketing"></span>收租信息</div>
          <el-row>
            <el-col :span="24" class="" >
                <div class="base-w">结算周期：</div>
                <el-select v-model="loginParams.settlement_period" placeholder="请选择">
                  <el-option
                    v-for="item in options3"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-col>
            <el-col :span="24" class="" >
                <div class="base-w">推荐状态：</div>
                <el-select v-model="loginParams.reco_status" placeholder="请选择">
                  <el-option
                    v-for="item in options5"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-col>
            <el-col :span="24" class="" >
                <div class="base-w">房源状态：</div>
                <el-select v-model="loginParams.status" placeholder="请选择">
                  <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-col>
            <el-col :span="24" class="" >
                <div class="base-w">出租状态：</div>
                <el-select v-model="loginParams.lease_status" placeholder="请选择">
                  <el-option
                    v-for="item in options4"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-col>
            <el-col :span="24" class="" >
                <div class="base-w">提前：</div>
                <el-input
                  clearable
                  maxlength="10"
                  v-model="loginParams.advance_day"
                  @input="checkBusinessLicense($event, 'advance_day')"
                  placeholder="请输入"
                ></el-input>
                <span class="icon">天</span>
            </el-col>
            <el-col :span="24" class="" >
                <div class="base-w">备注：</div>
                <el-input
                  clearable
                  v-model="loginParams.content"
                  placeholder="请输入备注"
                ></el-input>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="footer">
        <div class="vh-center">
          <el-button class="submit-btn" :loading="loading" @click="submit">{{num==1?"保存":"编辑保存"}}</el-button>
        </div>
      </div>
    
    </div>
    
  </div>
</template>
<script>


export default {
  data() {
    return {
      num:this.$route.query.num,
      loginParams: {
        house_id: this.$route.query.id,
        room_id:this.$route.query.room_id,
        house_num: "",         //房间号403
        business_type: 1,  //商业类型 1居住 2商铺 3厂房 4办公 5仓库 6其他',
        house_type_id: 1,    //1 一室一厅  2 两室一厅  3 三室一厅  4三室两厅  5单房  6单门面商铺  7 双门面商铺
        content: "",    //备注
        floor: "",    //楼层
        area: "",     //面积
        rent_price: "",  //租金
        water_price: "",  //水价
        water_low: "",   //水最低用量
        latest_water: "",   //入住水表值
        electric_price: "",  //电价
        electric_low: "",   // 电最低价
        latest_electric: "",  //入住水表值
        management_price: "",   //管理费
        rent_collection_day: "", //收租日
        advance_day: "",  //提前多少天提醒
        content: "",  //备注
        status: 1,  //'1正常0停用',
        lease_status: 0,  //0未出租1已出租
        reco_status: 1,  // 1.推荐 2.不推荐',
        settlement_period: 1,    // 结算周期单位月
      },
      options: [
        {value: 1,label: '居住'}, 
        {value: 2,label: '商铺'}, 
        {value: 3,label: '厂房'}, 
        {value: 4,label: '办公'},
        {value: 5,label: '仓库'},
        {value: 6,label: '其它'},
      ],
      options1: [
        {value: 1,label: '一室一厅'}, 
        {value: 2,label: '两室一厅'}, 
        {value: 3,label: '三室一厅'},
        {value: 4,label: '三室两厅'},
        {value: 5,label: '单间'}, 
        {value: 6,label: '单门面商铺'}, 
        {value: 7,label: '双门面商铺'}, 
      ],
      options2: [
        {value: 1,label: '正常'}, 
        {value: 0,label: '停用'}, 
      ],
      options3: [
        {value: 1,label: '月'}, 
        {value: 3,label: '季'}, 
        {value: 6,label: '半年'}, 
        {value:12,label: '1年'}, 
      ],
      options4: [
        {value: 1,label: '已出租'}, 
        {value: 0,label: '未出租'}, 
      ],
      options5: [ 
        {value: 1,label: '推荐'}, 
        {value: 2,label: '不推荐'}, 
      ],
      loading: false,
      flag: true,
    };
  },
  created() {
    if(this.num=='2'&&this.$route.query.room_id){
      this.getInfo();
    }
  },
  mounted() {},
  methods: {
    getInfo(){   //查询信息
      let { $http, $utils } = this;
      this.BtnLoading = true;
      let parms ={
        house_id: this.$route.query.id,
        room_id:this.$route.query.room_id,
      }
      $http.postNew(this.$api.roominfo,parms)
        .then(res=>{
          this.BtnLoading = false;
          this.loginParams = res.data[0];
        })
        .catch(req=>{
          this.BtnLoading= false;
        })
    },
    submit(){   //保存
      let { loginParams,$http, $utils } = this;
      if(!this.transmitOk()){
        return
      }
      if(!this.flag){
        return
      }
      this.flag = false;
      this.loading = true;
      let url = this.num==1? this.$api.addRoom :this.$api.editRoom; 
      $http.postNew(url,loginParams)
        .then(res=>{
          this.loading = false;
          if(this.num==1){
            this.$message.success("保存成功")
          }else{
            this.$message.success("编辑成功")
          }
          this.$router.push({ path:'/rentResources'})
        })
        .catch(req=>{
          this.loading= false;
          this.flag = true;
        })
    },
    transmitOk(){
      if(!this.loginParams.house_num){
        this.$message.error("请输入房号")
        return
      }
      if(!this.loginParams.rent_price){
        this.$message.error("请输入租金")  
        return
      }
      if(!this.loginParams.floor){
        this.$message.error("请输入楼层")
        return
      }
      return true;
    },
    getdel(){
      let { $http, $utils } = this;
      this.BtnLoading = true;
      let parms ={
        room_id:this.$route.query.room_id,
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
  width: 100px;
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
