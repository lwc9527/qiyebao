/*
 * @Descripttion: 
 * @Author: dongxiaohai
 * @Date: 2020-10-17 09:14:28
 * @LastEditors: dongxiaohai
 * @LastEditTime: 2020-10-21 20:37:55
 */
const path = require("path");
const resolve = dir => path.join(__dirname, dir);

const proEnv = require('./src/common/config/index'); //配置环境
let proxyObj = {};
for (var i in proEnv) {
    proxyObj[i] = {
        target: proEnv[i],
        changeOrigin: true,
        pathRewrite: {
            [`^${i}`]: '/'
        }
    };
}
module.exports = {
    publicPath: "./",
    productionSourceMap: false,
    outputDir: "househ5",       //打包名称
    // webpack配置
    chainWebpack: config => {
        config.resolve.alias
            .set("@", resolve("src")) //
            .set("_c", resolve("src/components"))
            .set("@a", resolve("src/assets"))
            .set("@c", resolve("src/common"));
    },
    // webpack-dev-server
    devServer: {
        open: true,
        host: "0.0.0.0",
        port: 8068,
        https: false,
        hotOnly: false,
        proxy: proxyObj
    },
    // 第三方插件配置
    pluginOptions: {
        // ...
    }
};