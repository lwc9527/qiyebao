import Vue from "vue";
import Router from "vue-router";

import login from "../views/login/login.vue";
import register from "../views/register/register.vue";
import home from "../views/home/home.vue";
import rentResources from "../views/home/rentResources.vue";
import rentResourcesAdd from "../views/home/rentResourcesAdd.vue";
import rentInfoAdd from "../views/home/rentInfoAdd.vue";
import rentOut from "../views/home/rentOut.vue";
import rentOutInfo from "../views/home/rentOutInfo.vue";
import rentList from "../views/home/rentList.vue";
import rentListInfo from "../views/home/rentListInfo.vue";
import rentReading from "../views/home/rentReading.vue";

import statistics from "../views/statistics";
import contract from "../views/contract";
import contractDetail from "../views/contract/contractDetail";
import tenant from "../views/tenant";
import tenantAdd from "../views/tenant/tenantAdd";

import claimQuery from "../views/claimQuery/ClaimQuery.vue";
import myReport from "../views/myReport/MyReport.vue";

const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    console.log(11, location)
    return routerPush.call(this, location).catch((error) => error);
};

Vue.use(Router);

const router = new Router({
    mode: "hash",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            redirect: "/home",
        },
        {
            path: "/home",
            name: "home",
            meta: {
                title: "首页",
            },
            component: home,
        }, 
        {
            path: "/login",
            name: "login",
            meta: {
                title: "登录",
            },
            component: login,
        }, 
        {
            path: "/register",
            name: "register",
            meta: {
                title: "注册",
            },
            component: register,
        }, 
        {
            path: "/rentResources",
            name: "rentResources",
            meta: {
                title: "房源",
            },
            component: rentResources,
        }, 
        {
            path: "/rentResourcesAdd",
            name: "rentResourcesAdd",
            meta: {
                title: "增加楼栋",
            },
            component: rentResourcesAdd,
        }, 
        {
            path: "/rentInfoAdd",
            name: "rentInfoAdd",
            meta: {
                title: "房源详情",
            },
            component: rentInfoAdd,
        }, 
        {
            path: "/rentOut",
            name: "rentOut",
            meta: {
                title: "出租登记",
            },
            component: rentOut,
        }, 
        {
            path: "/rentOutInfo",
            name: "rentOutInfo",
            meta: {
                title: "出租详情",
            },
            component: rentOutInfo,
        }, 
        {
            path: "/rentList",
            name: "rentList",
            meta: {
                title: "房租查询",
            },
            component: rentList,
        }, 
        {
            path: "/rentListInfo",
            name: "rentListInfo",
            meta: {
                title: "房租详情",
            },
            component: rentListInfo,
        }, 
        {
            path: "/rentReading",
            name: "rentReading",
            meta: {
                title: "快速抄表",
            },
            component: rentReading,
        },
        {
            path: "/contract",
            name: "contract",
            meta: {
                title: "合同",
            },
            component: contract,
        }, 
        {
            path: "/contractDetail",
            name: "contractDetail",
            meta: {
                title: "合同详情",
            },
            component: contractDetail,
        }, 
        {
            path: "/tenant",
            name: "tenant",
            meta: {
                title: "租客档案",
            },
            component: tenant,
        }, 
        {
            path: "/tenantAdd",
            name: "tenantAdd",
            meta: {
                title: "租客信息",
            },
            component: tenantAdd,
        }, 
        {
            path: "/statistics",
            name: "statistics",
            meta: {
                title: "收租统计",
            },
            component: statistics,
        }, 
        {
            path: "/claimQuery",
            name: "claimQuery",
            meta: {
                title: "理赔查询",
            },
            component: claimQuery,
        },
        {
            path: "/myReport",
            name: "myReport",
            meta: {
                title: "我的报案",
            },
            component: myReport,
        },
      
    ],
});

export default router;