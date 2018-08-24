$(function() {
    var isEdit = parseInt(getParamsByUrl(location.href,'isEdit'));
    console.log(isEdit);
    if(isEdit) {
        if(localStorage.getItem('editAddress')) {
            var addresss = JSON.parse(localStorage.getItem('editAddress'));
            console.log(addresss);
            $('[name="username"]').val(addresss.recipients);
            $('[name="postCode"]').val(addresss.postCode);
            $('[name="city"]').val(addresss.address);
            $('[name="address"]').val(addresss.addressDetail);
        }
    }
    
    // 点击省市区
    $('#selectCity').on('tap',function() {
        // 通过new mui.PopPicker()初始化popPicker组件
        var picker = new mui.PopPicker({layer:3}); 
        // 为picker选择器添加数据 setData() 支持数据格式为: 数组
        picker.setData(cityData);
        // 显示picker picker.show( SelectedItemsCallback ) 
        picker.show(function (selectItems) {
            console.log(selectItems);
            $('#selectCity').val(selectItems[0].text + selectItems[1].text + selectItems[2].text);
            $('#selectCity').parent().next().children('input').focus();
        })
    })
    // 给确认按钮添加点击事件
    $('#addAddress-btn').on('tap',function() {
        var username = $.trim($('[name="username"]').val());
        var postCode = $.trim($('[name="postCode"]').val());
        var city = $.trim($('[name="city"]').val());
        var address = $.trim($('[name="address"]').val());
        if(!username) {
            mui.toast('请输入收货人姓名');
            return;
        }
        if(!postCode) {
            mui.toast('请输入邮编');
            return;
        }
        if(!city) {
            mui.toast('请选择省市区');
            return;
        }
        if(!address) {
            mui.toast('请输入详细地址');
            return;
        }
        var data = {
            address:city,
            addressDetail:address, 
            recipients:username,
            postcode:postCode
        }
        if(isEdit) {
            var url = "/address/updateAddress";
            data.id = addresss.id;
            console.log(address);
        } else {
            var url = "/address/addAddress";
            
        }
        $.ajax({
            type:'post',
            url:url,
            data:data,
            success:function(res) {
                console.log(res);
                if(res.success) {
                    if(isEdit) {
                        mui.toast('修改地址成功');
                    } else {
                        mui.toast('收货地址添加成功');
                    }
                    setTimeout(function() {
                        location.href = "address.html";
                    },2000)
                }
            }
        })
    })
})