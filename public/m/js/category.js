$(function() {
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    // 请求数据接口
    $.ajax({
        type:'get',
        url:'/category/queryTopCategory',
        dataType:'json',
        success:function(res) {
            // console.log(res);
            var html = template('cate_Left',{
                result:res.rows
            });
            $('.links').html(html);
            if(res.rows.length) {
                $('.links').find('li').eq(0).addClass('active');
                var id = res.rows[0].id;
                getSecondCategory(id);
            }

            $('.links').on('click','li',function() {
                var id = $(this).find('a').attr('data-id');
                $(this).addClass('active').siblings().removeClass('active');
                getSecondCategory(id);
            })
        }
    })
})
function getSecondCategory(id) {
    $.ajax({
        type:'get',
        url:'/category/querySecondCategory',
        data:{
            id:id
        },
        dataType:'json',
        success:function(res) {
            console.log(res);
           var html2 = template('cate_Right',res);
           console.log(html2);
           $('.brand-list').html(html2);
        }
    })
}