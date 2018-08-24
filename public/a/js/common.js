
// 登录拦截
$.ajax({
	type:'get',
	url:'/employee/checkRootLogin',
	async:false,
	success:function(res) {
		if(res.error && res.error == 400) {
			location.href = "login.html";
		}
	}
})

$(function(){

	$('.login_out_bot').on('click',function() {
		if(confirm('确定要退出吗?')) {
			$.ajax({
				type:'get',
				url:'/employee/employeeLogout',
				success:function(res) {
					console.log(res);
					if(res.success) {
						location.href = "login.html";
					} else {
						alert(res.message);
					}
				}
			})
		}
	})



	var navLi = $('.navs li')

	navLi.on('click',function(){

		$(this).find('ul').slideToggle();

	});

});