var userInfo = null;

$.ajax({
    type:'get',
    url:'/user/queryUserMessage',
    async:false,
    success:function(res) {
        console.log(res);
        // console.log(11);
        
        if(res.error && res.error == 400) {
            location.href = "login.html";
            
             
        }
        // 将用户信息临时存储  
        userInfo = res;
    }
})



$(function() {
    // 给退出登录按钮注册点击事件
    $('#logOut').on('click',function() {
        $.ajax({
            type:'get',
            url:'/user/logout',
            success:function(res) {
                if(res.success) {
                    mui.toast("退出登录成功");
                    setTimeout(function(){
                        location.href = "index.html";
                    },2000)
                    
                }
            }
        })
    })


    var html = template('userTpl',userInfo);
    console.log(html);
    $('#userInfoBox').html(html);
})