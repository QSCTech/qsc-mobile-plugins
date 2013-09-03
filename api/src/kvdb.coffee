class KVDB extends Platform

  ###
  Constructor

  @param {String} pluginID pluginID
  ###
  constructor: (@pluginID) ->

  ###
  写入记录

  @param {String} key key
  @param {String | Object | Interger | Boolean} value value
  @param {Function} success The callback that handles data when success
  @param {Function} error The callback that handles error

  @example
    var M = new QSCMobile('qiuShiGou');
    M.kvdb.set('key', 'string');
    M.kvdb.set('key', 1);
    M.kvdb.set('key', {key: "value"});
    M.kvdb.set('key', true);

    var success = function(data) {
      console.log(data);
    };
    var error = function(e) {
      console.log(e);
    };
    M.kvdb.set('key', 'string', success, error);

  ###
  set: (key, value, success, error) =>
    type = typeof value
    unless type is "object" or type is "boolean" or type is "number"
      throw "KVDB.set: Invalid value type"
    if type is "object"
      value = JSON.stringify value
    else
      value = ""+value
    val = {type: type, value: value}
    # 转成安全的base64，避免整个JSON Request被解析时子对象被解析
    val = window.Base64.encode64(val)
    msg =
      fn: 'kvdb.set'
      args:
        key: ""+key # key 必须是字符串
        value: val
      success: success
      error: error
    @sendRequest msg

  ###
  取出记录

  @note 若存入是 Object | String | Interger | Boolean 则取出时还是存入时的类型，其他类型会抛出异常

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

  ###
  get: (key, success, error) =>
    callback = (data) ->
      data = window.Base64.decode64 data
      {type, value} = JSON.parse data
      if type is "number"
        if value.indexOf(".") > -1
          value = parseFloat value
        else
          value = parseInt value
      else if type is "boolean"
        value = value is "true"
      else if type is "object"
        value = JSON.parse type
      else
        throw "KVDB.get: Invalid value type"
      success?(value)
    msg =
      fn: 'kvdb.get'
      args:
        key: ""+key
      success: callback
      error: error
    @sendRequest msg
  
  ###
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

  ###
  remove: (key, success, error) =>
    msg =
      fn: 'kvdb.remove'
      args:
        key: key
      success: success
      error: error
    @sendRequest msg

  ###
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

  ###
  clear: (success, error) =>
    msg =
      fn: 'kvdb.clear'
      success: success
      error: error
    @sendRequest msg

