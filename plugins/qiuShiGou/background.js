var M = new QSCMobile('qiuShiGou')

M.view.card({
    title: '求失狗',
    content: '这是一个正文'
});

setInterval(function() {
    M.view.card({
        title: '求失狗啊',
        content: '这是一个动态改变，在 <em>'+ (new Date()).getTime() + '</em> 生成'
    });
}, 10000);
