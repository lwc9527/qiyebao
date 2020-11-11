<template>
  <div>
    <div class="webApp"  ref="webApp">
      <div class="header vh-between">
        <span class="icon el-icon-arrow-left" @click="$router.go(-1)"></span> 
        <span>我的报案</span>
        <span class="icon right"></span>
      </div>
      <div class="webApp-body">
        <div class="main-content">
          <div class="item-title"><span class="icon el-icon-s-home"></span>安全生产责任险</div>
          <el-row style="padding: 0 10px">
            <el-col :span="24">
                <div class="base-w">保单号：</div>
                <el-input
                  clearable
                  maxlength="21"
                  v-model="loginParams.policyNo"
                  placeholder="请输入保单号"
                ></el-input>
            </el-col>
            <el-col :span="24">
                <div class="base-w">损失类型：</div>
                <el-checkbox-group v-model="loginParams.lossType" @change="clickType">
                  <el-checkbox label="1">人伤</el-checkbox>
                  <el-checkbox label="2">物损</el-checkbox>
                  <el-checkbox label="3">车损</el-checkbox>
                </el-checkbox-group>
            </el-col>
            <el-col :span="24">
                <div class="base-w">出险原因：</div>
                <el-cascader
                    v-model="reason"
                    :options="opts"
                    @change="getReason">
                </el-cascader>
            </el-col>
            
            <el-col :span="24">
                <div class="base-w">出险时间：</div>
                <el-date-picker
                  class="time_pick"
                  format="yyyy-MM-dd HH:mm:ss"
                  v-model="date"
                  type="datetime"
                  placeholder="选择日期">
                </el-date-picker>
            </el-col>
            <el-col :span="24">
                <div class="base-w">出险地点：</div>
                <div class="base-ws" :class="{active:loginParams.areaListvalue}" @click="choose">{{loginParams.areaListvalue?loginParams.areaListvalue:"请选择省市区"}}</div>
                <div class="el-select">
                    <span class="icon el-icon-arrow-up"></span> 
                </div>
            </el-col>
            <el-col :span="24">
                <div class="base-w">详细地址：</div>
                <el-input
                  clearable
                  v-model="loginParams.accidentPlace"
                  placeholder="请输入详细地址"
                ></el-input>
            </el-col>
            <el-col :span="24" class="">
                <div class="base-w">出险经过：</div>
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="loginParams.accidentProcess">
                </el-input>
            </el-col>
            <el-col :span="24">
              <div class="base-w">报损金额：</div>
              <el-col :span="14">
                <el-input
                  @input="onlyNum(loginParams.reportLossSum,'reportLossSum')"
                  clearable
                  type="Number"
                  maxlength="16"
                  v-model="loginParams.reportLossSum"
                  placeholder="请输入报损金额"
                ></el-input>
              </el-col>
              <el-col :span="1">|</el-col>
              <el-col :span="8">
                <el-select v-model="loginParams.lossCurrencyCode">
                  <el-option 
                    style="font-size:12px;"
                    v-for="item in units"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-col>
            <el-col :span="24">
                <div class="base-w">报案人：</div>
                <el-input
                  clearable
                  v-model="loginParams.reporterName"
                  placeholder="请输入报案人姓名"
                ></el-input>
            </el-col>
            <el-col :span="24">
                <div class="base-w">联系电话：</div>
                <el-input
                  clearable
                  maxlength="11"
                  v-model="loginParams.reporterTel"
                  placeholder="请输入联系电话"
                ></el-input>
            </el-col>
           
          </el-row>
        </div>
      </div>
      
      <div class="query_btn">
        <div @click="submit">提交</div>
      </div>
      <!-- <div class="footer">
        <div class="vh-center">
          <el-button class="submit-btn" :loading="loading" @click="submit">保存</el-button>
        </div>
      </div> -->
    
    </div>
    <!-- 省市区选择加隐藏背景 -->
    <div class="hides" v-if="show"></div>
    <div class="divwrap" v-if="show">
      <v-distpicker type="mobile" @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea"></v-distpicker>
    </div>
  </div>
</template>
<script>
import cascadeMap from "@c/lib/cascadeMap.json"; //省市区

