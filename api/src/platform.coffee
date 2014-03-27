###
Platform

@private
###
class Platform


  ###
  @param {String} pluginID pluginID
  ###
  construtor: (@pluginID) ->

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
    unless window.parent.sdk? or window.QSCAndroid?
      # iOS要强制请求队列延时保证url跳转被截获
      if (new Date().getTime()) - @lastRequest < 20
        fn = => @sendRequest request
        return setTimeout fn, 1
    @lastRequest = (new Date().getTime())
    {fn, args, success, error} = request
    errorFn = error
    random = (Math.random()+'').replace(new RegExp('0\.', ''), '')
    callbackName = "QSCMobile#{random}_#{(new Date().getTime())}"
    callback = (data) ->
      isObject = (a) -> (!!a) && (a.constructor is Object)
      if isObject data
        {error} = data
        if error
          errorFn?(error)
        else
          success?(data)
      else
        success?(data)
    window[callbackName] = callback
    request =
      pluginID: @pluginID
      fn: fn
      args: args
      callback: callbackName
    sdk = window.parent.sdk
    if sdk? # Web SDK
      sdk.onRequest window, request
    else
      request = JSON.stringify request
      prefix = 'data:text/qscmobile-msg;base64,'
      request = prefix + window.Base64.encode64(request)
      window.location.href = request
