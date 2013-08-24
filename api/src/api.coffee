###
QSCMobile API
###

class QSCMobile

  ###
  @param {Object} opts - config options
  ###
  construtor: (@opts) ->
    @callbacks = {}
    @requestCount = 0

  ###
  向平台发送请求

  @private
  @param {Object} msg - msg
  @param {String} msg.fn - 平台应执行的函数
  @param {Object} msg.args - 函数参数
  @param {Object} msg.success - The callback that handles data when success
  @param {Object} msg.error - The callback that handles error
  ###
  sendMessage: (msg) ->
    {fn, args, success, error} = msg
    @requestCount++
    id = @requestCount
    @callbacks[id] = {}
    @callbacks[id].success = success
    @callbacks[id].error = error
    msg = JSON.stringify {id: id, fn: fn, args: args}
    prefix = 'data:text/qscmobile-msg;base64,'
    msg = prefix + window.Base64.encode64(msg)
    window.location.href = msg

  ###
  平台向 Webview 返回消息时直接注入调用

  @example
    M.onMessage({id: 123, data: 'hello world'});

  @private
  @param {Object} msg - msg
  @param {Interger} msg.id - Request ID
  @param {String} msg.data - 函数返回数据
  @param {String} msg.error - 错误信息
  ###
  onMessage: (msg) ->
    {id, data, error} = msg
    if error
      @callbacks[id].error?(error)
    else
      @callbacks[id].success?(data)


  ###
  QSC Mobile View API

  @example
    M.view.card('qiuShiGou', 'title', 'Here is some contents');

  @mixin
  ###

  view:

    ###
    按照参数绘制 card
    
    @param {String} pluginID pluginID
    @param {String} title card title
    @param {String} content card content
    ###
    card: (pluginID, title, content) ->
      args = {pluginID: pluginID, title: title, content: content}
      @sendMessage {fn: 'view.card', args: args}

  ###
  QSC Mobile KVDB API

  @example
    M.kvdb.set('key', 'value', onsuccess, onerror);

  @mixin
  ###

  kvdb:

    ###
    写入记录

    @param {String} key key
    @param {String | Object} value value
    @param {Function} success The callback that handles data when success
    @param {Function} error The callback that handles error
    ###
    set: (key, value, success, error) ->
      unless typeof value is 'string'
        value = JSON.stringify value
      msg =
        fn: 'kvdb.set'
        args:
          key: key
          value: value
        success: success
        error: error
      @sendMessage msg

    ###
    取出记录

    @note 若存入是 Object 或 JSON String 则取出时自动解析为 Object

    @param {String} key key
    @param {Function} success The callback that handles data when success
    @param {Function} error The callback that handles error
    ###
    get: (key, success, error) ->
      callback = (data) ->
        try
          data = JSON.parse data
          success?(data)
        catch e
          success?(data)
      msg =
        fn: 'kvdb.get'
        args:
          key: key
        success: callback
        error: error
      @sendMessage msg
    
    ###
    删除记录

    @param {String} key - key
    @param {Function} success The callback that handles data when success
    @param {Function} error The callback that handles error
    ###
    remove: (key, success, error) ->
      msg =
        fn: 'kvdb.remove'
        args:
          key: key
        success: success
        error: error
      @sendMessage msg

    ###
    清空记录

    @param {Function} success The callback that handles data when success
    @param {Function} error The callback that handles error
    ###
    clear: (success, error) ->
      msg =
        fn: 'kvdb.clear'
        success: success
        error: error
      @sendMessage msg
  
  ###
  QSCMobile Config API

  @example
    M.config.set('key', 'value', onsuccess, onerror);

  @mixin    
  ###

  config:

    set: (key, value, success, error) ->
      key = "__config:#{key}"
      @KVDB.set key, value, success, error

    get: (key, success, error) ->
      key = "__config:#{key}"
      @KVDB.get key, success, error

    remove: (key, success, error) ->
      key = "__config:#{key}"
      @KVDB.remove key, success, error

  ###
  QSCMobile Config API

  @example
    var onsuccess = function(data) {
      console.log("Stuid is "+data);
    }
    var onerror = function(e) {
      console.log("Error: "+e);
    }
    M.user.stuid(onsuccess, onerror);

  @mixin    
  ###

  user:

    ###
    学号

    @param {Function} success The callback that handles data when success
    @param {Function} error The callback that handles error
    ###
    stuid: (success, error) -> @sendMessage {fn: 'user.stuid', success: success, error: error}

    ###
    密码

    @private
    
    @param {Function} success The callback that handles data when success
    @param {Function} error The callback that handles error
    ###
    pwd: (success, error) -> @sendMessage {fn: 'user.pwd', success: success, error: error}

M = new QSCMobile
