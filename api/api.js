// Generated by CoffeeScript 1.6.1
/*
 * base64.coffee, v1.0
 * https://github.com/rwz/base64.coffee
 *
 * Copyright 2012 Pavel Pravosud
 * Licensed under the MIT license.
 * http://opensource.org/licenses/mit-license
 *
 * References: http://en.wikipedia.org/wiki/Base64
 *
 * Date: Sat Jan 7 17:30:44 ICT 2012
*/

var CHARACTERS, CHARMAP, Config, INVALID_CHARACTERS, InvalidSequenceError, KVDB, Platform, QSCMobile, User, View, char, decode, encode, fromCharCode, i, pack, unpack, _i, _len, _ref, _ref1, _ref2,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  _this = this;

fromCharCode = String.fromCharCode;

CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

INVALID_CHARACTERS = /[^a-z\d\+\=\/]/ig;

CHARMAP = {};

_ref = CHARACTERS.split('');
for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
  char = _ref[i];
  CHARMAP[char] = i;
}

InvalidSequenceError = (function(_super) {

  __extends(InvalidSequenceError, _super);

  InvalidSequenceError.prototype.name = 'InvalidSequence';

  function InvalidSequenceError(char) {
    if (char) {
      this.message = "\"" + char + "\" is an invalid Base64 character";
    } else {
      this.message = 'Invalid bytes sequence';
    }
  }

  return InvalidSequenceError;

})(Error);

encode = (_ref1 = this.btoa) != null ? _ref1 : this.btoa = function(input) {
  var chr1, chr2, chr3, enc1, enc2, enc3, enc4, invalidChar, output, _j, _len1, _ref2;
  output = '';
  i = 0;
  while (i < input.length) {
    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);
    if (invalidChar = Math.max(chr1, chr2, chr3) > 0xFF) {
      throw new InvalidSequenceError(invalidChar);
    }
    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;
    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }
    _ref2 = [enc1, enc2, enc3, enc4];
    for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
      char = _ref2[_j];
      output += CHARACTERS.charAt(char);
    }
  }
  return output;
};

decode = (_ref2 = this.atob) != null ? _ref2 : this.atob = function(input) {
  var chr1, chr2, chr3, enc1, enc2, enc3, enc4, length, output;
  output = '';
  i = 0;
  length = input.length;
  if (length % 4) {
    throw new InvalidSequenceError;
  }
  while (i < length) {
    enc1 = CHARMAP[input.charAt(i++)];
    enc2 = CHARMAP[input.charAt(i++)];
    enc3 = CHARMAP[input.charAt(i++)];
    enc4 = CHARMAP[input.charAt(i++)];
    chr1 = (enc1 << 2) | (enc2 >> 4);
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    chr3 = ((enc3 & 3) << 6) | enc4;
    output += fromCharCode(chr1);
    if (enc3 !== 64) {
      output += fromCharCode(chr2);
    }
    if (enc4 !== 64) {
      output += fromCharCode(chr3);
    }
  }
  return output;
};

unpack = function(utfstring) {
  var c, string, _j, _ref3;
  utfstring = utfstring.replace(/\r\n/g, '\n');
  string = '';
  for (i = _j = 0, _ref3 = utfstring.length - 1; 0 <= _ref3 ? _j <= _ref3 : _j >= _ref3; i = 0 <= _ref3 ? ++_j : --_j) {
    c = utfstring.charCodeAt(i);
    if (c < 128) {
      string += fromCharCode(c);
    } else if (c > 127 && c < 2048) {
      string += fromCharCode((c >> 6) | 192);
      string += fromCharCode((c & 63) | 128);
    } else {
      string += fromCharCode((c >> 12) | 224);
      string += fromCharCode(((c >> 6) & 63) | 128);
      string += fromCharCode((c & 63) | 128);
    }
  }
  return string;
};

pack = function(string) {
  var c, c1, c2, c3, utfstring;
  utfstring = '';
  i = c = c1 = c2 = 0;
  while (i < string.length) {
    c = string.charCodeAt(i);
    if (c < 128) {
      utfstring += fromCharCode(c);
      i++;
    } else if ((c > 191) && (c < 224)) {
      c2 = string.charCodeAt(i + 1);
      utfstring += fromCharCode(((c & 31) << 6) | (c2 & 63));
      i += 2;
    } else {
      c2 = string.charCodeAt(i + 1);
      c3 = string.charCodeAt(i + 2);
      utfstring += fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
      i += 3;
    }
  }
  return utfstring;
};

this.Base64 = {
  encode64: function(str) {
    return encode(unpack(str));
  },
  decode64: function(str) {
    return pack(decode(str.replace(INVALID_CHARACTERS, '')));
  }
};

/*
Platform

@private
*/


