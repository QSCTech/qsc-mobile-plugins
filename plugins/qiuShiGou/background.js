var M = new QSCMobile('qiuShiGou')

setInterval(function() {
    M.view.card({
        title: '求失狗',
        content: (new Date()).getTime()+'\n'+Math.random()
    });
}, 1000);
