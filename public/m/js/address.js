$(function() {
    // 获取用户储存的收货地址
    $.ajax({
        type:'get',
        url:'/address/queryAddress',
        dataType:'json',
        success:function(res) {
            console.log(res);
            
        }
    })
})