export default {
  data() {
    return {
      num:this.$route.query.num,
      reason: '',
      loginParams: {
        policyNo: '', // 保单号
        accidentProcess: '', // 经过
        reporterName: '', // 报案人
        accidentPlace: '', // 出险详细地址
        accidentProcess: '', // 出险经过
        accidentCauseLevel1: '', // 一级原因
        accidentCauseLevel2: '', // 二级原因
        isCargoLoss: 'N', // 是否物损 Y—是,N—否
        isInjured: 'N', // 是否人伤 Y—是,N—否
        isCarLoss: 'N', // 是否车损 Y—是,N—否
        lossType: [], // 损失类型 【1人伤,2物损,3车损】
        cargoLossDetail: '', // 物损详情 有物损时默认传【ZRBDSP0001, ZRBDSP008】
        injuredDetail: '', // 人伤详情
        reportLossSum: '', // 报损金额【非负数且最长16位】
        lossCurrencyCode: '01', // 损失币种【01人民币02港元 03美元,默认传01】
        isSelfClaim: 'Y', // 客户意愿【Y--用户自助理赔,N--非用户自助理赔,默认传Y】
        userId: 'NJAZX00001', // 出险经过
        reportMode: 'F', // 报案方式【与外部第三方对接，默认F】
        reporterTel: '', // 报案人联系电话
        accidentProvinceCode: '', // 出险地点省
        accidentCityCode: '', // 出险地点市
        accidentCountyCode: '', // 出险地点区县
        accidentDate: '', // 出险时间【格式yyyy-mm-dd hh24:mi:ss】

        province:'广东省',
        city:'深圳市',
        county:'宝安区',

        areaListvalue:""
      },
      opts: [
          {
            value: "A61",
            label: '火灾',
            children: [
                { value: "N0160", label: '火灾' }
            ]
          },
          {
            value: "A62",
            label: '爆炸',
            children: [
                {value: "N0449",label: '火药爆炸'},
                {value: "N0450",label: '瓦斯爆炸'},
                {value: "N0451",label: '锅炉爆炸'},
                {value: "N0452",label: '容器爆炸'},
                {value: "N0453",label: '其他爆炸'}
            ]
          },
          {
            value: "A63",
            label: '意外事故',
            children: [
                {value: "N0405",label: '物体打击'}, 
                {value: "N0406",label: '车辆伤害'},
                {value: "N0404",label: '机械伤害'},
                {value: "N0454",label: '起重伤害'},
                {value: "N0455",label: '触电'},
                {value: "N0456",label: '淹溺'},
                {value: "N0457",label: '灼烫'},
                {value: "N0395",label: '高处坠落'},
                {value: "N0458",label: '坍塌'},
                {value: "N0459",label: '冒顶片帮'},
                {value: "N0460",label: '透水'},
                {value: "N0461",label: '放炮'},
                {value: "N0462",label: '中毒和窒息'},
                {value: "N0463",label: '其他伤害'}
            ]
          }
      ],
      cascadeMap:cascadeMap.cascade,
      loading: false,
      flag: true,
      show:false,
      units:[
        {label: '人民币', value: '01'},
        {label: '港元', value: '02'},
        {label: '美元', value: '03'}
      ],
      date: ''
    };
  },
  created() {
  },
  mounted() {},
  methods: {
    clickType(val){
      this.loginParams.isCargoLoss = 'N';// 是否物损 Y—是,N—否
      this.loginParams.isInjured = 'N';// 是否人伤 Y—是,N—否
      this.loginParams.isCarLoss = 'N';// 是否车损 Y—是,N—否
      // 1人伤,2物损,3车损
      if(val.includes('1')){
        this.loginParams.isInjured = 'Y';
      }else if(val.includes('2')){
        this.loginParams.isCargoLoss = 'Y';
      }else if(val.includes('3')){
        this.loginParams.isCarLoss = 'Y';
      }
    },
    getReason(value){
       const [accidentCauseLevel1, accidentCauseLevel2] = value;
       this.form = {
          ...this.form,
          accidentCauseLevel1,
          accidentCauseLevel2
       }
    },
    choose(){
      this.show=!this.show
    },
    onChangeProvince(a){
      console.log('province',a)
      this.loginParams.accidentProvinceCode = a.code;
      this.loginParams.province = a.value;
    },
    onChangeCity(a){
      console.log('city',a)
      this.loginParams.accidentCityCode = a.code;
      this.loginParams.city = a.value; 
    },
    onChangeArea(a){
      console.log('county',a)
      this.loginParams.accidentCountyCode = a.code;
      this.loginParams.county = a.value;  
      this.loginParams.areaListvalue =this.loginParams.province+','+this.loginParams.city+','+this.loginParams.county;
      
      this.show=false
    },     
    submit(){   //保存
      let { loginParams,$http, $utils, $api } = this;
      loginParams.accidentDate = $utils.timeFormat(this.date);
      console.log('form', loginParams)

      if(!this.transmitOk()){
        return
      }
      // if(!this.flag){
      //   return
      // }
      // this.flag = false;
      // this.loading = true;
      console.log('form', $api)
      $http.postNew($api.my_report,loginParams).then(res=>{
          // this.loading = false;
          // if(this.num==1){
          //   this.$message.success("保存成功")
          // }else{
          //   this.$message.success("编辑成功")
          // }
      }).catch(req=>{
          this.loading= false;
          this.flag = true;
      })
    },
    transmitOk(){
      const { reason, loginParams, date  } = this;
      if(!loginParams.policyNo){
        this.$message.error("请填写保单号")
        return
      }
      if(loginParams.lossType.length == 0){
        this.$message.error("请选择损失类型")
        return
      }
      if(!reason){
        this.$message.error("请填写出险原因")
        return
      }
      if(!date){
        this.$message.error("请填写出险时间")
        return
      }
      if(!loginParams.areaListvalue){
        this.$message.error("请选择出险地点")
        return
      }
      if(!loginParams.accidentPlace){
        this.$message.error("请填写详细地址")
        return
      }
      if(!loginParams.accidentProcess){
        this.$message.error("请填写出险经过")
        return
      }
      if(!loginParams.reportLossSum){
        this.$message.error("请填写报损金额")
        return
      }
      if(!loginParams.reporterName){
        this.$message.error("请填写报案人")
        return
      }
      if(!loginParams.reporterTel){
        this.$message.error("请填写联系电话")
        return
      }
      return true;
    },
    checkBusinessLicense(e, type) {
      //不允许输入中文
      this.loginParams[type] = this.$utils.formatNotChinese(e);
    },
    onlyNum(val,name){  //限制输入数字，其它的都不可以输入
        // const reg = /[^0-9]*/g;
        const reg = /[^\d]/g;
        val=val.replace(reg,'');
        this.loginParams[name] = val;
    }, 
    ruleNum (val,name) { //限制输入数值
        val = val.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1');  //清除“数字”和“.”以外的字符  
        val = val.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符  
        val = val.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的  
        val = val.replace(".","$#$").replace(/\./g,"").replace("$#$","."); 
        val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数  
        if(val.indexOf(".")< 0 && val !=""){//以上已经过滤，此处控制的是如果没有小数点
            val= parseFloat(val); 
        }
        this.addObj[name] = val;
    },
    ruleNum1(val,index,name){  //限制输入数字，小数，负数
        val = val.replace(/[^\-?\d.]/g,'');
        val = val.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的  
        val = val.replace(".","$#$").replace(/\./g,"").replace("$#$","."); 
        val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数 
        this.invoiceAddForm.commodityList[index][name] = val;
    }, 
    ruleNum2(val,index,name){ //限制只可以输入数字，负数并且>0
        val = val.replace(/[^\-?\d]|^[0]/g,'');
        this.invoiceAddForm.commodityList[index][name] = val;
    },  
   
  }
};
</script>
<style lang="scss" scoped>
// .el-input__inner{
//   line-height: 100px !important;
// }

