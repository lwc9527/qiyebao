import regExp from './regexp';
import config from "@c/config";
import CryptoJS from 'crypto-js'; // 原crypto-js AES加密文件
import Cookie from "js-cookie";
import SM4Util from './sm4/SM4'; // 原ms4加密文件
/**
 * 成功弹窗
 */
export const successMessage = (self, msg, extra) => {
    if (!self || !msg) {
        return;
    }
    const options = {
        message: msg,
        type: 'success',
        duration: 3000,
        center: true
    }
    self.$message(Object.assign(options, extra));
}
export const errorMessage = (self, msg, extra) => {
        if (!self || !msg) {
            return;
        }
        const options = {
            message: msg,
            type: 'error',
            duration: 3000,
            center: true
        }
        self.$message(Object.assign(options, extra));
    }
    /**
     * 判断字符串是否为空/全空格
     */
export const isEmpty = (str) => {
    if (!str) {
        return true;
    }
    if (str.match(/^\s+$/)) {
        return true;
    }
    if (str.match(/^[ ]+$/)) {
        return true;
    }
    if (str.match(/^[ ]*$/)) {
        return true;
    }
    //空|空格|换行
    if (str.match(/^\s*$/)) {
        return true;
    }
    return false;
}

//对象深复制
export const deepCopy = (o, c) => {
        var c = c || {}
        for (var i in o) {
            if (typeof o[i] === 'object') {
                //要考虑深复制问题了
                if (o[i].constructor === Array) {
                    //这是数组
                    c[i] = []
                } else {
                    //这是对象
                    c[i] = {}
                }
                deepCopy(o[i], c[i])
            } else {
                c[i] = o[i]
            }
        }
        return c
    }
    //数组深复制
export const arrayCopy = (o, c) => {
        var c = c || []
        for (var i in o) {
            if (typeof o[i] === 'object') {
                //要考虑深复制问题了
                if (o[i].constructor === Array) {
                    //这是数组
                    c[i] = []
                } else {
                    //这是对象
                    c[i] = {}
                }
                deepCopy(o[i], c[i])
            } else {
                c[i] = o[i]
            }
        }
        return c
    }
    /**
     * 获取某个用户信息
     * @param { attr } string | 属性名称
     * @param { cookieKey } string | 当前cookie名称
     */
export const getCookieName = (attr, cookieKey = "userData") => {
    let cookieVal = Cookie.get(cookieKey); // 用户标识信息
    // console.log("cookieVal~~~~~~~~~~~", cookieVal);
    if (cookieVal) {
        cookieVal = JSON.parse(cookieVal);
        return cookieVal[attr];
    }
    return "";
};
/**
 * 
 * @param {需要加密的值} data 
 */
// export const getAES = data => { //AES加密方式
//   var key = CryptoJS.enc.Utf8.parse("aiXiao4513894521"); //密钥
//   var encrypted = CryptoJS.AES.encrypt(data, key, {
//     mode: CryptoJS.mode.ECB,
//     padding: CryptoJS.pad.Pkcs7
//   });
//   return encrypted.toString();
// }

export const getAES = data => { //SM4加密方式
        var msg = data;
        if (typeof(data) !== 'string') {
            msg = JSON.stringify(data);
        }
        var s4 = new SM4Util();
        // ECB 模式
        var encryptData = s4.encryptData_ECB(msg);
        return encryptData;
    }
    /**
     * 
     * @param {传入的解密值} word 
     */
