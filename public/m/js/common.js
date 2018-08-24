$(function() {
    $('nav').on('tap','a',function() {
        mui.openWindow({
            url:$(this).attr('href')
        })
    })
})
// 封装获取地址栏中的参数
function getParamsByUrl(url,name) {
    // console.log(url.indexOf('?'));
    var params = url.substr(url.indexOf('?') + 1);
    // console.log(params);
    var parama = params.split('&');
    console.log(parama);
    for(var i = 0; i < parama.length; i++) {
        var current = parama[i].split('=');
        console.log(current);
        if(current[0] == name) {
            return current[1];
        }
    }
    return null;
}