// 人民币css
::v-deep .el-input--suffix .el-input__inner {
  font-size: 14px;
}
.webApp {
  background: #fff;
  // padding: 0 0 20vw;
  overflow-y: auto;
  position: absolute;
  // bottom: 50px;
  top: 0px;
  overflow: hidden;

  .query_btn {
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
    div {
      display: inline-block;
      line-height: 40px;
      width: 90%;
      color: #fff;
      font-size: 16px;
      background: linear-gradient(90deg, rgba(255,102,0,.5), rgba(255,102,0,1));
      border-radius: 20px;
    }
  }

  .header{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
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
        padding-left: 20px;
        height: 60px;
        line-height: 60px;
        background: linear-gradient(90deg, rgba(255, 102, 0, 0.5), #ff6600);
        color: #fff;
        font-size: 16px;
        span{
          margin-right:10px;
          font-size: 18px;
          color:#fff;
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
      font-size: 14px;
      position: relative;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-bottom: 1px solid #f5f5f5;
      padding: 6px 20px;
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

::v-deep .el-textarea {
  padding-left: 28px;
  .el-textarea__inner {
    border: none;
    resize: none;
  }
  .el-textarea__inner:hover {
    border: none;
  }
}

.base-ws {
  width: 70%;
  color:#ccc;
  padding-left: 15px;
}
.active{
  color:#333;  
}
.el-icon-caret-bottom {
  width: 10%;
  color:#ccc;
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
// 省市区样式
.hides{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: .5;
}
.divwrap{
    height: 300px;
    overflow-y: auto;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #fff;
    border-top: 1px solid #999;
  }
  .divwrap>>>.distpicker-address-wrapper{
    color: #999;
  }
  .divwrap>>>.address-header{
    position: fixed;
    bottom: 300px;
    width: 100%;
    background: #000;
    color:#fff;
  }
  .divwrap>>>.address-header ul li{
    flex-grow: 1;
    text-align: center;
  }
  .divwrap>>>.address-header .active{
    color: #fff;
    border-bottom:#666 solid 8px
  }
  .divwrap>>>.address-container .active{
    color: #000;
  }

  ::v-deep input::-webkit-input-placeholder,
  ::v-deep textarea::-webkit-input-placeholder{
    font-size: 14px;
  }
  ::v-deep input::-ms-input-placeholder{
    font-size: 14px;
  }
  ::v-deep input::-moz-placeholder{
    font-size: 14px;
  }

</style>
<style>
  .el-picker-panel .el-picker-panel__body-wrapper .el-time-panel {
      left: -15px;
  }
</style>
