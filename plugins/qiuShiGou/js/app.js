var data, view;

data = new Data();
$(document).ready(function() {
    view = new View(data);
    view.index();
    view.msg('<em>上传失败</em><br>请检查您的网络连接');
});
