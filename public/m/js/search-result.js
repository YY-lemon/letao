// 获取到地址栏中用户输入的搜索关键字
var keyword = getParamsByUrl(location.href,"key");

var page = 1;

var html = "";

var priceSort = 1;

$(function() {
    
    // console.log(location.href);
    // console.log(keyword);

    mui.init({
        pullRefresh : {
          container:'#refreshContainer',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
          up : {
            height:50,//可选.默认50.触发上拉加载拖动距离
            auto:true,//可选,默认false.自动上拉加载一次
            contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
            contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
            callback :getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
          }
        }
    })


    // 商品排序
    $('.priceSort').on('tap',function() {
        priceSort = priceSort == 1 ? 2 : 1;//更改价格排序条件
        // 对之前的各种配置初始化
        // 清空页面中的数据
        html = "";
        // 恢复当前页的值为1
        page = 1;
        // 重新开启上拉加载
        //pullup-container为在mui.init方法中配置的pullRefresh节点中的container参数；
        //注意：refresh()中需传入true
        mui('#refreshContainer').pullRefresh().refresh(true);
        getData();
    })
    
})
// 封装获取地址栏中的参数
function getParamsByUrl(url,name) {
    // console.log(url.indexOf('?'));
    var params = url.substr(url.indexOf('?') + 1);
    // console.log(params);
    var parama = params.split('&');
    console.log(parama);
    for(var i = 0; i < parama.length; i++) {
        var current = parama[i].split('=');
        console.log(current);
        if(current[0] == name) {
            return current[1];
        }
    }
    return null;
}

var This = null;
function getData() {
    if(!This) {
        This = this;
    }
    $.ajax({
        type:'get',
        url:'/product/queryProduct',
        data:{
            page:page++,
            pageSize:3,
            proName:keyword,
            price:priceSort

        },
        dataType:'json',
        success:function(res) {
            console.log(res);
            if(res.data.length > 0) {
                html += template('searchTpl',res);
                // console.log(html);
                $('.searchBox').html(html);
                This.endPullupToRefresh(false);
            } else {
                This.endPullupToRefresh(true);
            }
            
        }
    })
}






















// function GetQueryString(name)
// {
//      var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
//      var r = window.location.search.substr(1).match(reg);
//      if(r!=null)return  unescape(r[2]); return null;
// }