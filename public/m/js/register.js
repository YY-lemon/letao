$(function() {
    // 给注册按钮注册点击事件
    $('#register-btn').on('click',function() {
        // 获取用户注册信息
        var username = $('[name = "username"]').val();
        var mobile = $('[name = "mobile"]').val();
        var password = $('[name = "password"]').val();
        var againPass = $('[name = "againPass"]').val();
        var vCode = $('[name = "vCode"]').val();
        // 验证用户输入的信息
        // if(username.trim() == "") {
        //     mui.toast('请输入用户名');
        //     return;
        // }
        var reg1 = /^[a-zA-Z]\w*$/i;
        if(!reg1.test(username)) {
            mui.toast('请输入用户名');
            return;
        }
        var reg2 = /^1\d{10}$/;
        if(!reg2.test(mobile)) {
            mui.toast('请输入正确的手机号');
            return;
        }
        // 密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)
        var reg3 = /^[a-zA-Z]\w{5,17}$/;
        if(!reg3.test(password)) {
            mui.toast('请输入正确的密码');
            return;
        }
        if(password !== againPass) {
            mui.toast('两次输入的密码不一致');
            return;
        }
        $.ajax({
            type:'post',
            url:'/user/register',
            data:{
                username:username,
                password:password,
                mobile:mobile,
                vCode:vCode
            },
            success:function(res) {
                // console.log(res);
                alert('注册成功');
                setTimeout(function(){
                    location.href = 'login.html';
                },2000)
            }
        })
    })
    // 给获取认证码按钮添加点击事件
    $('.getCode').on('click',function() {
        $.ajax({
            url:'/user/vCode',
            type:'get',
            success:function(res) {
                console.log(res.vCode);
            }
        })
    })
})