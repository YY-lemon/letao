$(function() {
    var address = null;
    // 获取用户储存的收货地址
    $.ajax({
        type:'get',
        url:'/address/queryAddress',
        success:function(res) {
            console.log(res);
            address = res;
            var html = template('addressTpl',{result:res});
            // console.log(html);
            $('.addressBox').html(html);
            
        }
    })

    // 给删除按钮添加点击事件
    $('.addressBox').on('tap','.delete-btn',function() {
        // 获取id
        // var id = this.getAttribute('data-id');
        var id = $(this).data('id');
        var li = $(this).parent().parent();
        // var li = this.parentNode.parentNode; 原生
        console.log(id);
        mui.confirm('你确定要删除吗',function(message) {
            console.log(message);
            // 确定删除
            if(message.index == 1) {
                $.ajax({
                    type:'post',
                    url:'/address/deleteAddress',
                    data:{
                        id:id
                    },
                    success:function(res) {
                        console.log(res);
                        if(res.success) {
                            // location.reload();
                            li.remove();
                        }
                    }
                })
            } else { //取消删除
                // mui.swipeoutClose(li); 原生
                mui.swipeoutClose(li[0]);
            }
        })
    })

    // 给编辑按钮添加点击事件
    $('.addressBox').on('tap','.edit-btn',function() {
        var id = $(this).data('id');
        for(var i = 0; i < address.length; i++) {
            if(address[i].id == id) {
                localStorage.setItem('editAddress',JSON.stringify(address[i]));
                break;
            }
        }
        // 跳转到编辑收货地址页面
        location.href = "addAddress.html?isEdit=1";
    })

    
})