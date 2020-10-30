<template>
  <div class="webApp">
    <navBar 
    :options="options" 
    :title="title" 
    :searchValue="searchValue" 
    :searchInput="searchInput"
    @searchInfo="searchInfo" ></navBar>
    
    <div class="conter">
      <div class="contract-list">
         <el-table
          :data="tableData"
          stripe
          height="600"
          @row-click="checkDetails"
          style="width: 100%">
          <el-table-column
            prop="house_no"
            label="房号"
            width="140">
             <template slot-scope="scope">
              <p class="house_no">{{scope.row.house_no}}</p>
              <p class="rent_price">租金￥{{scope.row.rent_price}}</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名/电话"
            width="160">
              <template slot-scope="scope">
                 <p>{{scope.row.name}}</p>
                 <p class="user-phone">{{scope.row.phone}}</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="contractStatus"
            width="60"
            label="状态">
            <template slot-scope="scope">
                 <p style="color:green" v-if="scope.row.contractStatus==1">正常</p>
                 <p style="color:red" v-if="scope.row.contractStatus==2">异常</p>
                 <p style="color:#ccc"  v-if="scope.row.contractStatus==3">过期</p>
                 <p style="color:orange" v-if="scope.row.contractStatus==4">退房</p>
            </template>
          </el-table-column>
          <el-table-column  type="expand" >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="info"
                plain
                @click="handleDel(scope.$index, scope.row)">删除</el-button>
              <el-button
                size="mini"
                type="warning"
                plain
                @click="handleCheckOut(scope.$index, scope.row)">退房</el-button>
            </template>
          </el-table-column>
      </el-table>
      </div>
    </div>
   
  </div>
</template>
<script>
import navBar from "../home/component/navBar";
export default {
  components: {
    "navBar": navBar
  },
  data () {
    return {
      title:"合同查询",
       tableData: [
         {
            house_no:'888',
            rent_price:'666',
            name:'中国人',
            phone:'131111111',
            id:'121212',
            contractStatus:1
          },
         {
            house_no:'888',
            rent_price:'666',
            name:'中国人',
            phone:'131111111',
            id:'121212',
            contractStatus:1
          },
         {
            house_no:'888',
            rent_price:'666',
            name:'中国人',
            phone:'131111111',
            id:'121212',
            contractStatus:1
          },
        
       
          
          ],
     
      options: [
        {value: '0',label: '全部'}, 
        {value: '1',label: '已订'}, 
        {value: '2',label: '正常'}, 
        {value: '3',label: '过期'}, 
        {value: '4',label: '退房'}
      ],
      searchValue: '0',
      searchInput: '',
    };
  },
  created () {
    
  },
 
  mounted() {
   
  },
  methods: {
    signout() {
      this.$router.push({ path:'/login'})
      // this.$http
      //   .postNew(this.$api.invoiceApplyselectOne, {id:this.$route.query.id}, "/server/api_dp")
      //   .then(res => {
      //     this.applyInfor = res.data;
         
      //     this.serviceContent = JSON.parse(res.data.serviceContent);
      //   })
      //   .catch(err => {
      //     console.log(err, "请求接口");
      //   });
    },
    searchInfo(searchValue,searchInput){
      this.searchValue = searchValue;
      this.searchInput = searchInput;
      console.log(searchValue,searchInput)
    },

    checkDetails(row, column, event){//查看合同详情
      this.$router.push({ 
            path:`/contractDetail`,
            query: { 
               id: row.id,
               type:'view'
            }
        }) 
    },

    handleCheckOut(index, row) {//点击退房 ，进入详情页，可编辑
      console.log(index, row);
       this.$router.push({ 
            path:`/contractDetail`,
            query: { 
               id: row.id,
               type:'edit'
            }
        }) 
    },
    handleDel(index, row) {
       this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success("删除成功")
      }).catch(() => {});
    }
  },
  
};
</script>
<style lang="scss" scoped>
.webApp{
  .conter{
    width:100%;
     margin-top:115px;

   .contract-list{
        .house_no{
            font-weight: bold;
            font-size: 18px;
            color: orange;
        }
    
     .user-phone{
       color: blue;
     }
     .el-button{
       margin: 0 20px;
     }
    
   }
  }
  
}
</style>
