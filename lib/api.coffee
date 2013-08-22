###
QSCMobile API
JSDOC3: http://usejsdoc.org
###

class QSCMobile

  ###
  @constructor 
  @param {Object} opts - config options
  @example Constructor
     M = new QSCMobile({debug: true})
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
  USER

  @namespace
  ###

  user:
    stuid: (success, error) -> @sendMessage {fn: 'user.stuid', success: success, error: error}
    pwd: (success, error) -> @sendMessage {fn: 'user.pwd', success: success, error: error}
    id: (success, error) -> @sendMessage {fn: 'user.id', success: success, error: error}
    name: (success, error) -> @sendMessage {fn: 'user.name', success: success, error: error}

  ###
  按照 data 绘制 card
  
  @param {String} pluginID - pluginID
  @param {String} title - card title
  @param {String} content - card content
  ###
  drawCard: (pluginID, title, content) ->
    args = {pluginID: pluginID, title: title, content: content}
    @sendMessage {fn: 'draw.card', args: args}
    

  ###
  KVDB

  @namespace
  ###

  KVDB:

    ###
    KVDB.set

    @param {String} key - key
    @param {*} value - value
    @param {Function} success - The callback that handles data when success
    @param {Function} error - The callback that handles error
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
    KVDB.get

    @param {String} key - key
    @param {Function} success - The callback that handles data when success
    @param {Function} error - The callback that handles error
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
    KVDB.remove

    @param {String} key - key
    @param {Function} success - The callback that handles data when success
    @param {Function} error - The callback that handles error
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
    KVDB.get

    @param {Function} success - The callback that handles data when success
    @param {Function} error - The callback that handles error
    ###
    clear: (success, error) ->
      msg =
        fn: 'KVDB.clear'
        success: success
        error: error
      @sendMessage msg
      
M = new QSCMobile
