$(function() {
    var page = 1;
    var pageSize = 10;
    var totalPage = 0;
    // 获取二级分类数据并展示在页面中
    getData();

    // 上一页
    $('#prevBtn').on('click',function() {
        page--;
        if(page < 1) {
            page = 1;
            alert('已经是第一页了');
            return;
        }
        getData();
    })
    // 下一页
    $('#nextBtn').on('click',function() {
        page++;
        if(page > totalPage) {
            page = totalPage;
            alert('已经是最后一页了');
            return;
        }
        getData();
    })

    // 添加分类
    $.ajax({
        type:'get',
        url:'/category/queryTopCategoryPaging',
        data:{
            page:1,
            pageSize:100
        },
        success:function(res) {
            console.log(res);
            var html = template('categoryFirstTpl',res);
            console.log(html);
            $('#categoryFirstBox').html(html);
        }
    })
    var previewImg = "";
    // 图片上传
    $('#fileUpload').fileupload({
        dataType:'json',
        done:function(e,data) {
            console.log(data);
            // 上传图片预览
            $('#preview').attr('src',data.result.picAddr);
            previewImg = data.result.picAddr;
        }
    })

    $('.saveBtn').on('click',function() {
        var brandName = $.trim($('[name="brandName"]').val());
        var categoryId = $.trim($('[name="categoryId"]').val());
        console.log(categoryId);
        $.ajax({
            type:'post',
            url:'/category/addSecondCategory',
            data:{
                brandName:brandName,
                categoryId:categoryId,
                brandLogo:previewImg,
                hot:0
            },
            success:function(res) {
                console.log(res);
                if(res.success) {
                    location.reload();
                }
            }
        })
    })














    function getData() {
        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:1,
                pageSize:10
            },
            success:function(res) {
                console.log(res);
                totalPage = Math.ceil(res.total / pageSize);
                var html = template('categorySecondTpl',res);
                $('.categorySecondBox').html(html);
            }
        })
    }
})