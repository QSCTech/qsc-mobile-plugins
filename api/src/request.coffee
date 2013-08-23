###
@mixin
###

window.request =

  callbacks: {}

  count: 0

  ###
  M.sendRequest
  向平台发送请求

  @private
  @param {Object} msg - msg
  @param {String} msg.fn - 平台应执行的函数
  @param {Object} msg.args - 函数参数
  @param {Object} msg.success - The callback that handles data when success
  @param {Object} msg.error - The callback that handles error
  ###
  send: (msg) ->
    {fn, args, success, error} = msg
    window.count++
    id = window.request.count
    window.request.callbacks[id] = {}
    window.request.callbacks[id].success = success
    window.request.callbacks[id].error = error
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
  on: (msg) ->
    {id, data, error} = msg
    if error
      window.request.callbacks[id].error?(error)
    else
      window.request.callbacks[id].success?(data)
