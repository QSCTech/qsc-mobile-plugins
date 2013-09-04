var View;

View = (function() {

    var _this;

    View.prototype.listHTML = function(items) {
        var html;
        // 过滤无效项目
        items = items.filter(function(elem) {
            return elem ? true : false;
        });
        html = items.map(function(elem) {
            var arr = [['物品', elem.name], ['校区', elem.campus], ['地点', elem.place], ['具体描述', elem.detail], ['联系方式', elem.contact]];
            arr = arr.map(function(elem) {
                return '<tr>'+elem.map(function(el) { return '<td>'+el+'</td>' }).join('')+'</tr>';
            });
            return '<table>'+ arr.join('') +'</table>';
        });
        return html;
    };

    View.prototype.list = function(query, header, prepend) {
        var success = function(data) {
            _this.header(header);
            var currentPage = query.page ? query.page : 1;
            var htmlString = data.map(function(elem) {
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
    };

    View.prototype.search = function(keyword, page) {
        if(!keyword) {
            keyword = '';
        }
        if(!page) {
            page = 1;
        }
        var query = {keyword: keyword, page: page};
        var prepend =
        var _this = this;
        $('body').on('click', '.icon.search', function() {
            var keyword = $('#search-input').val();
            var query = {keyword: keyword, page: page};
            _this.list(query, '搜索', prepend);
        });
        this.list(query, '搜索', prepend);
    };

    View.prototype.upload = function() {
        // submit
    };

    // 失物招领
    View.prototype.found = function(page) {
        var query = {type: 'found', page: page};
        this.list(query, '失物招领');
    };

    // 寻物启事
    View.prototype.lost = function(page) {
        var query = {type: 'lost', page: page};
        this.list(query, '寻物启事');
    };

    return View;
})();
