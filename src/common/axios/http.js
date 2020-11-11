import axios from "axios";
import storage from "@c/lib/util/storage";
import router from "@/router";

import qs from "qs";
import { Loading, Message } from "element-ui";

import { SHA256withECDSA } from "@/assets/js/sha256.js"; 
import {  Aes, noAes } from "@/assets/js/crypto.js";

let option = {
  lock: true,
  text: "加载中",
  spinner: "el-icon-loading",
  background: "rgba(0, 0, 0, 0.4)",
};
let load = null;

let baseUrl = '/system' || "http://193.112.94.202";
axios.defaults.timeout = 10000;
// axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8"; // 键值对
axios.defaults.headers.post["Content-Type"] = "text/xml"; // 字符串
// axios.defaults.responseType = 'blob';
// 请求拦截器
axios.interceptors.request.use(config => {
    console.log('config22', config)
    const data = JSON.parse(JSON.stringify(config.data));

    console.log('data', data)
    // const token = storage.get("token");
    // token && (config.headers.Authorization = token);
    config.headers.tradeCode = 'NJAZX00001'; // 业务编码
    // 签名 SHA256withRSA
    config.headers.sign = 'GVBqS040Sj5ULLpK+JVr0/WwsZgKNr59RY+knGucVFMxjL1Z+AXUUo5uOGvcGfdVf5m0mqKvG93qpizbu6aB3GucKRXbRzXiLUAS2kCA4z0NiRDBBzqgqXXoZc9A5nM63cFNUTBTshvDxXxPEodB23yCKCCyfY2mNiD/Z7eGYBg='; // 业务编码

    return config;
  },error => {
    return Promise.error(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(response=> {
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
    },err => Promise.reject(err)
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
      // params.token = window.localStorage.getItem("token");
      axios.post(baseUrl + url, params).then((res) => {
          load.close();
          resolve(res.data);
      }).catch((err) => {
          load.close();
          reject(err);
          // // if (err.data.code === '10002') {
          //   console.log(22, err)
          //   router.push({ path: "/login" });
          // }else{
          //   Message({
          //     type: "error",
          //     message: err.data.msg ? err.data.msg : "服务器错误",
          //     duration: 1000,
          //   });
          // }
        });
    });
  },
};

export default Http;
