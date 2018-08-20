$(function() {
  // 获取修改密码按钮并添加点击事件
  $("#modify-btn").on("tap", function() {
    // 获取用户输入的信息
    var originPass = $.trim($('[name = "originPass"]').val());
    var newPass = $.trim($('[name = "newPass"]').val());
    var confirmPass = $.trim($('[name = "confirmPass"]').val());
    var vCode = $.trim($('[name = "vCode"]').val());
    // 验证用户信息
    if (!originPass) {
      mui.toast("请输入原密码");
      return;
    }
    var reg3 = /^[a-zA-Z]\w{5,17}$/;
    if (!reg3.test(newPass)) {
      mui.toast("请输入正确的密码");
      return;
    }
    if (newPass == originPass) {
      mui.toast("输入的密码与原密码一致,请重新输入");
      return;
    }
    if (newPass !== confirmPass) {
      mui.toast("两次输入的密码不一致");
      return;
    }
    if (!vCode) {
      mui.toast("请输入认证码");
      return;
    }
    $.ajax({
      type: "post",
      url: "/user/updatePassword",
      data: {
        oldPassword: "originPass",
        newPassword: "newPass",
        vCode: vCode
      },
      success: function(res) {
        if (res.success) {
          mui.toast("修改密码成功");
          setTimeout(function() {
            location.href = "login.html";
          }, 2000);
        }
      }
    });
  });

  // 获取认证码
  $(".getCode").on("tap", function() {
    $.ajax({
      type: "get",
      url: "/user/vCodeForUpdatePassword",
      success: function(res) {
        console.log(res.vCode);
      }
    });
  });
});
