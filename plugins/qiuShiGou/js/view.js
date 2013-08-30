var View;

View = (function() {

    var _this;

    function View(data) {
        _this = this;
        this.data = data;

        $('body').on('click', '.icon-circle-arrow-left', function() {
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
            var arr = [['物品', elem.name], ['校区', elem.campus], ['地点', elem.place], ['具体描述', elem.detail], ['联系方式', elem.contact]];
            arr = arr.map(function(elem) {
                return '<tr>'+elem.map(function(el) { return '<td>'+el+'</td>' }).join('')+'</tr>';
            });
            var html = arr.join('');
            return '<table>'+html+'</table>';
        });
        if(!prepend) prepend = '';
        htmlString = '<div class="list">'+prepend+htmlString.join('')+'<a class="prev">上一页</a><a class="next">下一页</a></div>';
        $('#content').html(htmlString);
        $('table').click(function() {
            $(this).toggleClass('clicked');
        });
        $('.prev').click(function() {
            query.page--;
            _this.list(query, prepend);
            $('html, body').animate({scrollTop: 0});
        });
        $('.next').click(function() {
            query.page++;
            _this.list(query, prepend);
            $('html, body').animate({scrollTop: 0});
        });
    };

    View.prototype.header = function(title) {
        var htmlString = '<span class="title">'+title+'</span><div class="icon"><i class="icon-circle-arrow-left"></i></div>';
        $('#header').html(htmlString);
    };

    View.prototype.msg = function(msg, title) {
        if(!title)
          title = '嘛！出错了！';
        this.header(title);
        var htmlString = '<div class="msg"><div id="logo"><image src="images/dog.png" /></div><p>' + msg + '</p></div>';
        $('#content').html(htmlString);
    };

    View.prototype.search = function(keyword, page) {
        var query = {keyword: keyword, page: page};
        var prepend = '<div id="search">'
                      + '<input type="text" id="search-input" placeholder="搜索">'
                      + '<div class="icon"><i class="icon-search"></i></div>'
                      + '</div>';
        this.list(query, prepend);
    };

    View.prototype.upload = function() {
        var htmlString = '<div id="upload">'
                       + '<div class="select type">'
                       + '<div class="option selected">失物招领</div>'
                       + '<div class="option">寻物启事</div>'
                       + '</div>'
                       + '<input class="name" placeholder="物品名，如：校园卡，钥匙">'
                       + '<div class="select campus">'
                       + '<div class="option selected">紫金港</div>'
                       + '<div class="option">玉泉</div>'
                       + '<div class="option">西溪</div>'
                       + '<div class="option">华家池</div>'
                       + '<div class="option">之江</div>'
                       + '<div class="option">舟山</div>'
                       + '</div>'
                       + '<textarea class="detail" placeholder="物品具体描述，如钱包颜色，校园卡姓名等等"></textarea>'
                       + '<input class="place" placeholder="详细地点">'
                       + '<input class="contact" placeholder="联系方式 / 联系地点">'
                       + '<div class="submit">发布</div>'
                       + '</div>';
        $('#content').html(htmlString);
        // bind for .select
        $('.select .option').click(function() {
            $(this).parent().find('.selected').removeClass('selected');
            $(this).addClass('selected');
        });
        // revert data
        if(window.fileData) {
            ['name', 'detail', 'place', 'contact'].forEach(function(elem) {
                $('#upload .'+elem).val(window.fileData[elem]);
            });
            ['type', 'campus'].forEach(function(elem) {
                $('#upload .'+elem+' .option').each(function() {
                    if($(this).text() == window.fileData[elem]) {
                        $(this).click();
                    }
                });
            });
        }
        // submit
        $('#upload .submit').click(function() {
            var obj = {};
            ['name', 'detail', 'place', 'contact'].forEach(function(elem) {
                obj[elem] = $('#upload .'+elem).val();
            });
            ['type', 'campus'].forEach(function(elem) {
                obj[elem] = $('#upload .'+elem).find('.selected').text();
            });
            window.fileData = obj;
            var success = function() {
                _this.msg('上传成功');
            };
            var fail = function() {
                _this.msg('<em>上传失败</em><br>请检查您的网络连接');
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

    View.prototype.about = function() {
        this.header('关于求失狗');
        var htmlString = '<div id="about"><p><em>竺可桢学院学生会</em><br>携<em>丹青云峰蓝田校会权服部</em>倾情奉献</p><p>'
                         + '<ul>如有遗失物品或捡到物品，请这样联系我们'
                         + '<li>人人@求失狗</li>'
                         + '<li>微信ZJU树洞君</li>'
                         + '<li>人人@各学园权服部</li>'
                         + '</ul>'
                         + '<ul>您捡到的东西可以交到'
                         + '<li>教学区东区西区指定点</li>'
                         + '<li>各个食堂门口招领处</li>'
                         + '</ul>'
                         + '<p>Designer: 林一角<br>Icons: Font-Awesome & 斯基<br>Fontend Developer: Zeno Zeng<br>Backend Developer: Delostik</p></div>';
        $('#content').html(htmlString);
    };

    View.prototype.index = function() {
        $('#header').html('');
        var htmlString = '<div id="logo"><image src="images/dog.png" /></div>'
                       + '<div class="main">'
                       + '<ul class="menu">'
                       + '<li class="upload">发布信息</li>'
                       + '<li class="search">物品搜索</li>'
                       + '<li class="found">失物招领</li>'
                       + '<li class="lost">寻物启事</li>'
                       + '</ul>'
                       + '<div id="about-icon"><i class="icon-info-sign"></i>求失狗</div>'
                       + '</div>';
        $('#content').html(htmlString);
        $('#about-icon').on('click', function() {
            _this.about();
        });
        $('li').on('click', function() {
            var view = $(this).attr('class'),
                allow = ["search", "upload", "found", "lost", "starred", "index"];
            if(allow.indexOf(view) > -1) {
                _this.header($(this).text());
                _this[view].call(_this);
            }
        });
    };

    return View;
})();
