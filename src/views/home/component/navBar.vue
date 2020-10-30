<!--
 * @Descripttion: 
 * @Author: dongxiaohai
 * @Date: 2020-10-17 11:57:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-18 23:05:42
-->
<template>
    <div class="top">
      <div class="header vh-between">
        <router-link tag="span" to="/home" class="icon el-icon-arrow-left"></router-link> 
        <span>{{title}}</span>
        <router-link tag="span" :to="addUrl" class="icon right" v-if="showAddBtn">{{addTitle}}<span class="el-icon-circle-plus ml-10"></span></router-link>
        <span class="icon right" v-else></span>
      </div>
      <div class="search vh-between">
        <el-select v-model="value" placeholder="请选择" @change="getChange" v-if="!showSelect">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input v-model="input" class="ml-10" @input="getChange" prefix-icon="el-icon-search" placeholder="请输入关键字"></el-input>
      </div>
    </div>
   
</template>
<script>

export default {
  props: {
    title: String,
    addTitle: String,
    searchValue: String,
    searchInput: String,
    addUrl: String,
    options: Array,
    showAddBtn:Boolean,
    showSelect:Boolean
  },
  data () {
    return {
      value: this.searchValue,
      input: this.searchInput,
    };
  },
  watch: {
    searchValue(newVal) {
      this.value = newVal;
    },
    searchInput(newVal) {
      this.input = newVal;
    },
  },
  created () {
    
  },
 
  mounted() {
   
  },
  methods: {
    getChange() {
      this.$emit("searchInfo",this.value,this.input);
    },
   
  },
  
};
</script>
<style lang="scss" scoped>
  .top{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background:#fff;
    .search{
      padding:15px 20px;
      border-top: 1px solid #f5f5f5;
    }
    .icon{
      width:100px;
    }
  
}
</style>
