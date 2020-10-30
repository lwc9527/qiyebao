<template>
  <div class="webApp">
    <navBar 
      :title="title" 
      :addTitle="addTitle" 
      :addUrl="addUrl" 
      :showAddBtn="showAddBtn" 
      :showSelect="showSelect"
      :searchInput="params.searchInput" 
      @searchInfo="searchInfo">
    </navBar>
    <!--无限加载-->
    <div class="conter">
      <scroller style="top: 105px;" 
          height="560" 
          :on-refresh="refresh" 
          :on-infinite="infinite" 
          ref="myscroller">
        <ul class="box">
          <li class="lisBox" v-for="(items,index) in list" :key="index">
            <div class="title vh-between" @click="items.show=!items.show">
              <span class="address">{{items.province}}-{{items.city}}-{{items.county}}-{{items.address}}</span>
              <span class="icon" v-if="!items.show">{{items.nick}}<i class="el-icon-arrow-down ml-10"></i></span>
              <span class="icon" v-if="items.show">{{items.nick}}<i class="el-icon-arrow-down ml-10"></i></span>
            </div>
            <div class="title title1 vh-between" v-if="items.show">
              <span>总数: {{items.total_room_num}}</span>
              <span class="ml-20">已租: {{items.list.length}}</span>
              <div>
                <el-button
                  size="mini"
                  type="primary"
                  @click="editInfo(items.house_id,1)">添加房屋</el-button>
                <el-button
                  size="mini"
                  @click="handleDel(items.house_id)">删除</el-button>
              </div>
            </div>
            <ul class="uls" v-if="items.show">
              <li class="lis vh-left" v-for="(item,j) in items.list" :key="j" @click="editInfo(item.house_id,2,item.room_id)">
                <div class="left"><p :class="item.lease_status==1?'': 'red' ">{{item.lease_status==1?"已租":"空房"}}</p></div>
                <div class="top">
                  <p>房号: {{item.house_num}} ({{item.house_name}})</p>
                  <p>租金: ¥ <span>{{item.rent_price}}</span>/月</p>
                </div>
                <div class="right">{{item.date}}<span class="icon el-icon-arrow-right"></span></div>
              </li>
            </ul>
          </li>
        </ul>
      </scroller>
    </div>
   
  </div>
</template>
<script>
import navBar from "./component/navBar";
export default {
  components: {
    "navBar": navBar
  },
  data () {
    return {
      title:"房源管理",
      addTitle:"添加楼栋",
      showAddBtn:true,
      showSelect:true,
      addUrl:'/rentResourcesAdd?num=1',
      list: [],
      all_page:1,//总页数
      params:{
        page:1,
        limit:20,
        searchInput: '',
      },
    };
  },
  created () {
    this.getInfo();
  },
 
  methods: {

    getInfo() {
      let { params,$http, $utils } = this;
      this.BtnLoading = true;
      $http.postNew(this.$api.myHouse,params)
      .then(res=>{
        this.BtnLoading = false;
        let pageInfo = res.data;
        for (let i = 0; i < pageInfo.length; i++) {
          pageInfo[i].show = true;
          this.list.push(pageInfo[i]);
        }
        this.$refs.myscroller.finishInfinite(true)

        /*返回总页数*/
				this.all_page = res.lpage_num
        done();
      })
      .catch(req=>{
        this.BtnLoading= false;
      })
    },
    handleDel(id){
      let { $http, $utils } = this;
      this.BtnLoading = true;
      let parms ={
        house_id:id
      }
      this.$confirm('确定删除整栋楼,删除后不可恢复!', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        $http.postNew(this.$api.delHouse,parms)
        .then(res=>{
          this.BtnLoading = false;
          this.$message.success("删除成功");
          this.params.page = 1;
          this.getInfo();
        })
        .catch(req=>{
          this.BtnLoading= false;
        })
      }).catch(() => {});
    },
    
    searchInfo(searchValue,searchInput){
      // this.params.searchValue = searchValue;
      this.params.searchInput = searchInput;
      this.params.page = 1;
      this.list=[];
      this.getInfo();
    },
    editInfo(id,num,room_id){
      this.$router.push({ 
          path:'/rentInfoAdd',
          query: { 
            num:num,
            id: id ,
            room_id:room_id ,
          }
      }) 
    },
    refresh (done) { //下拉刷新
				setTimeout(()=>{
        　let _this=this;
          _this.list=[];
          _this.$refs.myscroller.finishPullToRefresh()
        　_this.params.page=1;      //重置页数刷新每次页数都是第一页
        　_this.getInfo();
        },1000)
			},

    infinite (done) {//上拉加载
      let _this =this;
      setTimeout(() => {
           if(_this.all_page <= _this.params.page){
             //finishInfinite函数为scroller实例的方法，
               _this.$refs.myscroller.finishInfinite(true);
           }else{
               _this.params.page++;
               _this.getInfo(done);
           }
       }, 1000);
		},
  },
 
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
