(function() {
  var View;

  View = (function() {
    var test;

    test = function() {
      return view.msg('test');
    };

    function View(data) {
      this.data = data;
      this.query = {};
    }

    /*
    返回 header 的 HTML
    */


    View.prototype.headerHTML = function(title) {
      return '<span class="title">' + title + '</span><div class="icon"><i class="icon-circle-arrow-left"></i></div>';
    };

    View.prototype.list = function(query) {
      var error, success,
        _this = this;
      this.query = query;
      success = function(items) {
        var html;
        items = items.filter(function(item) {
          return item != null;
        });
        html = items.map(function(item) {
          var arr;
          arr = [['物品', item.name], ['校区', item.campus], ['地点', item.place], ['具体描述', item.detail], ['联系方式', item.contact], ['发布时间', (new Date(item.announcedate * 1000)).toLocaleDateString()], ['当前状态', ''], ['     ', '<a onclick=test()>我已找到</a> ']];
          arr = arr.map(function(elem) {
            elem = elem.map(function(el) {
              return '<td>' + el + '</td>';
            });
            return "<tr>" + (elem.join('')) + "</tr>";
          });
          return "<table>" + (arr.join('')) + "</table>";
        });
        $('#items').html(html.join(''));
        $('.prev').toggleClass('disabled', query.page === 1);
        return $('.next').toggleClass('disabled', items.length !== 10);
      };
      error = function() {
        return _this.msg('获取数据失败，请检查网络连接');
      };
      return this.data.get(query, success, error);
    };

    View.prototype.nextPage = function() {
      $('html, body').scrollTop(0);
      this.query.page++;
      return this.list(this.query);
    };

    View.prototype.prevPage = function() {
      $('html, body').scrollTop(0);
      this.query.page--;
      return this.list(this.query);
    };

    View.prototype.section = function(section) {
      $('.section').hide();
      return $('#' + section).show();
    };

    View.prototype.about = function() {
      return this.section('about');
    };

    View.prototype.lost = function() {
      $('#list .header .title').html('寻物启事');
      this.list({
        type: 'lost',
        page: 1
      });
      $('#search').hide();
      return this.section('list');
    };

    View.prototype.found = function() {
      $('#list .header .title').html('失物招领');
      this.list({
        type: 'found',
        page: 1
      });
      $('#search').hide();
      return this.section('list');
    };

    View.prototype.upload = function() {
      return this.section('upload');
    };

    View.prototype.starred = function() {
      var M, Stuid, error, success;
      M = new QSCMobile('qiuShiGou');
      Stuid = 0;
      success = function(stuid) {
        return Stuid = stuid;
      };
      error = function(e) {
        return console.log(e);
      };
      M.user.stuid(success, error);
      $('#list .header .title').html('我发布的');
      this.list({
        stuid: Stuid,
        page: 1
      });
      $('#search').hide();
      return this.section('list');
    };

    View.prototype.index = function() {
      return this.section('index');
    };

    View.prototype.search = function() {
      $('#list .header .title').html('物品搜索');
      $('#search').show();
      this.list({
        keyword: '',
        page: 1
      });
      return this.section('list');
    };

    View.prototype.msg = function(msg) {
      return alert(msg);
    };

    return View;

  })();

}).call(this);