export const decrypt = (word) => { // 解密
    var key = CryptoJS.enc.Utf8.parse("aiXiao4513894521");
    var decrypt = CryptoJS.AES.decrypt(word, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    var bet = CryptoJS.enc.Utf8.stringify(decrypt).toString() //
    return bet;
}
export const dateFormat = (time) => { //日期格式化 示例：2018-11-01
    if (!time) {
        return '';
    }
    let date = new Date(time);
    let year = date.getFullYear();
    let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    // 拼接
    return `${year}-${month}-${day}`;
}
export const timeFormat = (time) => {
        if (!time) {
            return '';
        }
        let date = new Date(time);
        let year = date.getFullYear();
        let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        let minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        let second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        // 拼接
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }
    /**
     * 
     * @param {Array} arr  
     * @param {string} r | 转换规则
     */
export const join = (arr, r = ',') => {
    return arr.join(r);
}

//金额千位小数格式化
export const formatNum = (num) => {
    if (!Number(num)) {
        return "0.00";
    }
    num = parseFloat(num).toFixed(2).toString().split(".");
    num[0] = num[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), "$1,");
    return num.join(".");
}
export const formatInt = (str) => {
    str = str.replace(",", "");
    // str = parseInt(str);
    return str;
}

/**
 * 保留两位小数
 * @param { str } Number,String | 日期
 */
export const floatNum = str => {
    if (str) {
        return parseFloat(str).toFixed(2);
    }
    return 0;
};

//手机号码验证
export const isPhone = (phone) => {
    //   var phoneReg = /^1[0-9]{10}$/;
    //电话  
    if (!regExp.regPhone.test(phone)) {
        return false;
    } else {
        return true;
    }
}
export const isEmail = (email) => {
    //   var emailReg = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
    if (!regExp.regEmail.test(email)) {
        return false;
    } else {
        return true;
    }
}

export const isBusiness = (business) => {
    var buReg = /^[a-zA-Z0-9]{15,18}$/;
    if (!buReg.test(business)) {
        return false;
    } else {
        return true;
    }
}

/**
 * 
 * @param {判断的对象} obj 
 */
export const ObjEmpty = (obj) => { //判断对象里属性是否全为空
    let isEmpty = true;
    if (!(obj instanceof Object)) {
        return true;
    }
    for (let key in obj) {
        if (obj[key] || obj[key] === 0) {
            isEmpty = false;
            break;
        }
    }
    return isEmpty;
}

/**
 * 
 * @param {转换的金额} money 
 */
export const moneyToChinese = (money) => { //金额转大写
    //汉字的数字
    var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
    //基本单位
    var cnIntRadice = new Array('', '拾', '佰', '仟');
    //对应整数部分扩展单位
    var cnIntUnits = new Array('', '万', '亿', '兆');
    //对应小数部分单位
    var cnDecUnits = new Array('角', '分', '毫', '厘');
    //整数金额时后面跟的字符
    var cnInteger = '整';
    //整型完以后的单位
    var cnIntLast = '元';
    //最大处理的数字
    var maxNum = 999999999999999.9999;
    //金额整数部分
    var integerNum;
    //金额小数部分
    var decimalNum;
    //输出的中文金额字符串
    var chineseStr = '';
    //分离金额后用的数组，预定义
    var parts;
    if (money === '') { //不能用==
        return '';
    }
    money = parseFloat(money);
    if (money >= maxNum) {
        //超出最大处理数字
        return '';
    }
    if (money == 0) {
        chineseStr = cnNums[0] + cnIntLast + cnInteger;
        return chineseStr;
    }
    //转换为字符串
    money = money.toString();
    if (money.indexOf('.') == -1) {
        integerNum = money;
        decimalNum = '';
    } else {
        parts = money.split('.');
        integerNum = parts[0];
        decimalNum = parts[1].substr(0, 4);
    }
    //获取整型部分转换
    if (parseInt(integerNum, 10) > 0) {
        var zeroCount = 0;
        var IntLen = integerNum.length;
        for (var i = 0; i < IntLen; i++) {
            var n = integerNum.substr(i, 1);
            var p = IntLen - i - 1;
            var q = p / 4;
            var m = p % 4;
            if (n == '0') {
                zeroCount++;
            } else {
                if (zeroCount > 0) {
                    chineseStr += cnNums[0];
                }
                //归零
                zeroCount = 0;
                chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
            }
            if (m == 0 && zeroCount < 4) {
                chineseStr += cnIntUnits[q];
            }
        }
        chineseStr += cnIntLast;
    }
    //小数部分
    if (decimalNum != '') {
        var decLen = decimalNum.length;
        for (var i = 0; i < decLen; i++) {
            var n = decimalNum.substr(i, 1);
            if (n != '0') {
                chineseStr += cnNums[Number(n)] + cnDecUnits[i];
            }
        }
    }
    if (chineseStr == '') {
        chineseStr += cnNums[0] + cnIntLast + cnInteger;
    } else if (decimalNum == '') {
        chineseStr += cnInteger;
    }
    return chineseStr;
}


