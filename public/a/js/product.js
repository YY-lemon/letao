$(function() {
    // 商品列表数据获取并展示在页面中
    $.ajax({
        type:'get',
        url:'/product/queryProductDetailList',
        data:{
            page:1,
            pageSize:20
        },
        success:function(res) {
            // console.log(res);
            var html = template('productTpl',res);
            $('.productBox').html(html);
        }
    })

    // 添加商品
    // 获取二级分类并展示在输入框中
    $.ajax({
        type:'get',
        url:'/category/querySecondCategoryPaging',
        data:{
            page:1,
            pageSize:100
        },
        success:function(res) {
            console.log(res);
            var html = template('secondTpl',res);
            $('#secondBox').html(html);
        }
    })

    // 图片文件上传
    var imgArray = [];
    $('#fileUpload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            console.log(data);
            imgArray.push(data.result);
            // var imgUrl= data._response.result.picAddr;
            // $("#showBrand").attr("src",imgUrl);
        }
    });

    // 实现添加商品
    $('#addProduct').on('click',function() {
        var proName = $('[name="proName"]').val();
        var oldPrice = $('[name="oldPrice"]').val();
        var price = $('[name="price"]').val();
        var proDesc = $('[name="proDesc"]').val();
        var size = $('[name="size"]').val();
        var num = $('[name="proName"]').val();
        var brandId = $('[name="brandId"]').val();
        $.ajax({
            type:'post',
            url:'/product/addProduct',
            data:{
                proName:proName,
                oldPrice:oldPrice,
                price:price,
                proDesc:proDesc,
                size:size,
                num:num,
                brandId:brandId,
                statu:1,
                pic:imgArray
            },
            success:function(res) {
                console.log(res);
                if(res.success) {
                    location.reload();
                }
            }
        })
    })
})