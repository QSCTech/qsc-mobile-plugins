$(document).ready(function() {

    $(window).on('hashchange', function() {
        window.location.reload();
    });

    var id = window.location.hash.replace(/#/g, '');
    if(id.length < 1) {
        window.location.hash = 'qiuShiGou';
    }

    var html = '<div class="card '+id+'"></div>'
             + '<div class="section '+id+'"></div>';
    $("#wrap").append(html);

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

    $('#view div').click(function() {
        $('.current').removeClass('current');
        $(this).addClass('current');
        var area = $(this).attr('id');
        window.plugin[area]();
    });
});
