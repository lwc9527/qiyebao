/*
 * @Descripttion: 
 * @Author: dongxiaohai
 * @Date: 2020-10-17 09:14:28
 * @LastEditors: dongxiaohai
 * @LastEditTime: 2020-10-21 20:27:05
 */

const config = {
    development: {
        //开发
        "/system": "http://193.112.94.202/system", //人力资源和用户信息模块
    },
    test: {
        //测试
    },
    production: {
        //生产
        // "/system": "http://193.112.94.202/system", //人力资源和用户信息模块
    },
};
module.exports = config[process.env.NODE_ENV];