Platform = (function() {

  function Platform() {}

  /*
  @param {String} pluginID pluginID
  */


  Platform.prototype.construtor = function(pluginID) {
    this.pluginID = pluginID;
  };

  /*
  向平台发送请求
  @private
  @param {Object} request request
  @param {String} request.fn 平台应执行的函数
  @param {Object} request.args 函数参数
  @param {Function} request.success The callback that handles data when success
  @param {Function} request.error The callback that handles error
  */


  Platform.prototype.sendRequest = function(request) {
    var args, callback, callbackName, error, errorFn, fn, prefix, random, sdk, success,
      _this = this;
    if ((new Date().getTime()) - this.lastRequest < 20) {
      fn = function() {
        return _this.sendRequest(request);
      };
      return setTimeout(fn, 1);
    }
    this.lastRequest = new Date().getTime();
    fn = request.fn, args = request.args, success = request.success, error = request.error;
    errorFn = error;
    random = (Math.random() + '').replace(new RegExp('0\.', ''), '');
    callbackName = "QSCMobile" + random + "_" + (new Date().getTime());
    callback = function(data) {
      var _ref3;
      _ref3 = data, data = _ref3.data, error = _ref3.error;
      if (error) {
        return typeof errorFn === "function" ? errorFn(error) : void 0;
      } else {
        return typeof success === "function" ? success(data) : void 0;
      }
    };
    window[callbackName] = callback;
    request = {
      pluginID: this.pluginID,
      fn: fn,
      args: args,
      callback: callbackName
    };
    sdk = window.parent.sdk;
    if (sdk != null) {
      return sdk.onRequest(window, request);
    } else {
      request = JSON.stringify(request);
      prefix = 'data:text/qscmobile-msg;base64,';
      request = prefix + window.Base64.encode64(request);
      return window.location.href = request;
    }
  };

  return Platform;

})();

KVDB = (function(_super) {

  __extends(KVDB, _super);

  /*
  Constructor
  
  @param {String} pluginID pluginID
  */


  function KVDB(pluginID) {
    var _this = this;
    this.pluginID = pluginID;
    this.clear = function(success, error) {
      return KVDB.prototype.clear.apply(_this, arguments);
    };
    this.remove = function(key, success, error) {
      return KVDB.prototype.remove.apply(_this, arguments);
    };
    this.get = function(key, success, error) {
      return KVDB.prototype.get.apply(_this, arguments);
    };
    this.set = function(key, value, success, error) {
      return KVDB.prototype.set.apply(_this, arguments);
    };
  }

  /*
  写入记录
  
  @param {String} key key
  @param {String | Object} value value
  @param {Function} success The callback that handles data when success
  @param {Function} error The callback that handles error
  
  @example
    var M = new QSCMobile('qiuShiGou');
    M.kvdb.set('key', 'string');
    M.kvdb.set('key', {hello: world});
  
    var success = function(data) {
      console.log(data);
    };
    var error = function(e) {
      console.log(e);
    };
    M.kvdb.set('key', 'string', success, error);
  */


  KVDB.prototype.set = function(key, value, success, error) {
    var msg;
    if (typeof value !== 'string') {
      value = JSON.stringify(value);
    }
    msg = {
      fn: 'kvdb.set',
      args: {
        key: key,
        value: value
      },
      success: success,
      error: error
    };
    return this.sendRequest(msg);
  };

  /*
  取出记录
  
  @note 若存入是 Object 或 JSON String 则取出时自动解析为 Object
  
  @param {String} key key
  @param {Function} success The callback that handles data when success
  @param {Function} error The callback that handles error
  
  @example
    var M = new QSCMobile('qiuShiGou');
    var success = function(data) {
      console.log(data);
    };
    var error = function(e) {
      console.log(e);
    };
    M.kvdb.get('key', success, error);
  */


  KVDB.prototype.get = function(key, success, error) {
    var callback, msg;
    callback = function(data) {
      try {
        data = JSON.parse(data);
        return typeof success === "function" ? success(data) : void 0;
      } catch (e) {
        return typeof success === "function" ? success(data) : void 0;
      }
    };
    msg = {
      fn: 'kvdb.get',
      args: {
        key: key
      },
      success: callback,
      error: error
    };
    return this.sendRequest(msg);
  };

  /*
  删除记录
  
  @param {String} key key
  @param {Function} success The callback that handles data when success
  @param {Function} error The callback that handles error
  
  @example
    var M = new QSCMobile('qiuShiGou');
    var success = function() {
      console.log('success');
    };
    var error = function(e) {
      console.log(e);
    };
    M.kvdb.remove('key', success, error);
  */


  KVDB.prototype.remove = function(key, success, error) {
    var msg;
    msg = {
      fn: 'kvdb.remove',
      args: {
        key: key
      },
      success: success,
      error: error
    };
    return this.sendRequest(msg);
  };

  /*
  清空记录
  
  @param {Function} success The callback that handles data when success
  @param {Function} error The callback that handles error
  
  @example
    var M = new QSCMobile('qiuShiGou');
    var success = function() {
      console.log('success');
    };
    var error = function(e) {
      console.log(e);
    };
    M.kvdb.clear(success, error);
  */


  KVDB.prototype.clear = function(success, error) {
    var msg;
    msg = {
      fn: 'kvdb.clear',
      success: success,
      error: error
    };
    return this.sendRequest(msg);
  };

  return KVDB;

})(Platform);

