// Generated by CoffeeScript 1.6.1
var API, SDK,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

API = (function() {

  function API() {}

  /*
  View 函数具体实现
  */


  API.prototype.view = {
    card: function(args) {
      var content, pluginID, title;
      pluginID = args.pluginID, title = args.title, content = args.content;
      $("#card .title").html(title);
      return $("#card .content").html(content);
    }
  };

  /*
  User 函数具体实现
  */


  API.prototype.user = {
    stuid: function() {
      return {
        data: "3000000000"
      };
    },
    pwd: function() {
      return {
        data: "123456"
      };
    }
  };

  /*
  KVDB 函数具体实现
  */


  API.prototype.kvdb = {
    get: function(args) {
      var key, msg;
      key = args.key;
      msg = {};
      try {
        msg.data = localStorage.getItem(key);
      } catch (e) {
        msg.error = e;
      }
      return msg;
    },
    set: function(args) {
      var key, msg, value;
      key = args.key, value = args.value;
      msg = {};
      try {
        msg.data = localStorage.setItem(key, value);
      } catch (e) {
        msg.error = e;
      }
      return msg;
    },
    remove: function(args) {
      var key, msg;
      key = args.key;
      msg = {};
      try {
        msg.data = localStorage.removeItem(key);
      } catch (e) {
        msg.error = e;
      }
      return msg;
    },
    clear: function(args) {
      var msg;
      msg = {};
      try {
        msg.data = localStorage.clear();
      } catch (e) {
        msg.error = e;
      }
      return msg;
    }
  };

  return API;

})();

SDK = (function(_super) {

  __extends(SDK, _super);

  /*
  @param {String} pluginID pluginID
  @param {Boolean} debug debug
  */


  function SDK(pluginID, debug) {
    this.pluginID = pluginID;
    this.debug = debug != null ? debug : true;
    if (this.debug) {
      console.log("Starting QSC Mobile Plugin SDK");
    }
    this.show();
    this.background();
  }

  /*
  在 iframe 沙盒 #background 中执行插件的 Background.js
  */


  SDK.prototype.background = function() {
    var iframe, src;
    src = "background.html#" + this.pluginID;
    iframe = $('<iframe id="background" height="450" width="300" src="' + src + '"></iframe>')[0];
    return $('body').append(iframe);
  };

  /*
  显示 Card，并在 iframe 沙盒 #section 中运行插件的Section视图
  */


  SDK.prototype.show = function() {
    var html, iframe, src,
      _this = this;
    html = "<div class=\"card " + this.pluginID + "\">    </div>";
    $('#cards').append(html);
    src = "../plugins/" + this.pluginID + "/index.html";
    iframe = $('<iframe id="section" height="450" width="300" src="' + src + '"></iframe>')[0];
    iframe.onload = function() {
      var href, style;
      href = document.getElementById('section').contentWindow.location.href;
      if (_this.debug) {
        console.log("Loaded: " + href);
      }
      style = $('<link href="../../sdk/css/scrollbar.css" rel="stylesheet" type="text/css">')[0];
      style.onload = function() {
        return $('#wrap').animate({
          opacity: 1
        });
      };
      return $('#section').contents().find('head').append(style);
    };
    return $('#section-wrap').html(iframe);
  };

  /*
  Request 处理
  
  @param {Object} request 请求
  */


  SDK.prototype.onRequest = function(win, request) {
    var args, callback, data, fn, json, part1, part2, _ref;
    fn = request.fn, args = request.args, callback = request.callback;
    if (this.debug) {
      console.log("\n\nQSCMobile-Plugins-API-Request-ID: " + callback);
    }
    json = JSON.stringify({
      fn: fn,
      args: args
    }, null, 4);
    if (this.debug) {
      console.log("\nRequest: " + json);
    }
    _ref = fn.split('.'), part1 = _ref[0], part2 = _ref[1];
    fn = this[part1][part2];
    data = fn.call(this, args);
    json = JSON.stringify({
      data: data.data,
      error: data.error
    }, null, 4);
    if (this.debug) {
      console.log("\nResults: " + json);
    }
    return typeof win[callback] === "function" ? win[callback](data.data) : void 0;
  };

  return SDK;

})(API);

$(function() {
  var debug, nil, pluginID, _ref;
  $(window).on('hashchange', function() {
    return window.location.reload();
  });
  _ref = window.location.hash.split('#'), nil = _ref[0], pluginID = _ref[1], debug = _ref[2];
  if ((pluginID == null) || pluginID.length < 1) {
    return window.location.hash = 'qiuShiGou';
  } else {
    debug = debug === 'debug';
    return window.sdk = new SDK(pluginID, debug);
  }
});
