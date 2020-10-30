

let clone = function(arr){
    let str = JSON.stringify(arr);
    return JSON.parse(str)
}
export default clone;