export const createGuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    })
}

/**
 * @param { function } fn 函数
 * @param { 1000s } wait 毫秒
 * 函数防抖 -- 在规定的时间内没有持续触发事件才会触发函数执行
 */
export const debounce = (fn, wait) => {
    let timer
    return function() {
        let self = this;
        let args = arguments;
        if (timer) clearTimeout(timer)
        else setTimeout(function() {
            fn.apply(self, args);
        }, wait)
    }
}

/**
 * @param { function } fn 函数
 * @param { 1000s } wait 毫秒
 * 函数节流 -- 规定每隔多少秒执行一个事件处理函数
 */
export const throttle = (fn, wait) => {
    let timer
    return function() {
        let self = this;
        let args = arguments;
        if (!timer) {
            timer = setTimeout(function() {
                fn.apply(self, args);
            }, wait)
        }
    }
}


/**
 * @param { num } Number 数字类型
 * 限制只能输入数字
 */
export const formatNumber = num => { //
    return num.replace(regExp.regNumber, "");
}


/**
 * @param { name } String 字符类型
 * 获取地址栏参数
 */
export const getUrlParam = name => {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    let r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]);
    return null;
}

/**
 * @param { name } String 字符类型
 * 获取文件拓展名
 */
export const getFileExten = name => {
        if (!name) return '';
        var index = name.lastIndexOf('.');
        return name.substring(index).toLowerCase();
    }
    /**
     * @param { name } String 字符类型
     * 获取文件名
     */
export const getFileName = name => {
        if (!name) return '';
        var index = name.lastIndexOf('/');
        return name.substring(index + 1, name.length);
    }
    /**
     * @param { str } String 字符类型
     * 去掉字符串空格
     */
export const clearBlank = str => {
    return String.prototype.replace.call(str, /\s*/g, "");
}

export const regIdNo = (no) => {
    var phoneReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    //身份证
    if (!phoneReg.test(no)) {
        return false;
    } else {
        return true;
    }
}

export const getUrlzhhz = () => {
    return config["/zhhz"];
};

export const getUrlticket = () => {
    return config["/hz"];
};

/**
 * @param { str } string 类型
 * 格式化不输入中文
 */
export const formatNotChinese = str => {
        return str.replace(regExp.regChinese, '');
    }
    /**
     * @param { num } Number 类型
     * 输入银行卡号4字隔开 (新增)
     */
export const formatNumberFour = num => {
        return num.replace(/\s/g, '').replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
    }
    /**
     * @param { num } Number 类型
     * 限制只能输入数字带特殊符号正则
     */
export const regNumberAndSymbol = num => {
        return num.replace(regExp.regNumberAndSymbol, '');
    }
    /**
     * @param { num } Number 类型
     * 限制输入1-100得整数最多输入4位小数
     */
export const formatDecimalNum = (num, oldNum) => {
    if (!num) {
        return num;
    } else if (regExp.regDecimal.test(num)) {
        return num;
    } else {
        return num.replace(num, oldNum);
    }
}

export const formatMoney = (nStr) => {
    if (nStr) {
        nStr += "";
        let fn = str => {
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
        return "0.00";
    }
}