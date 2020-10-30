import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUi from "element-ui";
import axios from "@c/axios/http";
import api from "@c/axios/api";
import qs from "qs";
import vcharts from "v-charts";
import "./common/lib/comp/rem";
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import VueScroller from 'vue-scroller'

/***** 表单生成器  ******/
import FormMaking from "./assets/js/form-making-advanced";
import "./assets/js/form-making-advanced/dist/FormMaking.css";

import "@c/lib/util/href";

import "element-ui/lib/theme-chalk/index.css";

//颜色主题
import "@c/style/color.scss";
import "@c/style/common.scss";

//iconfont图标
import "./assets/fontDp/iconfont.css";

import getHeight from "./common/lib/count/getHeight";

//工具类
import * as utils from "@/assets/js/utils";
//过滤器
import * as filter from "@/assets/js/filter";

// 地区选择器
import VDistpicker from 'v-distpicker'
Vue.component('v-distpicker', VDistpicker);

//按钮
import bgButton from "./components/btnModule/bgButton.vue"; //主页面按钮
Vue.component("bgButton", bgButton);

Vue.config.productionTip = false;

Vue.use(FormMaking);
Vue.use(vcharts);
Vue.use(ElementUi);
Vue.use(VueScroller);

Vue.use(Viewer);
Viewer.setDefaults({
    Options: { "inline": true, "button": true, "navbar": true, "title": true, "toolbar": true, "tooltip": true, "movable": true, "zoomable": true, "rotatable": true, "scalable": true, "transition": true, "fullscreen": true, "keyboard": true, "url": "data-source" }
});
Vue.config.devtools = true;

//注册全局过滤器
Object.keys(filter).forEach((key) => {
    Vue.filter(key, filter[key]);
});

Vue.prototype.$utils = utils; //工具类
Vue.prototype.$qs = qs;
Vue.prototype.$http = axios;
Vue.prototype.$api = api;
Vue.prototype.$getHeight = getHeight;


Vue.prototype.$setTableHeadRowClass = function() {
    //外层表头
    return "table-head-noborder";
};
Vue.prototype.$setTableHeadRowTwoClass = function() {
    //内层表头
    return "table-head-noborderTwo";
};
//1000 = 1,100.00
Vue.prototype.$formatNumber = function(nStr) {
    if (nStr) {
        nStr += "";
        let fn = (str) => {
            var x = str.split(".");
            var x1 = x[0];
            var x2 = x.length > 1 ? "." + x[1] : "";
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, "$1" + "," + "$2");
            }
            let res = x1 + x2;
            return res;
        };

        if (nStr.indexOf(".") < 0) {
            return fn(nStr) + ".00";
        } else {
            let strRes = nStr;
            let num = Number(strRes);
            let num1 = num.toFixed(2);
            return fn(num1);
        }
    } else {
        return "--";
    }
};
//求和
Vue.prototype.$addDecimal = function(numArr) {
    let arr = numArr.map(Number);
    let sum = 0;
    arr.forEach((sub) => {
        sum += sub;
    });
    return parseFloat(sum.toFixed(10));
};

Vue.prototype.$getUrlName = function(url) {
    //获取最后一个/的位置
    var site = url.lastIndexOf("/");
    //截取最后一个/后的值
    return url.substring(site + 1, url.length);
};
Vue.prototype.switchState = function(state) {
    let stateClass = "";
    if (!state || typeof state != "string") return stateClass;
    if (state.indexOf("驳回") !== -1 || state.indexOf("拒绝") !== -1) {
        stateClass = "serious-color";
    }
    return stateClass;
};
new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");