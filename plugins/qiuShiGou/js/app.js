var data, view;

data = new Data();
$(document).ready(function() {
    view = new View(data);
    view.index();
    var M = new QSCMobile('qiuShiGou');
    for (var i = 0; i < 100; i++) {
        M.kvdb.set(i, 'helloworld');
    }
});
