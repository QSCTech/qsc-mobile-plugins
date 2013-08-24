// Generated by CoffeeScript 1.6.1
var SDK;

SDK = (function() {

  function SDK() {
    var id;
    $(window).on('hashchange', function() {
      return window.location.reload();
    });
    id = window.location.hash.replace(new RegExp('#', 'g'), '');
    if (id.length < 1) {
      window.location.hash = 'qiuShiGou';
    } else {
      this.loadPlugin(id);
    }
  }

  SDK.prototype.loadPlugin = function(pluginID) {
    var object, src,
      _this = this;
    src = "../plugins/" + pluginID + "/index.html";
    object = $('<iframe id="plugin-section"></iframe>')[0].cloneNode(true);
    object.height = 450;
    object.width = 300;
    object.src = src;
    object.onload = function() {
      var style;
      _this.pluginWindow = document.getElementById('plugin-section').contentWindow;
      _this.pluginWindow.Platform.prototype.sendRequest = function(request) {
        var args, callback, callbackName, error, errorFn, fn, random, success;
        fn = request.fn, args = request.args, success = request.success, error = request.error;
        errorFn = error;
        random = (Math.random() + '').replace(new RegExp('0\.', ''), '');
        callbackName = "QSCMobile" + random + "_" + (new Date().getTime());
        callback = function(data) {
          var _ref;
          _ref = data, data = _ref.data, error = _ref.error;
          if (error) {
            return typeof errorFn === "function" ? errorFn(error) : void 0;
          } else {
            return typeof success === "function" ? success(data) : void 0;
          }
        };
        window[callbackName] = callback;
        return window.parent.sdk.onRequest({
          fn: fn,
          args: args,
          callback: callbackName
        });
      };
      style = $('<link>')[0].cloneNode(true);
      style.href = "../../sdk/css/scrollbar.css";
      style.rel = 'stylesheet';
      style.type = 'text/css';
      style.onload = function() {
        var widthWithoutScrollbar;
        widthWithoutScrollbar = $('iframe').contents().find('html').width();
        $('#wrap').css({
          width: widthWithoutScrollbar + 'px',
          'padding-left': 300 - widthWithoutScrollbar + 'px'
        });
        return $('#wrap').animate({
          opacity: 1
        });
      };
      return $('iframe').contents().find('head').append(style);
    };
    return $('#wrap').html(object);
  };

  SDK.prototype.onRequest = function(request) {
    var args, callback, data, fn, part1, part2, _base, _ref;
    fn = request.fn, args = request.args, callback = request.callback;
    console.log(["QSCMobile-Plugins-API-Request", fn, args]);
    _ref = fn.split('.'), part1 = _ref[0], part2 = _ref[1];
    fn = this[part1][part2];
    data = fn.call(this, args);
    console.log(["QSCMobile-Plugins-API-Request-Callback-Data", data.data, data.error]);
    return typeof (_base = this.pluginWindow)[callback] === "function" ? _base[callback](data) : void 0;
  };

  SDK.prototype.user = {
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

  SDK.prototype.kvdb = {
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

  return SDK;

})();

$(function() {
  return $(document).ready(function() {
    return window.sdk = new SDK;
  });
});
