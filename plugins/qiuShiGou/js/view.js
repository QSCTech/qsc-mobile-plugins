var View;

View = (function() {

    var _this;

    function View(data) {
        _this = this;
        this.data = data;

        $('#header').on('click', function() {
            _this.index();
        });
    }

    View.prototype.list = function(query, prepend) {
        // var success = function(data) {
        //     alert(data);
        // };
        // var fail = function() {
        //     _this.msg('获取数据失败，请检查网络连接');
        // };
        // data.get(query, success, fail);

        var currentPage = query.page ? query.page : 1;

        // fake data
        var sample = function() {
            var random = parseInt(Math.random() * 100);
            return {uuid: Math.uuid(), name: '校园卡'+random, detail: '很萌的', campus: '紫金港校区', place: '小剧场217', contact: '10086'};
        };
        var data = [];
        for(var i = 0; i<10; i++) {
            data.push(sample());
        }
        var htmlString = data.map(function(elem) {
            // .info 默认收起
            var html ='<li><div class="title">'+elem.name+' - '+elem.campus+'</div>'
                     + '<div class="info">地点：'+elem.place+'<br>具体描述：'+elem.detail+'<br>联系方式：'+elem.contact+'</div></li>';
            return html;
        });
        if(!prepend) prepend = '';
        htmlString = '<ul class="list">'+prepend+htmlString.join('')+'<a class="prev">上一页</a> / <a class="next">下一页</a></ul>';
        $('#content').html(htmlString);
        $('li').click(function() {
            $(this).find('.info').slideToggle();
        });
        $('.prev').click(function() {
            query.page--;
            _this.list(query, prepend);
        });
        $('.next').click(function() {
            query.page++;
            _this.list(query, prepend);
        });
    };

    View.prototype.header = function(title) {
        var htmlString = '<span class="title">'+title+'</span> | <a href="index.html">回到首页</a>';
        $('#header').html(htmlString);
    };

    View.prototype.msg = function(msg, title) {
        if(!title)
          title = '遇到错误了';
        this.header(title);
        var htmlString = '<div class="msg"><img src="images/logo.png"><p>' + msg + '</p></div>';
        $('#content').html(htmlString);
    };

    View.prototype.search = function(keyword, page) {
        var query = {keyword: keyword, page: page};
        var prepend = '<input type="text" class="search" placeholder="搜索">';
        this.list(query, prepend);
    };

    View.prototype.upload = function() {
        var htmlString = '<div class="upload">'
                       + '<select class="type">'
                       + '<option>失物招领</option>'
                       + '<option>寻物启事</option>'
                       + '</select>'
                       + '<input class="name" placeholder="物品名，如：校园卡，钥匙">'
                       + '<textarea class="detail" placeholder="物品具体描述，如钱包颜色，校园卡姓名等等"></textarea>'
                       + '<select class="campus">'
                       + '<option>紫金港校区</option>'
                       + '<option>玉泉校区</option>'
                       + '<option>西溪校区</option>'
                       + '<option>华家池校区</option>'
                       + '<option>之江校区</option>'
                       + '<option>舟山校区</option>'
                       + '</select>'
                       + '<input class="place" placeholder="详细地点">'
                       + '<input class="contact" placeholder="联系方式 / 联系地点">'
                       + '<input type="button" value="发布">'
                       + '</div>';
        $('#content').html(htmlString);
        $('input[type="button"]').click(function() {
            var obj = {};
            ['name', 'detail', 'type', 'campus', 'place', 'contact'].forEach(function(elem) {
                obj.elem = $('.upload .'+elem).val();
            });
            var success = function() {
                _this.msg('上传成功');
            };
            var fail = function() {
                _this.msg('上传失败，请检查您的网络连接');
            };
            _this.data.upload(obj, success, fail);
        });
    };

    // 失物招领
    View.prototype.found = function(page) {
        var query = {type: 'found', page: page};
        this.list(query);
    };

    // 寻物启事
    View.prototype.lost = function(page) {
        var query = {type: 'lost', page: page};
        this.list(query);
    };

    // 我关注的
    View.prototype.starred = function(page) {
        var query = {uuids: this.data.starred(), page: page};
        this.list(query);
    };

    View.prototype.index = function() {
        var htmlString = '<div class="main">'
                       + '<ul class="menu">'
                       + '<li class="upload">发布信息</li>'
                       + '<li class="search">物品搜索</li>'
                       + '<li class="found">失物招领</li>'
                       + '<li class="lost">寻物启事</li>'
                       + '<li class="starred">我发布的</li>'
                       + '</ul>'
                       + '</div>';
        $('#content').html(htmlString);
        $('li').on('click', function() {
            var view = $(this).attr('class'),
                allow = ["search", "upload", "found", "lost", "starred", "index"];
            if(allow.indexOf(view) > -1) {
                _this[view].call(_this);
            }
        });
    };

    return View;
})();
