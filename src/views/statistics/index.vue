<template>
  <div class="webApp">
    <div class="header vh-between">
      <span class="icon el-icon-arrow-left" @click="$router.go(-1)"></span> 
      <span>收租统计</span>
      <span class="icon right">
        <el-select v-model="value" placeholder="年份">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </span>
    </div>
    <div class="conter">
      <div class="list">
         <el-table
          :data="tableData"
          stripe
          height="600"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="年份"
            width="70">
          </el-table-column>
          <el-table-column
            prop="received"
            label="收入"
            width="100">
            <template slot-scope="scope">
              <span class="green">已收:{{ $formatNumber(scope.row.received) }}</span>
              <span class="red">待收:{{ $formatNumber(scope.row.dueIn) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
          <el-table-column
            prop="sum"
            width="80"
            label="总计">
          </el-table-column>
      </el-table>
      </div>

    </div>
   
  </div>
</template>
<script>

 export default {
      data() {
        return {
          tableData: [{
            date: '2021年',
            received: '100.00',
            dueIn: '666.00',
            sum: '888.00',
            address: '上海市普陀区金沙江路 1518 弄',
          }, {
            date: '2018年',
            received: '100.00',
            dueIn: '666.00',
            sum: '888.00',
            address: '上海市普陀区金沙江路 1518 弄',
          }, {
            date: '2018年',
            received: '100.00',
            dueIn: '666.00',
            sum: '888.00',
            address: '上海市普陀区金沙江路 1518 弄',
          }, {
            date: '2018年',
            received: '100.00',
            dueIn: '666.00',
            sum: '888.00',
            address: '上海市普陀区金沙江路 1518 弄',
          }, {
            date: '2018年',
            received: '100.00',
            dueIn: '666.00',
            sum: '888.00',
            address: '上海市普陀区金沙江路 1518 弄',
          }, {
            date: '2018年',
            received: '100.00',
            dueIn: '666.00',
            sum: '888.00'
          }, {
            date: '2018年',
            received: '100.00',
            dueIn: '666.00',
            sum: '888.00'
          }, {
            date: '2018年',
            received: '100.00',
            dueIn: '666.00',
            sum: '888.00'
          }, {
            date: '2018年',
            received: '100.00',
            dueIn: '666.00',
            sum: '888.00'
          }, {
            date: '2018年',
            received: '100.00',
            dueIn: '666.00',
            sum: '888.00'
          }, {
            date: '2018年',
            received: '100.00',
            dueIn: '666.00',
            sum: '888.00'
          }, {
            date: '2018年',
            received: '100.00',
            dueIn: '666.00',
            sum: '888.00'
          }, {
            date: '2018年',
            received: '100.00',
            dueIn: '666.00',
            sum: '888.00'
          }],
        options: [
          {
            value: '2018',
            label: '2018'
          }, {
            value: '2019',
            label: '2019'
          }, {
            value: '2025',
            label: '2025'
          }, {
            value: '2022',
            label: '2022'
          }],
          value: '',
        }
      }
    }
</script>
<style lang="scss" scoped>
.webApp{
  .header{
    .icon{
      width: 100px;
    }
  }
  .conter{
    width:100%;
    .green{
      color:green;
    }
    .red{
      color:red;
    }

  }
  
}
</style>
