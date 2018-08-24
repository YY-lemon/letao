$(function() {
    var page = 1;
    var pageSize = 10;
    var totalPage = 0;
    // 获取一级分类数据并展示
    getData();

    // 上一页
    $('.prve').on('click',function() {
        page--;
        if(page < 1) {
            page = 1;
            alert('已经是第一页了');
            return;
        }
        getData();
    })
    // 下一页
    $('.next').on('click',function() {
        page++;
        if(page > totalPage) {
            page = totalPage;
            alert('已经是最后一页了');
            return;
        }
        getData();
    })

    // 添加分类
    $('.saveBtn').on('click',function() {
        var cateFirstName = $('[name="cateFirstName"]').val();
        if(!cateFirstName) {
            alert('请输入一级分类名称');
            return;
        }
        $.ajax({
            type:'post',
            url:'/category/addTopCategory',
            data: {categoryName:cateFirstName},
            success:function(res) {
                if(res.success) {
                    location.reload();
                }
            }

        })
    })

    function getData() {
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(res) {
                console.log(res);
                totalPage = Math.ceil(res.total / pageSize);
                var html = template('categoryFirstTpl',res);
                $('.categoryFirstBox').html(html);
            }
        })
    }
})
