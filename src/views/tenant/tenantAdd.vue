<!--
 * @Descripttion: 
 * @Author: dongxiaohai
 * @Date: 2020-10-17 13:36:27
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-18 23:32:50
-->
<template>
  <div>
    <div class="webApp"  ref="webApp">
      <div class="header vh-between">
        <span class="icon el-icon-arrow-left" @click="$router.go(-1)"></span> 
        <span>{{id ?'编辑租客信息':'添加租客'}}</span>
        <span class="icon"></span>
      </div>
      <div class="conter">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="60px" class="tenant-ruleForm">
            <el-form-item label="姓名：" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="类型：" prop="tenantType">
                <el-radio-group v-model="ruleForm.tenantType">
                <el-radio label="1" >个人</el-radio>
                <el-radio label="2" >企业</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="性别：" prop="sex">
                <el-radio-group v-model="ruleForm.sex">
                  <el-radio label="1" >男</el-radio>
                  <el-radio label="2" >女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="电话：" prop="phone">
                <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="备注：" prop="remark">
                <el-input v-model="ruleForm.remark"></el-input>
            </el-form-item>
            <el-form-item label="证件：" prop="certificate">
                <el-input v-model="ruleForm.certificate"></el-input>
            </el-form-item>
            <el-form-item >
                <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    width="100"
                    height="100"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item label="状态：">正常 </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
      </div>
    
    </div>
    
  </div>
</template>

<script>
  export default {
    data() {
      return {
        id:this.$route.query.id,
        ruleForm: {
          name: '中国人',
          tenantType: '1',
          sex: '1',
          phone:"",
          remark:"",
          certificate:""
        },
        dialogImageUrl: '',
        dialogVisible: false,
        rules: {
          name: [
            { required: true, message: '请输入性名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
          ],
         
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              console.log('ruleForm',this.ruleForm);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
       handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        console.log('file',file);
        this.dialogVisible = true;
      }
    }
  }
</script>
<style lang="scss" scoped>
  .webApp {
    background: #fff;
    width:100%;
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
    .conter{
      margin-top: 50px;
        .tenant-ruleForm{
            padding:20px;
        }
    }
  }
</style>
