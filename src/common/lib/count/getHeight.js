const getHeight = function(evt){
    let windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    let newHeight = windowHeight-evt;
    // console.log(windowHeight,newHeight)
    return newHeight;
}
export default getHeight