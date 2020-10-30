<template>
  <div class="webApp">
    <navBar 
      :options="options" 
      :title="title" 
      :searchValue="searchValue"
      :searchInput="params.searchInput" 
      @searchInfo="searchInfo">
    </navBar>
  
    <div class="conter">
       <scroller style="top: 105px;" 
          height="560" 
          :on-refresh="refresh" 
          :on-infinite="infinite" 
          ref="myscroller">
          <ul class="box">
            <li class="lisBox" v-for="(items,index) in list" :key="index">
              <div class="title vh-between" @click="items.show=!items.show">
                <span>{{items.province}}-{{items.city}}-{{items.county}}-{{items.address}}</span>
                <span class="icon" v-if="!items.show">{{items.nick}}<i class="el-icon-arrow-down ml-10"></i></span>
                <span class="icon" v-if="items.show">{{items.nick}}<i class="el-icon-arrow-down ml-10"></i></span>
              </div>
              <div class="title vh-between" v-if="items.show">
                <span>总数: {{items.total_room_num}}</span>
                <span class="ml-20">{{ params.roomStatus==0?"未出租":"已租: "}}{{items.list.length}}</span>
              </div>
              <ul class="uls" v-if="items.show">
                <li class="lis vh-left" v-for="(item,j) in items.list" :key="j" >
                  <div class="left"><p :class="item.lease_status==1?'': 'red' ">{{item.lease_status==1?"已租":"空房"}}</p></div>
                  <div class="top">
                    <p>房号: {{item.house_num}} ({{item.house_name}})</p>
                    <p>租金: ¥ <span>{{item.rent_price}}</span>/月</p>
                  </div>
                  <div class="right">
                     <el-button
                      size="mini"
                      type="primary"
                      @click.stop="editInfo(item.room_id, item.lease_status==1 ? 2: 1,item.lease_status==1 ?item:null)">
                      {{item.lease_status==1 ? '修改': '添加住户'}}</el-button>
                  </div>
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
      title:"出租登记",
      addUrl:'/rentOutInfo',
      all_page:1,//总页数
      params:{
        page:1,
        limit:20,
        roomStatus: '0',
        searchInput: '',
      },
      list: [],
     
      options: [{
        value: '0',
        label: '未出租'
      }, {
        value: '1',
        label: '已出租'
      }],
      searchValue: '0',
      searchInput: '',
    };
  },
  created () {
    this.getRentOutLists()
  },
 
  mounted() {
   
  },
  methods: {
   
    getRentOutLists() {
        let { params,$http} = this;
        this.BtnLoading = true;
        $http.postNew(this.$api.getRentOutLists,params)
        .then(res=>{
          this.BtnLoading = false;
          let pageInfo = res.data;
          for (let i = 0; i < pageInfo.length; i++) {
            pageInfo[i].show = true;
            this.list.push(pageInfo[i]);
          }
          this.$refs.myscroller.finishInfinite(true)

          this.currentPage = this.params.page;
          /*返回总页数*/
          this.all_page = res.lpage_num
          done();
        })
        .catch(req=>{
          this.BtnLoading= false;
        })
      },
    searchInfo(searchValue,searchInput){
      this.params.roomStatus = searchValue;
      this.params.searchInput = searchInput;
      this.params.page = 1;
      this.list=[];
      this.getRentOutLists();
    },

      editInfo(id,num,info){
        console.log(num);
          this.$router.push({ 
              path:'/rentOutInfo',
              query: { 
                num,
                id ,
                info
              }
          }) 
      },
    refresh (done) { //下拉刷新
      setTimeout(()=>{
        console.log('下拉刷新');
      　let _this=this;
        _this.list=[];
          _this.$refs.myscroller.finishPullToRefresh()
      　_this.params.page=1;      //重置页数刷新每次页数都是第一页
      　_this.getRentOutLists();
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
               _this.getRentOutLists(done);
           }
       }, 1000);
		},

  },
  
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
