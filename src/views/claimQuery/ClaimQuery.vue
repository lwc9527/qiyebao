<template>
  <div>
    <div class="webApp" ref="webApp">
      <div class="header vh-between">
        <span class="icon el-icon-arrow-left" @click="$router.go(-1)"></span> 
        <span>理赔查询</span>
        <span class="icon right"></span>
      </div>
      <div class="webApp-body">
        <div class="main-content">
          <div class="item-title">
            安全生产责任险
          </div>
          <el-row>
            <el-col :span="4" :offset="1">
                <span class="label_">保单号：</span>
            </el-col>
            <el-col :span="16">
              <el-input 
                v-model="params.policyNo"
                placeholder="请输入保单号">
              </el-input>
            </el-col>
            <el-col :span="4" :offset="1">
                <span class="label_">报案号：</span>
            </el-col>
            <el-col :span="16">
              <el-input 
                v-model="params.reportNo"
                placeholder="请输入报案号">
              </el-input>
            </el-col>

            <!-- <el-input 
              v-model="params.policyNo"
               prefix-icon="el-icon-search" 
               placeholder="请输入保单号">
            </el-input>
            <el-input 
              v-model="params.reportNo"
               prefix-icon="el-icon-search" 
               placeholder="请输入报案号">
            </el-input> -->
            <div class="query_btn">
                <div @click="queryList">查询</div>
            </div>
          </el-row>

          <el-row style="padding: 0 10px" v-if="false">
            <el-col :span="24">
              <div class="base-w">保单号：</div>
              <el-input
                clearable
                maxlength="21"
                v-model="form.policyNo"
                placeholder="请输入保单号"
              ></el-input>
            </el-col>
            <el-col :span="24">
              <div class="base-w">报案号：</div>
              <el-input
                clearable
                maxlength="21"
                v-model="form.policyNo"
                placeholder="请输入保单号"
              ></el-input>
            </el-col>
            <el-col :span="24">
                <div class="base-w">报案人：</div>
                <el-input
                  clearable
                  v-model="form.reporterName"
                  placeholder="请输入报案人姓名"
                ></el-input>
            </el-col>
            <el-col :span="24">
                <div class="base-w">报案时间：</div>
                <el-date-picker
                  class="time_pick"
                  v-model="form.date"
                  type="datetime"
                  placeholder="选择日期">
                </el-date-picker>
            </el-col>
            <el-col :span="24">
                <div class="base-w">案件状态：</div>
                <el-select v-model="form.caseStatus" placeholder="请选择" @change="getChange">
                  <el-option
                    v-for="item in states"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id">
                  </el-option>
                </el-select>
            </el-col>
            <el-col :span="24">
                <div class="base-w">被保险人：</div>
                <el-input
                  clearable
                  v-model="form.reporterName"
                  placeholder="请输入报案人姓名"
                ></el-input>
            </el-col>
            <el-col :span="24">
                <div class="base-w">出险地点：</div>
                <div class="base-ws" :class="{active:form.areaListvalue}" @click="choose">{{form.areaListvalue?form.areaListvalue:"请选择省市区"}}</div>
                <div class="el-select">
                    <span class="icon el-icon-arrow-up"></span> 
                </div>
            </el-col>
            <el-col :span="24">
                <div class="base-w">详细地址：</div>
                <el-input
                  clearable
                  v-model="form.accidentPlace"
                  placeholder="请输入详细地址"
                ></el-input>
            </el-col>
            <el-col :span="24">
                <div class="base-w">出险时间：</div>
                <el-date-picker
                  class="time_pick"
                  v-model="date"
                  type="datetime"
                  placeholder="选择日期">
                </el-date-picker>
            </el-col>
            <el-col :span="24" class="">
                <div class="base-w">出险经过：</div>
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="form.accidentProcess">
                </el-input>
            </el-col>
            <el-col :span="24">
                <div class="base-w">结案时间：</div>
                <el-date-picker
                  class="time_pick"
                  v-model="enDdate"
                  type="datetime"
                  placeholder="选择日期">
                </el-date-picker>
            </el-col>
            <el-col :span="24">
              <div class="base-w">结案赔款金额：</div>
              <el-input
                clearable
                type="Number"
                maxlength="16"
                v-model="form.endCaseAmountSum"
                placeholder="请输入金额"
              ></el-input>
            </el-col>

          </el-row>
        </div>
      </div>
      
      <div class="query_btn" v-if="false">
        <div @click="submit">查询</div>
      </div>

      <br>
      <div class="table_item">
          <div class="info_list">
            <el-row>
              <el-col :span="4">
                <img style="width:60;height:60px" src="~@a/images/test.png" alt="">
              </el-col>
              <el-col :span="18" :offset="1">
                <p style="font-size: 14px;line-height: 30px">刘德云 
                  <span style="float:right;font-size: 12px;">好评率：
                    <span style="color:#ff6600;">100%</span>
                  </span>
                </p>
                <p>擅长领域：181平台答疑人员,企业运维答疑</p>
                <p>应答时间：周一至周日 9:00 - 18:00 
                  <i class="upload_icon el-icon-upload2" @click="clickBtn(11)"></i>
                </p>
              </el-col>
            </el-row>
          </div>

          <!--附件上传 -->
          <el-row v-show="true">
              <el-upload
                class="upload"
                ref="fileUpload"
                action="https://jsonplaceholder.typicode.com/posts/"
                :before-upload="beforeUpload"
                multiple
                name="file"
                :show-file-list="false"
                :data="upload.data"
                :on-success="success"
                :on-error="error">
              </el-upload>
          </el-row>
      </div>
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
import { aesEncrypt, Aes, noAes, setRsa, getRsa } from "@/assets/js/crypto.js";
import { SHA256withECDSA } from "@/assets/js/sha256.js"; 

