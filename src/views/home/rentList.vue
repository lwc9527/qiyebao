<template>
  <div class="webApp">
    <navBar
      :title="title"
      :showSelect="showSelect"
      :searchInput="params.searchInput"
      @searchInfo="searchInfo"
    ></navBar>
    <!--无限加载-->
    <div class="conter">
      <scroller
        style="top: 105px;"
        height="560"
        :on-refresh="refresh"
        :on-infinite="infinite"
        ref="myscroller"
      >
        <ul class="box">
          <li class="list" v-for="(item,index) in list" :key="index">
            <div>
              <p>
                <span>收账日期：{{item.bill_time}}</span>
              </p>
              <p>
                <span>记账日期：{{item.month}}</span>
              </p>
              <p>
                <span>期数备注：{{item.month_content}}</span>
              </p>
            </div>
            <div>
              <p>租金: ¥ {{item.rent_price}} /月</p>
              <p>记录水表值: {{item.latest_water}}</p>
              <p>记录电表值:{{item.latest_electric}}</p>
            </div>
            <div>
              <span class="icon el-icon-arrow-right" @click="editInfo(item)"></span>
            </div>
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
    navBar: navBar
  },
  data() {
    return {
      title: "房租查询",
      showSelect: true,
      list: [],
      all_page: 1, //总页数
      params: {
        page: 1,
        limit: 20,
        searchInput: ""
      }
    };
  },
  created() {
    this.getInfo();
  },

  methods: {
    getInfo() {
      let { params, $http, $utils } = this;
      this.BtnLoading = true;
      $http
        .postNew(this.$api.Showbill, params)
        .then(res => {
          this.BtnLoading = false;
          let pageInfo = res.data;
          for (let i = 0; i < pageInfo.length; i++) {
            pageInfo[i].show = true;
            this.list.push(pageInfo[i]);
          }
          this.$refs.myscroller.finishInfinite(true);
          console.log("this.list", this.list);
          /*返回总页数*/
          this.all_page = res.lpage_num ? res.lpage_num : 1;
          done();
        })
        .catch(req => {
          this.BtnLoading = false;
        });
    },

    editInfo(data) {
      this.$router.push({
        path: "/rentListInfo",
        query: {
         data
        }
      });
    },

    searchInfo(searchValue, searchInput) {
      this.params.searchInput = searchInput;
      this.params.page = 1;
      this.list = [];
      this.getInfo();
    },

    refresh(done) {
      //下拉刷新
      setTimeout(() => {
        let _this = this;
        _this.list = [];
        _this.$refs.myscroller.finishPullToRefresh();
        _this.params.page = 1; //重置页数刷新每次页数都是第一页
        _this.getInfo();
      }, 1000);
    },

    infinite(done) {
      //上拉加载
      let _this = this;
      setTimeout(() => {
        if (_this.all_page <= _this.params.page) {
          //finishInfinite函数为scroller实例的方法，
          _this.$refs.myscroller.finishInfinite(true);
        } else {
          _this.params.page++;
          _this.getInfo(done);
        }
      }, 1000);
    }
  }
};
</script>
<style lang="scss" scoped>
.conter {
  .box {
    .list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      background-color: #fff;
      border-bottom: 1px solid #eee;
    }
  }
}
</style>
