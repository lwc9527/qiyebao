import axios from "axios";
import storage from "@c/lib/util/storage";
import router from "@/router";

import qs from "qs";
import { Loading, Message } from "element-ui";
let option = {
  lock: true,
  text: "加载中",
  spinner: "el-icon-loading",
  background: "rgba(0, 0, 0, 0.4)",
};
let load = null;

let baseUrl = "http://193.112.94.202";

axios.defaults.timeout = 50000;
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";
// axios.defaults.responseType = 'blob';
// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    const token = storage.get("token");
    token && (config.headers.Authorization = token);
    return config;
  },
  (error) => {
    return Promise.error(error);
  }
);
// console.log(process.env.NODE_ENV)
// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    if (
      response.data.code === "10000" ||
      response.headers["content-type"] ===
        "application/octet-stream;charset=UTF-8" ||
      response.headers["content-type"] === "application/octet-stream" ||
      response.data.code === 10000
    ) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (err) => Promise.reject(err)
);
const Http = {
  post(url,params) {
    load = Loading.service(option);
    return new Promise((resolve, reject) => {
      // let newParams = qs.stringify({ data: JSON.stringify(params) });
      axios
        .post(baseUrl + url, params)
        .then((res) => {
          load.close();
          resolve(res.data);
        })
        .catch((err) => {
          load.close();
          Message({
            type: "error",
            message: err.data.msg,
            duration: 1000,
          });
          reject(err.data);
        });
    });
  },
  get(url, params, headers) {
    load = Loading.service(option);
    return new Promise((resolve, reject) => {
      params.command = url;
      params.platform = "web";
      let newParams = encodeURIComponent(JSON.stringify(params));
      axios
        .get(baseUrl + "/service?data=" + newParams, headers)
        .then((res) => {
          load.close();
          resolve(res.data);
        })
        .catch((err) => {
          load.close();
          reject(err.data);
          Message({
            type: "error",
            message: err.data.msg,
            duration: 1000,
          });
        });
    });
  },
  getNew(url, params, type, headers) {
    return new Promise((resolve, reject) => {
      // if(process.env.NODE_ENV=='development'){
      url = type ? type + url : url;
      // }
      let newParams = {};
      if (headers) {
        headers.params = params;
        newParams = headers;
      } else {
        newParams.params = params;
      }
      axios
        .get(url, newParams)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
          Message({
            type: "error",
            message: err.data.message ? err.data.message : "服务器错误",
            duration: 1000,
          });
          if (err.data.code === 77777) {
            router.push({ path: "/" });
          }
        });
    });
  },
  postNew(url, params,type) {
    load = Loading.service(option);
    return new Promise((resolve, reject) => {
      // url = type ? type + url : url;
      params.token = window.localStorage.getItem("token");
      axios
        .post(baseUrl + url, params)
        .then((res) => {
          load.close();
          resolve(res.data);
        })
        .catch((err) => {
          load.close();
          reject(err);
          if (err.data.code === '10002') {
            console.log(22)
            router.push({ path: "/login" });
          }else{
            Message({
              type: "error",
              message: err.data.msg ? err.data.msg : "服务器错误",
              duration: 1000,
            });
          }
        });
    });
  },
};

export default Http;
