// 插件示例：求失狗
// 这是一个简单的示例，我就不做缓存了

QSCMobile.plugin.qiuShiGou = (function() {

    var M = QSCMobile,
        $ = jQuery;

    var View, view, Data, data;

    // 数据层抽象

    Data = (function() {
        function Data() {
            this.api = '//m.myqsc.com/qiuShiGou/';
        }

        /**
         * 获取物品信息
         *
         * @param {Object} args 参数
         * @param {Function} callback function to callback when success
         * @param {Function} callback function to callback when fail
         */
        Data.prototype.get = function(args, success, fail) {
            M.get(this.api, args, success, fail);
        };

        /**
         * 上传新的物品信息
         *
         * @param {Object} data 物品信息
         * @param {Function} callback function to callback when success
         * @param {Function} callback function to callback when fail
         */
        Data.prototype.upload = function(data, success, fail) {
            data.method = 'upload';
            this.get(data, success, fail);
        };

        return Data;
    })();

    data = new Data();

    // 视图层抽象

    View = (function() {

        var _this;

        function View() {
            _this = this;
            this.headerString = '<div class="header">'
                              + '<img src="plugins/qiuShiGou/logo.png">'
                              + '<img src="plugins/qiuShiGou/text.png">'
                              + '</div>';
            // View 初始化的时候，载入CSS文件
            // 文件是相对 index.html 的路径
            M.load.css('plugins/qiuShiGou/styles.css');
        }

        View.prototype.list = function(method, page) {
            var success = function(data) {
                alert(data);
            };
            var fail = function() {
                _this.msg('获取数据失败，请检查网络连接');
            };
            data.get({method: method, page: page}, success, fail);
        };

        View.prototype.msg = function(msg) {
            var htmlString = '<div class="msg">' + msg + '</div>';
            $('.section.qiuShiGou .main').html(htmlString);
        };

        View.prototype.search = function() {
            var htmlString = 'search';
            $('.section.qiuShiGou .main').html(htmlString);
        };

        View.prototype.upload = function() {
            var htmlString = '<div class="upload">'
                           + '<input class="name" placeholder="物品名，如：校园卡，钥匙">'
                           + '<textarea class="detail" placeholder="物品具体描述，如钱包颜色，校园卡姓名等等"></textarea>'
                           + '<select class="campus">'
                           + '<option>紫金港校区</option>'
                           + '<option>玉泉校区</option>'
                           + '<option>西溪校区</option>'
                           + '<option>之江校区</option>'
                           + '<option>舟山校区</option>'
                           + '</select>'
                           + '<input class="place" placeholder="详细地点">'
                           + '<input class="contact" placeholder="联系方式 / 联系地点">'
                           + '<input type="button" value="发布">'
                           + '</div>';
            $('.section.qiuShiGou .main').html(htmlString);
            $('.section.qiuShiGou input[type="button"]').click(function() {
                var obj = {};
                ['name', 'detail', 'campus', 'place', 'contact'].forEach(function(elem) {
                    obj.elem = $('.section.qiuShiGou .upload .'+elem).val();
                });
                var success = function() {
                    _this.msg('上传成功');
                };
                var fail = function() {
                    _this.msg('上传失败，请检查您的网络连接');
                };
                data.upload(obj, success, fail);
            });
        };

        // 失物招领
        View.prototype.found = function(page) {
            this.list('found', page);
        };

        // 寻物启事
        View.prototype.lost = function(page) {
            this.list('lost', page);
        };

        // 我关注的
        View.prototype.starred = function(page) {
            this.list('starred', page);
        };

        View.prototype.index = function() {
            var htmlString = this.headerString
                           + '<div class="main">'
                           + '<ul class="menu">'
                           + '<li class="upload">发布信息</li>'
                           + '<li class="search">物品搜索</li>'
                           + '<li class="found">失物招领</li>'
                           + '<li class="lost">寻物启事</li>'
                           + '<li class="mine">我发布的</li>'
                           + '</ul>'
                           + '</div>';
            $('.section.qiuShiGou').html(htmlString);
            $('.section.qiuShiGou .header').on('click', function() {
                _this.index();
            });
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
     * 插件初始化时调用的方法
     *
     * @param {Function} callback 插件初始化完成后要调用的函数，必须要有这个参数
     */
    var construtor = function(callback) {

        /**
         * 获取数据成功后回调
         */
        var success = function(data) {
            data.starred = data;
            callback();
        };

        /**
         * 获取数据失败后回调
         */
        var fail = function() {
            callback();
        };

        data.get({method: 'starred'}, success, fail);

    };

    /**
     * 在绘制section时，这个函数被调用
     */
    var section = function() {
        view = new View();
        view.index();
    };

    /**
     * 绘制 card 时将会根据这里的返回的 html 绘制 card
     * 此时 constructor 已经完成并执行回调
     */
    var card = function() {
        if(data.starred)
          return JSON.stringify(data.starred);
        else
          return "<h1>求失狗</h1>";
    };

    return {
        construtor: construtor,
        section: section,
        card: card
    };
})();