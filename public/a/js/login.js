$.ajax({
	type:'get',
	url:'/employee/checkRootLogin',
	async:false,
	success:function(res) {
		if(res.success) {
			location.href = "login.html";
		}
	}
})

$(function() {
    $('#login-btn').on('click',function() {
        var username = $.trim($('[name="username"]').val());
        var password = $.trim($('[name="password"]').val());

        if(!username) {
            alert('请输入用户名');
            return;
        }
        if(!password) {
            alert('请输入密码');
            return;
        }
        $.ajax({
            type:'post',
            url:'/employee/employeeLogin',
            data:{
                username:username,
                password:password
            },
            success:function(res) {
                console.log(res);
                if(res.success) {
                    location.href = "user.html";
                } else {
                    alert(res.message);
                }
            }
        })
    })
})