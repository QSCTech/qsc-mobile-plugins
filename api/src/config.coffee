###
QSCMobile Config API
###

class Config extends KVDB

  ###
  Constructor

  @param {String} pluginID pluginID
  ###
  constructor: (@pluginID) ->

  ###
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
  @param {String | Object | Interger | Boolean} value value
  @param {Function} success The callback that handles data when success
  @param {Function} error The callback that handles error

  ###
  set: (key, value, success, error) =>
    key = "__config:#{key}"
    this.__super__.set key, value, success, error

  ###
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

  ###
  get: (key, success, error) =>
    key = "__config:#{key}"
    this.__super__.get key, success, error

  ###
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

  ###
  remove: (key, success, error) =>
    key = "__config:#{key}"
    this.__super__.remove key, success, error


