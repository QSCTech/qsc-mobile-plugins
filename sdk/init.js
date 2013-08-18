$(document).ready(function() {

    var id = "qiuShiGou";

    var html = '<div class="card '+id+'"></div>'
             + '<div class="section '+id+'"></div>';
    $("body").html(html);

    QSCMobile.plugin.load(id, function() {
        window.plugin = QSCMobile.plugin[id];
        window.plugin.ready(function() {
            window.plugin.section();
        });
    });

    $.get('plugins/'+id+'/manifest.json', function(data) {
        var info = "Name: "+data.name
                 + "<br>ID: "+data.id
                 + "<br>Author: "+data.developer.name;
        $("#ctrl #info").append(info);
    });

});
