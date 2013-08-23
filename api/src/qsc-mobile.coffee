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
  sendRequest: (msg) ->
    {fn, args, success, error} = msg
    @requestCount++
    id = @requestCount
    @callbacks[id] = {}
    @callbacks[id].success = success
    @callbacks[id].error = error
    msg = JSON.stringify {id: id, fn: fn, args: args}
    window.location.hash = msg

  ###
  平台向 Webview 返回消息时直接注入调用

  @private
  @param {Object} msg - msg
  @param {Interger} msg.id - Request ID
  @param {String} msg.data - 函数返回数据
  @param {String} msg.error - 错误信息
  ###
  onRequest: (msg) ->
    {id, data, error} = msg
    if error
      @callbacks[id].error?(error)
    else
      @callbacks[id].success?(data)


  ###
  KVDB

  @example
    M.kvdb.set('key', 'value', onsuccess, onerror);

  @mixin
  ###

  kvdb:

    ###
    写入记录

    @param {String} key key
    @param {*} value value
    @param {Function} success The callback that handles data when success
    @param {Function} error The callback that handles error
    ###
    set: (key, value, success, error) ->
      msg =
        fn: 'KVDB.set'
        args:
          key: key
          value: value
        success: success
        error: error
      @sendMessage msg

    ###
    取出记录

    @param {String} key key
    @param {Function} success The callback that handles data when success
    @param {Function} error The callback that handles error
    ###
    get: (key, success, error) ->
      msg =
        fn: 'KVDB.get'
        args:
          key: key
        success: success
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
        fn: 'KVDB.remove'
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
        fn: 'KVDB.clear'
        success: success
        error: error
      @sendMessage msg
  
