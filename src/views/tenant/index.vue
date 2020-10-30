<template>
  <div class="webApp">
    <navBar 
    :options="options" 
    :title="title" 
    :addTitle="addTitle" 
    :addUrl="addUrl"
    :showAddBtn="showAddBtn"
    :showSelect="showSelect"
    @searchInfo="searchInfo" ></navBar>
    
    <div class="conter">
      <div class="tenant-list">
         <el-table
          :data="tableData"
          stripe
          height="600"
          style="width: 100%">
          <el-table-column
            prop="information"
            label="基本信息"
            width="100">
             <template slot-scope="scope">
               <el-image
                 :src="scope.row.profileUrl"
                 ></el-image>
              <p class="user-name">{{scope.row.name}}</p>
              <p class="user-phone">{{scope.row.phone}}</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="gender"
            label="性别"
            width="50">
          </el-table-column>
          <el-table-column
            prop="date"
            label="入住时间">
          </el-table-column>
          <el-table-column
            prop="number"
            width="50"
            label="房号">
          </el-table-column>
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
      title:"租客档案",
      addTitle:"添加租客",
      showAddBtn:true,
      showSelect:true,
      addUrl:'/tenantAdd',
       tableData: [
         {
            profileUrl:'https://qncdn.wanshifu.com/bef686797f982569978e9bd839dfafca',
            name:'中国人',
            phone:'131111111',
            gender: '男',
            date: '2020-05-05',
            number: '888',
            id:'121212'
          },
         {
            profileUrl:'https://qncdn.wanshifu.com/bef686797f982569978e9bd839dfafca',
            name:'中国人',
            phone:'131111111',
            gender: '男',
            date: '2020-05-05',
            number: '888',
            id:'121212'
          },
         {
            profileUrl:'https://qncdn.wanshifu.com/bef686797f982569978e9bd839dfafca',
            name:'中国人',
            phone:'131111111',
            gender: '男',
            date: '2020-05-05',
            number: '888',
            id:'121212'
          },
         {
            profileUrl:'https://qncdn.wanshifu.com/bef686797f982569978e9bd839dfafca',
            name:'中国人',
            phone:'131111111',
            gender: '男',
            date: '2020-05-05',
            number: '888',
            id:'121212'
          },
       
          
          ],
     
      options: [],
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

    handleEdit(index, row) {
      console.log(index, row);
       this.$router.push({ 
            path:`/tenantAdd`,
            query: { 
               id: row.id,
            }
        }) 
    },
    handleDelete(index, row) {
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

   .tenant-list{
     .el-image{
       width: 60px;
       height: 60px;
       display: block;
       margin-top: 10px;
     }
     .user-name{
       color: red;
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
