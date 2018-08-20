$(function() {
    $('nav').on('tap','a',function() {
        mui.openWindow({
            url:$(this).attr('href')
        })
    })
})