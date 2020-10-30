//删除空的属性

function objectKey(obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (obj[key] === null || obj[key] === '' || obj[key].length == 0) {
                delete obj[key]
            }
        }
    }
    return obj;
}
export default objectKey