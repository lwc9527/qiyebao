/*
 * @Descripttion: 
 * @Author: dongxiaohai
 * @Date: 2020-10-17 09:14:28
 * @LastEditors: dongxiaohai
 * @LastEditTime: 2020-10-21 14:52:13
 */
//请求URL
export default {
    setUserData: "/system/login/setUserData", //用户绑定微信公众号
    sdelUserData: "/system/login/sdelUserData", //解绑微信公众号

    addlogin: '/system/login/addlogin', //房东注册
    myLogin: '/system/login/myLogin', //房东登录
    myHouse: "/system/login/myHouse", //我的房源
    addHouse: "/system/login/addHouse", //我的房源 --增加楼栋
    editHouse: "/system/login/editHouse", //我的房源 --修改楼栋
    delHouse: "/system/login/delHouse", //我的房源 --删除楼栋
    addRoom: "/system/login/addRoom", //我的房源 --添加楼栋房子
    editRoom: "/system/login/editRoom", //我的房源 --修改楼栋房子
    roominfo: "/system/login/roominfo", //我的房源 --查询楼栋房子信息
    delRoom: "/system/login/delRoom", //我的房源 --删除楼栋房子信息


    myroom: "/system/login/myroom", //我的房间

    // 出租
    getRentOutLists: "/system/login/Register", //获取出租列表数据
    addRentOut: "/system/login/addlessee", //添加住户
    editlessee: "/system/login/editlessee", //修改住户

    //快速抄表
    rapidAddShowBill: "/system/login/rapidAddShowBill", //快速抄表
    addListbill: "/system/login/addListbill", //快速抄表

    //房租单
    Showbill: "/system/login/Showbill", //房租列表数据

};
