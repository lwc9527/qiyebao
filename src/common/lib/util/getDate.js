// 获取当前时间
let getDates = function () {
    let now = new Date();
    return formatDate(now);
}
let formatDate = function (date) {
    let [year, month, day] = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    let data = `${year}-${month}-${day}`;
    return data;
};
export default getDates