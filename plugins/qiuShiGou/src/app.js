(function() {
  var data, view;

  data = new Data;

  view = new View(data);

  $(function() {
    $('#about-icon').on('click', function() {
      return view.about();
    });
    $('body').on('click', '.icon-circle-arrow-left', function() {
      return view.index();
    });
    $('body').on('click', 'table', function() {
      return $(this).toggleClass('clicked');
    });
    $('body').on('click', '.prev', function() {
      if (!$(this).hasClass('disabled')) {
        return view.prevPage();
      }
    });
    $('body').on('click', '.next', function() {
      if (!$(this).hasClass('disabled')) {
        return view.nextPage();
      }
    });
    $('.icon.search').on('click', function() {
      var query;
      query = {
        keyword: $('#search-input').val(),
        page: 1
      };
      return view.list(query);
    });
    $('#index').on('click', '.menu li', function() {
      var section;
      section = $(this).attr('class');
      return typeof view[section] === "function" ? view[section]() : void 0;
    });
    $('.select .option').click(function() {
      $(this).parent().find('.selected').removeClass('selected');
      return $(this).addClass('selected');
    });
    $('#upload .submit').click(function() {
      var elem, fail, obj, success, _i, _j, _len, _len1, _ref, _ref1;
      obj = {};
      _ref = ['name', 'detail', 'place', 'contact'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        elem = _ref[_i];
        obj[elem] = $('#upload .' + elem).val();
      }
      _ref1 = ['type', 'campus'];
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        elem = _ref1[_j];
        obj[elem] = $('#upload .' + elem).find('.selected').text();
      }
      obj['type'] = obj['type'] === '失物招领' ? 'found' : 'lost';
      success = function() {
        return view.msg('上传成功');
      };
      fail = function() {
        return view.msg('上传失败，请检查您的网络连接');
      };
      return data.upload(obj, success, fail);
    });
    return view.index();
  });

}).call(this);
