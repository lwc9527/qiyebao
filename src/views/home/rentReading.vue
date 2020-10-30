<template>
  <div class="webApp">
    <navBar 
      :title="title" 
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
              <span>{{items.province}}-{{items.city}}-{{items.county}}-{{items.address}}</span>
              <span class="icon" v-if="!items.show">{{items.nick}}<i class="el-icon-arrow-down ml-10"></i></span>
              <span class="icon" v-if="items.show">{{items.nick}}<i class="el-icon-arrow-down ml-10"></i></span>
            </div>
            <div class="title vh-between" v-if="items.show">
              <span>总数: {{items.total_room_num}}</span>
              <span class="ml-20">已租: {{items.list.length}}</span>
            </div>
            <ul class="uls" v-if="items.show">
              <li class="lis vh-left" v-for="(item,j) in items.list" :key="j" style="height:200px;align-items: end" >
                <div class="left"><p :class="item.lease_status==1?'': 'red' ">{{item.lease_status==1?"已租":"空房"}}</p></div>
                <div class="top">
                  <p>{{bill_time}}</p>
                  <p>月份：{{item.month}}</p>
                  <p>上期电表：{{item.latest_electric}}</p>
                  <p>上期水表：{{item.latest_water}}</p>
                  <el-input
                    clearable
                    v-model="now_water"
                    placeholder="请输入本期水表值"
                  ></el-input>
                  <el-input
                    clearable
                    v-model="now_electric"
                    placeholder="请输入本期电表值"
                  ></el-input>
                </div>
                <div class="right">
                     <el-button
                      size="mini"
                      type="primary"
                      @click.stop="editInfo(item)">生成账单</el-button>
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
      title:"快速抄表",
      showSelect:true,
      list: [],
      all_page:1,//总页数
      params:{
        page:1,
        limit:20,
        searchInput: '',
      },
      now_water:"",
      now_electric:"",
      bill_time:this.getNowDate()
    
      
    };
  },
  created () {
    this.getInfo();

  },
 
  methods: {

    getInfo() {
      let { params,$http, $utils } = this;
      this.BtnLoading = true;
      $http.postNew(this.$api.rapidAddShowBill,params)
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
    
    searchInfo(searchValue,searchInput){
      this.params.searchInput = searchInput;
      this.params.page = 1;
      this.list=[];
      this.getInfo();
    },

    //生成账单
    editInfo(item){
      let { $http, data,bill_time, now_water, now_electric } = this;
      let {month ,user_house_id ,latest_water,latest_electric,rent_price,water_price,electric_price,management_price} = item
      let submitData ={
        month ,
        user_house_id ,
        latest_water,
        latest_electric,
        bill_time,
        now_water,
        now_electric,
        rent_price,
        water_price,
        electric_price,
        management_price
      };
      $http.postNew(this.$api.addListbill,submitData)
        .then(res=>{
          this.$message.success("提交成功");
          this.getInfo();
        })
        .catch(req=>{
        });
    
    },
    getNowDate(){
      //获取当前时间
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      if (month < 10) {
          month = "0" + month;
      }
      if (day < 10) {
          day = "0" + day;
      }
      let nowDate = year + "-" + month + "-" + day;
      return nowDate;
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
