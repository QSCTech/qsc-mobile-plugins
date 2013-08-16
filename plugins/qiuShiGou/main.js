// 插件示例：求失狗
// 命名请统一使用驼峰命名

QSCMobile.plugin.qiuShiGou = (function() {

    var M = QSCMobile,
        $ = jQuery;

    /**
     * 插件初始化时调用的方法
     *
     * @param {Function} callback 插件初始化完成后要调用的函数
     */
    var construtor = function(callback) {
        // 初始化的时候，载入CSS文件
        // 文件是相对 index.html 的路径
        M.load.css('plugins/qiuShiGou/styles.css', function() {
            callback();
        });
    };

    /**
     * 内部方法
     */
    var view = (function() {
        var search = function() {
            var htmlString = 'search';
            $('.section.qiuShiGou').html(htmlString);
        };
        var upload = function() {
            var htmlString = 'upload';
            $('.section.qiuShiGou').html(htmlString);
        };
        var recent = function() {
        }
        var index = function() {
            var htmlString = '<div class="header"><img src="plugins/qiuShiGou/text.png"></div>'
                           + '<ul class="menu">'
                           + '<li class="upload">发布物品信息</li>'
                           + '<li class="search">物品快速搜索</li>'
                           + '<li class="">查看失物招领</li>'
                           + '<li class="">查看寻物启事</li>'
                           + '<li class="">查看我发布的</li>'
                           + '</ul>';
            $('.section.qiuShiGou').html(htmlString);
            $('.section.qiuShiGou li').on('click', function() {
                console.log("click");
                var c = $(this).attr('class');
                console.log(c);
                switch (c) {
                    case 'upload':
                    upload();
                    break;
                    case 'search':
                    search();
                    break;
                }
            });
        };
        return {
            // 对外只需暴露index就够了
            index: index
        }
    })();

    /**
     * QSCMobile.view.redraw() 将会根据这里的返回结果重绘section
     */
    var section = function() {
        view.index();
    };

    /**
     * QSCMobile.view.redraw() 将会根据这里的返回结果重绘 card
     *
     * 最后必须只能返回 纯 html
     */
    var card = function() {
        return "<a href=\"#!/section/upload/\"></a>";
    };

    return {
        construtor: construtor,
        section: section,
        card: card
    };
})();