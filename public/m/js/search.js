$(function() {
    // 给搜索按钮添加点击事件
    $('.search-btn').on('click',function() {
        // alert(1);
        // 获取用户输入的关键词
        // console.log(this);
        var keyword = $(this).siblings().val().trim();
        console.log(keyword);
        // 判断用户是否输入了关键词
        if(keyword) {
            // 将用户输入的关键词追加到数组中
            keyArr.unshift(keyword);
            // 将数组存储到本地存储中
            localStorage.setItem('keyName',JSON.stringify(keyArr));
            location.href = "search-result.html?key=" + keyword;
        } else {
            alert('请输入要搜索的商品的关键词');
        }
    })

    // 实现历史关键词储存
    // 准备存储关键词的数组
    var keyArr = [];
    // 判断本地存储中是否已经有存储的关键词
    if(localStorage.getItem('keyName')) {
        keyArr = JSON.parse(localStorage.getItem('keyName'));
        // console.log(keyArr);
        var html = template('historyTpl',{result:keyArr});
        $('.history-box').html(html);
    }

    // 清除历史记录
    $('.clear').on('click',function() {
        // 清空页面上的数据
        $('.history-box').html("");
        // 清空本地存储的数据
        localStorage.removeItem('keyName');
    })

})