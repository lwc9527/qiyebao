// 输入框验证
export default {

    regPhone: /^1[0-9]{10}$/, //手机号正则

    regEmail: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/, //邮箱正则

    regChinese: /[\u4e00-\u9fa5]/g, //汉字正则

    regEnglish: /^[a-z\s]*$/i, //英文可输入空格正则

    regNumber: /[^\d]/g, //数字正则

    regZNumber: /^[1-9]\d*$/, //正数字正则

    regNumberAndSymbol: /[^\d-]/g, //数字带特殊符号正则

    regZipCode: /^[1-9][0-9]{5}$/, //邮编

    regDecimal: /^100$|^\d{1,2}\.?$|^\d{1,2}(\.\d{1,4}$)/, //输入1-100之间得整数，最多保留四位小数

    regIntegerTwoDecimal: /^([1-9][0-9]*|[0])(.(\d{1,2})?)?$/, //整数保留两位小数

    regYYZZH:   /^[a-zA-Z0-9]{15,18}$/ ,        // 营业执照号正则

    regIdCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/ ,          //身份证正则 

    // regPassWord : /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6}$/    //匹配6位以上数字和字母密码的正则表达式
    regPassWord : /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/    //匹配6位以上数字和字母密码的正则表达式

}