setInterval(function() {
    var msg = {
        pluginID: 'qiuShiGou',
        title: '求失狗',
        content: (new Date()).getTime()+'\n'+Math.random()
    };
    QSCMobile.sendMessage(msg);
}, 1000);
