(function() {
    // 注意所有的 background.js 运行在同一个Webview中
    // 这里用匿名函数包装起来，防止变量污染
    var M = new QSCMobile('qiuShiGou');
    M.kvdb.get('qiuShiGouStarred', function(data) {
        if(!data) {
            data = [];
        }
        M.view.card({
            title: '<em>求失狗</em>',
            content: '欢迎关注求失狗！'
        });
    });
})();
