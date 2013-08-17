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

    var View, view;

    View = (function() {

        var _this;

        function View() {
            _this = this;
            this.headerString = '<div class="header">'
                              + '<img src="plugins/qiuShiGou/logo.png">'
                              + '<img src="plugins/qiuShiGou/text.png">'
                              + '</div>';
        }

        View.prototype.search = function() {
            var htmlString = 'search';
            $('.section.qiuShiGou').html(htmlString);
        };

        View.prototype.upload = function() {
            var htmlString = 'upload';
            $('.section.qiuShiGou').html(htmlString);
        };

        View.prototype.found = function() {
            var htmlString = 'found';
            $('.section.qiuShiGou').html(htmlString);
        };

        View.prototype.lost = function() {
            var htmlString = 'lost';
            $('.section.qiuShiGou').html(htmlString);
        };

        View.prototype.mine = function() {
            var htmlString = 'mine';
            $('.section.qiuShiGou').html(htmlString);
        };

        View.prototype.index = function() {
            var htmlString = this.headerString
                           + '<ul class="menu">'
                           + '<li class="upload">发布信息</li>'
                           + '<li class="search">物品搜索</li>'
                           + '<li class="found">失物招领</li>'
                           + '<li class="lost">寻物启事</li>'
                           + '<li class="mine">我发布的</li>'
                           + '</ul>';
            $('.section.qiuShiGou').html(htmlString);
            $('.section.qiuShiGou li').on('click', function() {
                var view = $(this).attr('class'),
                    allow = ["search", "upload", "found", "lost", "mine", "index"];
                if(allow.indexOf(view) > -1) {
                    _this[view].call(_this);
                }
            });
        };

        return View;
    })();

    /**
     * QSCMobile.view.redraw() 将会根据这里的返回结果重绘section
     */
    var section = function() {
        view = new View();
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