export default {
  data() {
    return {
      form: {
          reportNo: '', // 报案号
          policyNo: '', // 保单号
          accidentProcess: '', // 经过
          reporterName: '', // 报案人
          accidentPlace: '', // 出险详细地址
          caseStatus: '', // 0-已结案 1-已报案  2-已理算  6-已归档
          province:'广东省',
          city:'深圳市',
          county:'宝安区',
          accidentProvince: '', // 出险地点省
          accidentCity: '', // 出险地点市
          accidentDistrict: '', // 出险地点区县
          accidentDate: '', // 出险时间【格式yyyy-mm-dd hh24:mi:ss】
          endCaseAmountSum: '' //结案赔款金额
      },
      date: '', // 出险时间
      enDdate: '', // 结案时间
      states: [
        {label: '已报案', id: '1'},
        {label: '定责中', id: '2'},
        {label: '定损中', id: '3'},
        {label: '理算中', id: '4'},
        {label: '审核中', id: '5'},
        {label: '已结案', id: '6'},
      ],
      cascadeMap: cascadeMap.cascade,
      loading: false,
      flag: true,
      show:false,
      upload: {
          data: {
              userId: '', // 操作人
              reportNo: '', // 报案号
              policyNo: '', // 保单号
              uploadSource: '', // 上传来源：10: OPENAPI
              uploadPersonType: '', // 上传人类型：02：客户 
              claimInformationList: [ // 索赔资料附件
                  {
                      fileId: '', // 索赔资料附件(上传附件key)
                      fileName: '', // 文件名(索赔资料名.后缀)
                      bigGroupCode: '', // 大类代码
                      shortGroupCode: '', // 小类代码
                  }
              ]
          }
      },
      select: '',
      input3: '',
      params: {
          reportNo: '91126054100000749167', // 报案号 
          policyNo: '11126053900152598925', // 保单号  11000003900163541849
      }
    };
  },
  created() {
      SHA256withECDSA();
  },
  mounted() {
  },
  methods: {
      queryList(){ 
          let { $http, $api } = this;
          const str = "QZWeg9F/6o6UYEguU7BvrU1paYTlJbTKoUW+9+igzUfxka56hc4+D+Vx9pSvT7UyWFJgLcWNyxOWO3dypcGO40wXd3b/qZEOeGqnY+PrNXs="
          const url = '?access_token=705A993C3E0E4952A1690F7ED6E5A27C&request_id=queryCaseInfoList746515';
          
          const par = Aes(JSON.stringify(this.params));

          $http.postNew($api.query_case + url, par).then(res=>{
              console.log(111, res)
          }).catch(req=>{

          })
      },
      clickBtn(val){
          console.log('234', val)

          document.getElementsByClassName('el-upload__input')[0].click();
      },
      beforeUpload(file){
          console.log('file', file)
      },
      success(res, file, fileList) {
          console.log('res', res)
          this.$refs.fileUpload.clearFiles(); // 清空文件
      },
      error(err, file, fileList) {
          console.log('err', err)
      },
      choose(){
        this.show=!this.show
      },
      onChangeProvince(a){
        this.form.province = a.value;  
        console.log(this.province)    
      },
      onChangeCity(a){
        this.form.city = a.value;  
        console.log(this.city)  
      },
      onChangeArea(a){
        this.form.county = a.value;  
        this.form.areaListvalue =this.form.province+','+this.form.city+','+this.form.county;
        console.log("a-------------",this.county) 
        
        this.show=false
      },     
      submit(){   //保存
        let { form,$http, $utils } = this;
        form.accidentDate = $utils.timeFormat(this.date); // 出险时间
        this.loading = true;
        let url = this.$api.addHouse; 
        $http.postNew(url,form)
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
      getChange(){
          if(this.form.business_type !=1){
            this.form.houseType = ""
          }
      },
      checkBusinessLicense(e, type) {
        //不允许输入中文
        this.form[type] = this.$utils.formatNotChinese(e);
      },
      onlyNum(val,name){  //限制输入数字，其它的都不可以输入
          val=val.replace(/[^\d]/g,'');
          this.form[name] = val;
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
.label_ {
    line-height: 30px;
}
.el-input__inner{
  line-height: 100px !important;
}
.upload_icon {
    float: right;
    color: #409EFF;
    cursor: pointer;
}
.webApp {
  // background: #fff;
  // // padding: 0 0 20vw;
  // overflow-y: auto;
  // position: absolute;
  // // bottom: 50px;
  // top: 0px;
  // overflow: hidden;

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

  .table_item {
    width: 100%;
    min-height: 300px;
  }
  .info_list {
    padding: 3px 5px;
    // box-shadow: #f6eded 5px 5px 5px 5px;
    background: #f2e9e9;
    margin-bottom: 5px;
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

</style>
<style>
  .el-picker-panel .el-picker-panel__body-wrapper .el-time-panel {
      left: -15px;
  }
</style>
