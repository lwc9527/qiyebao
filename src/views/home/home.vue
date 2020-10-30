<template>
  <div class="webApp">
    <div class="header vh-between">
      <span class="icon el-icon-arrow-left" @click="signout()">退出</span>
      <span>租房管理</span>
      <span class="icon"></span>
    </div>
    <el-carousel height="160px">
      <el-carousel-item v-for="(item,i) in carouselLists" :key="i">
        <img class="bg" v-bind:src="item.carousel" alt />
      </el-carousel-item>
    </el-carousel>
    <div class="conter">
      <ul class="uls">
        <div class="title">
          <span></span>热门服务
        </div>
        <router-link to="/rentResources" tag="li" class="lis">
          <img class="lis_img" src="~@a/images/home/rentResources.png" alt />
          <p>房源</p>
        </router-link>
        <router-link to="/rentOut" tag="li" class="lis">
          <img class="lis_img" src="~@a/images/home/rentOut.png" alt />
          <p>出租</p>
        </router-link>
        <router-link to="/rentList" tag="li" class="lis">
          <img class="lis_img" src="~@a/images/home/rentList.png" alt />
          <p>房租单</p>
        </router-link>
        <router-link to="/rentReading" tag="li" class="lis">
          <img class="lis_img" src="~@a/images/home/rentReading.png" alt />
          <p>抄表</p>
        </router-link>
        <!--
        <router-link to="/contract" tag="li" class="lis">
          <img class="lis_img" src="~@a/images/home.png" alt="">
          <p>合同</p>
        </router-link>-->
        <router-link to="/tenant" tag="li" class="lis">
          <img class="lis_img" src="~@a/images/home/tenant.png" alt />
          <p>租客</p>
        </router-link>
        <router-link to="/statistics" tag="li" class="lis">
          <img class="lis_img" src="~@a/images/home/statistics.png" alt />
          <p>统计</p>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      carouselLists: [
        {
          carousel: require('../../assets/images/home/carousel1.jpg')
        },
        {
          carousel: require('../../assets/images/home/carousel2.jpg')
        },
        {
          carousel: require('../../assets/images/home/carousel3.jpg')
        }
      ]
    };
  },
  created() {
    let token = window.localStorage.getItem("token");
    if (!token) {
      // this.$router.push({ path: "/login" });
    }
  },

  mounted() {},
  methods: {
    signout() {
      this.$confirm("确定退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.commit("set_token", "");
          window.localStorage.clear();
          this.$router.push({ path: "/login" });
          this.$message.success("退出成功");
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="scss" scoped>
.webApp {
  width: 100%;
  .el-carousel--horizontal {
    overflow-y: hidden;
  }
  .bg {
    width: 100%;
    height: 100%;
  }
  .conter {
    padding: 15px 20px;
    .uls {
      height: 270px;
      width: 100%;
      border-radius: 6px;
      background-color: #fff;
      .title {
        padding: 0 20px;
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        font-weight: 600;
        span {
          display: inline-block;
          width: 5px;
          height: 22px;
          background-color: #559aff;
          margin-right: 10px;
          vertical-align: middle;
        }
      }
      .lis {
        width: 33.3%;
        padding: 10px 0;
        color: #333;
        text-align: center;
        font-size: 16px;
        box-sizing: border-box;
        float: left;
        .lis_img {
          width: 55px;
          height: 55px;
          border-radius: 50%;
        }
        p {
          width: 100%;
          height: 30px;
          line-height: 30px;
          font-family: PingFangSC-Semibold, PingFang SC;
        }
      }
    }
  }
}
</style>
