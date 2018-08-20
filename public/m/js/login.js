$(function() {
    $('#login-btn').on('click',function() {
        var username = $.trim($('[name = "username"]').val());
        var password = $.trim($('[name = "password"]').val());
        if(!username) {
            mui.toast('请输入用户名');
            return;
        }
        var reg3 = /^[a-zA-Z]\w{5,17}$/;
        if(!reg3.test(password)) {
            mui.toast('请输入正确的密码');
            return;
        }
        $.ajax({
            type:'post',
            url:'/user/login',
            data: {
                password:password,
                username:username
            },
            beforeSend:function() {
                $('#login-btn').html("正在登录...");
            },
            success:function(res) {
                if(res.success) {
                    mui.toast('登录成功');
                    $('#login-btn').html("登录");
                    setTimeout(function(){
                        location.href = 'user.html';
                    },2000)
                }
            }
        })
    })
})