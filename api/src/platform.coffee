###
Platform

@private
###
class Platform


  ###
  @param {String} pluginID pluginID
  ###
  construtor: (@pluginID) ->
    @callbacks = {}
    @requestCount = 0


  ###
  向平台发送请求
  @private
  @param {Object} request request
  @param {String} request.fn 平台应执行的函数
  @param {Object} request.args 函数参数
  @param {Function} request.success The callback that handles data when success
  @param {Function} request.error The callback that handles error
  ###
  sendRequest: (request) ->
    {fn, args, success, error} = request
    errorFn = error
    random = (Math.random()+'').replace(new RegExp('0\.', ''), '')
    callbackName = "QSCMobile#{random}_#{(new Date().getTime())}"
    callback = (data) ->
      {data, error} = data
      if error
        errorFn?(error)
      else
        success?(data)
    window[callbackName] = callback
    request =
      pluginID: @pluginID
      fn: fn
      args: args
      callback: callbackName
    request = JSON.stringify request
    prefix = 'data:text/qscmobile-msg;base64,'
    request = prefix + window.Base64.encode64(request)
    window.location.href = request
