$(function() {
    // 获取用户列表
    $.ajax({
        type:'get',
        url:'/user/queryUser',
        data:{
            page:1,
            pageSize:6
        },
        success:function(res) {
            console.log(res);
            var html = template('userTpl',res);
            $('.userBox').html(html);
            // console.log(html);
        }
    })
    
    $('.userBox').on('click', '.edit-btn',function() {
        // alert(999)
        var isDelete = parseInt($(this).attr('data-isDelete')) ? 0 : 1;
        // var isDelete = $(this).data('isDelete');
        console.log(isDelete);
        var id = $(this).attr('data-id');
        console.log(id);
        $.ajax({
            type:'post',
            url:'/user/updateUser',
            data:{
                id:id,
                isDelete:isDelete 
            },
            success:function(res) {
                console.log(isDelete);
                    if(res.success) {
                        location.reload();
                    }
            }
        })
    })
})