/*
QSCMobile Config API
*/


Config = (function(_super) {

  __extends(Config, _super);

  /*
  Constructor
  
  @param {String} pluginID pluginID
  */


  function Config(pluginID) {
    var _this = this;
    this.pluginID = pluginID;
    this.remove = function(key, success, error) {
      return Config.prototype.remove.apply(_this, arguments);
    };
    this.get = function(key, success, error) {
      return Config.prototype.get.apply(_this, arguments);
    };
    this.set = function(key, value, success, error) {
      return Config.prototype.set.apply(_this, arguments);
    };
  }

  /*
  写入设置
  
  @example
    var M = new QSCMobile('qiuShiGou');
    M.config.set('key', 'string');
    M.config.set('key', {hello: world});
  
    var success = function(data) {
      console.log(data);
    };
    var error = function(e) {
      console.log(e);
    };
    M.config.set('key', 'string', success, error);
  
  @param {String} key key
  @param {String | Object} value value
  @param {Function} success The callback that handles data when success
  @param {Function} error The callback that handles error
  */


  Config.prototype.set = function(key, value, success, error) {
    key = "__config:" + key;
    return this.__super__.set(key, value, success, error);
  };

  /*
  取出设置
  
  @example
    var M = new QSCMobile('qiuShiGou');
    var success = function(data) {
      console.log(data);
    };
    var error = function(e) {
      console.log(e);
    };
    M.config.get('key', success, error);
  
  @param {String} key key
  @param {Function} success The callback that handles data when success
  @param {Function} error The callback that handles error
  
  @note 若存入是 Object 或 JSON String 则取出时自动解析为 Object
  */


  Config.prototype.get = function(key, success, error) {
    key = "__config:" + key;
    return this.__super__.get(key, success, error);
  };

  /*
  删除设置
  
  @example
    var M = new QSCMobile('qiuShiGou');
    var success = function() {
      console.log('success');
    };
    var error = function(e) {
      console.log(e);
    };
    M.config.remove('key', success, error);
  
  @param {String} key - key
  @param {Function} success The callback that handles data when success
  @param {Function} error The callback that handles error
  */


  Config.prototype.remove = function(key, success, error) {
    key = "__config:" + key;
    return this.__super__.remove(key, success, error);
  };

  return Config;

})(KVDB);

User = (function(_super) {

  __extends(User, _super);

  /*
  Constructor
  
  @param {String} pluginID pluginID
  */


  function User(pluginID) {
    this.pluginID = pluginID;
  }

  /*
  学号
  
  @param {Function} success The callback that handles data when success
  @param {Function} error The callback that handles error
  
  @example
    var M = new QSCMobile('qiuShiGou');
    var success = function(stuid) {
      console.log(stuid);
    };
    var error = function(e) {
      console.log(e);
    };
    M.user.stuid(success, error);
  */


  User.prototype.stuid = function(success, error) {
    return this.sendRequest({
      fn: 'user.stuid',
      success: success,
      error: error
    });
  };

  /*
  密码
  
  @private
  
  @param {Function} success The callback that handles data when success
  @param {Function} error The callback that handles error
  
  @example
    var M = new QSCMobile('qiuShiGou');
    var success = function(pwd) {
      console.log(pwd);
    };
    var error = function(e) {
      console.log(e);
    };
    M.user.pwd(success, error);
  */


  User.prototype.pwd = function(success, error) {
    return this.sendRequest({
      fn: 'user.pwd',
      success: success,
      error: error
    });
  };

  return User;

})(Platform);

/*
QSC Mobile View API
*/


View = (function(_super) {

  __extends(View, _super);

  /*
  Constructor
  
  @param {String} pluginID pluginID
  */


  function View(pluginID) {
    var _this = this;
    this.pluginID = pluginID;
    this.card = function(data) {
      return View.prototype.card.apply(_this, arguments);
    };
  }

  /*
  按照参数绘制 card
  
  @example
    M = new QSCMobile('qiuShiGou');
    M.view.card({title: '求失狗', content: '求失狗卡片正文内容\n这是内容第二行'});
  
  @param {Object} data
  @param {String} data.title card title
  @param {String} data.content card content
  */


  View.prototype.card = function(data) {
    return this.sendRequest({
      fn: 'view.card',
      args: data
    });
  };

  return View;

})(Platform);

QSCMobile = (function() {
  /*
  @param {String} pluginID pluginID
  
  @example
    var M = new QSCMobile('qiuShiGou');
  */

  function QSCMobile(pluginID) {
    var api, _j, _len1, _ref3;
    this.pluginID = pluginID;
    _ref3 = ['KVDB', 'Config', 'View', 'User'];
    for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
      api = _ref3[_j];
      this[api.toLowerCase()] = new window[api](this.pluginID);
    }
  }

  return QSCMobile;

})();
