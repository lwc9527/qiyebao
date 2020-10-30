/**
 * 金额千位小数格式化
 * @param { Number } num 
 */
export const formatNum = (num) => {
    if(!num || typeof num!=='string'&&typeof num!=='number'){
        return '0.00';
    }
    num = parseFloat(num).toFixed(2).toString().split(".");
    num[0] = num[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), "$1,");
    return num.join(".");
  }
  
  export const formatDate = (date) => {
    var date = new Date(date);
    if (isNaN(date)) {
      return "";
    }
    var Y = date.getFullYear();
    var Month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var H = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    var Minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    var S = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return `${Y}-${Month}-${D}  ${H}:${Minute}:${S}`;
  }
  
  // 保留两位小数
  export function saveTowNumber(vaule) {
    return (vaule - 0).toFixed(2);
  }
  