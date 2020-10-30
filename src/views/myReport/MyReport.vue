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
          <div class="item-title"><span class="icon el-icon-s-home"></span>保单损失情况信息</div>
          <el-row style="padding: 0 10px">
            <el-col :span="24">
                <div class="base-w">报案人：</div>
                <el-input
                  clearable
                  v-model="loginParams.house_resources_address"
                  placeholder="请输入报案人姓名"
                ></el-input>
            </el-col>
            <el-col :span="24">
              <div class="base-w">保单号：</div>
              <el-input
                clearable
                v-model="loginParams.house_resources_address"
                placeholder="请输入保单号"
              ></el-input>
            </el-col>
            <el-col :span="24">
                <div class="base-w">手机号：</div>
                <el-input
                  clearable
                  v-model="loginParams.house_resources_address"
                  placeholder="请输入报案人联系电话"
                ></el-input>
            </el-col>
            <el-col :span="24">
                <div class="base-w">出险地点：</div>
                <div class="base-ws" :class="{active:loginParams.areaListvalue}" @click="choose">{{loginParams.areaListvalue?loginParams.areaListvalue:"请选择省市区"}}</div>
                <div class="el-select">
                    <span class="icon el-icon-arrow-up"></span> 
                </div>
                <!-- <el-cascader
                  v-model="loginParams.areaListvalue"
                  :options="cascadeMap"
                  @change="handleChange">
                </el-cascader> -->
            </el-col>
            <el-col :span="24" class="">
                <div class="base-w">出险经过：</div>
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="loginParams.content">
                </el-input>
            </el-col>
            <el-col :span="24">
                <div class="base-w">出险原因一级：</div>
                <el-select v-model="loginParams.business_type" placeholder="请选择" @change="getChange">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-col>
            <el-col :span="24">
                <div class="base-w">出险原因二级：</div>
                <el-select v-model="loginParams.business_type2" placeholder="请选择" @change="getChange">
                  <el-option
                    v-for="item in optionsTwo"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-col>

            <el-col :span="24">
                <div class="base-w">损失标的：</div>
                <el-checkbox v-model="loginParams.checkList">备选项</el-checkbox>
                <el-checkbox v-model="loginParams.checkList">备选项</el-checkbox>
                <!-- <el-checkbox-group v-model="loginParams.checkList">
                  <el-checkbox label="复选框 A"></el-checkbox>
                  <el-checkbox label="复选框 B"></el-checkbox>
                  <el-checkbox label="复选框 C"></el-checkbox>
                  <el-checkbox label="禁用" disabled></el-checkbox>
                  <el-checkbox label="选中且禁用" disabled></el-checkbox>
                </el-checkbox-group> -->
            </el-col>
            <el-col :span="24">
                <div class="base-w">损失情况描述：</div>
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="loginParams.content">
                </el-input>
            </el-col>
            <el-col :span="24">
              <div class="base-w">报损金额：</div>
              <el-col :span="14">
                <el-input
                  clearable
                  v-model="loginParams.house_resources_address"
                  placeholder="请输入报损金额"
                ></el-input>
              </el-col>
              <el-col :span="9">
                <el-select v-model="loginParams.unit">
                  <el-option
                    v-for="item in units"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-col>
            <el-col :span="24">
                <div class="base-w">是否愿意自主理赔：</div>
                <el-select v-model="loginParams.isSelf">
                  <el-option value="Y" label="是"></el-option>
                  <el-option value="N" label="否"></el-option>
                </el-select>
            </el-col>
            <el-col :span="24">
                <div class="base-w">备注：</div>
                <el-input
                  clearable
                  v-model="loginParams.house_resources_address"
                  placeholder="请输入备注"
                ></el-input>
            </el-col>
           
          </el-row>
        </div>
      </div>
      
      <div class="query_btn">
        <div @click="query">提交</div>
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
      loginParams: {
        checkList: [],
        province:'广东省',
        city:'深圳市',
        county:'宝安区',
        areaListvalue:"",  
        house_resources_address: "",
        house_num: "",
        business_type: 'A61',
        business_type2: '',  //商业类型 1居住 2商铺 3厂房 4办公 5仓库 6其他',
        advance_day: "",    //收租日
        content: "",    //备注
        floor: "",    //楼层
        status: 1,    //1正常0停用
        unit: 'RMB',
        isSelf: 'Y'
      },
      options: [
        {value: "A61",label: '火灾'}, 
        {value: "A62",label: '爆炸'}
      ],
      optionsTwo: [
        {value: "N0160",label: '火灾'}, 
        {value: "N0449",label: '火药爆炸'},
        {value: "N0450",label: '瓦斯爆炸'},
        {value: "N0451",label: '锅炉爆炸'},
        {value: "N0452",label: '容器爆炸'},
        {value: "N0453",label: '其他爆炸'}
      ],
      options1: [
        {value: 1,label: '正常'}, 
        {value: 0,label: '停用'}, 
      ],
      cascadeMap:cascadeMap.cascade,
      loading: false,
      flag: true,
      show:false,
      units:[
        {label: '人民币', value: 'RMB'},
        {label: '美元', value: '$'}
      ]
    };
  },
  created() {
  },
  mounted() {},
  methods: {
    handleChange(value) {
      console.log(value);
    },
    choose(){
      this.show=!this.show
    },
    onChangeProvince(a){
      this.loginParams.province = a.value;  
      console.log(this.province)    
    },
    onChangeCity(a){
      this.loginParams.city = a.value;  
      console.log(this.city)  
    },
    onChangeArea(a){
      this.loginParams.county = a.value;  
      this.loginParams.areaListvalue =this.loginParams.province+','+this.loginParams.city+','+this.loginParams.county;
      console.log("a-------------",this.county) 
       
      this.show=false
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
      let url = this.num==1? this.$api.addHouse :this.$api.editHouse; 
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
      if(!this.loginParams.house_resources_address){
        this.$message.error("请填写地址")  
        return
      }
      if(!this.loginParams.house_num){
        this.$message.error("请填写房号")
        return
      }
      if(!this.loginParams.floor){
        this.$message.error("请填写楼层")
        return
      }
      return true;
    },
    getChange(){
      if(this.loginParams.business_type !=1){
        this.loginParams.houseType = ""
      }
    },
   
    checkBusinessLicense(e, type) {
      //不允许输入中文
      this.loginParams[type] = this.$utils.formatNotChinese(e);
    },
    onlyNum(val,name){  //限制输入数字，其它的都不可以输入
        val=val.replace(/[^\d]/g,'');
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

  .query_btn {
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
    div {
      display: inline-block;
      line-height: 40px;
      width: 60%;
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
        height: 40px;
        line-height: 40px;
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
  margin-left: 28px;
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
