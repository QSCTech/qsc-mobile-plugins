class SDK

  constructor: ->
    # bind events
    $(window).on 'hashchange', ->
      window.location.reload()
    id = window.location.hash.replace(new RegExp('#', 'g'), '')
    if id.length < 1
      window.location.hash = 'qiuShiGou'
    else
      @loadPlugin(id)
  
  loadPlugin: (pluginID) ->
    src = "../plugins/#{pluginID}/index.html"
    object = $('<iframe id="plugin-section"></iframe>')[0].cloneNode(true);
    object.height = 450
    object.width = 300
    object.src = src
    object.onload = =>
      
      # 重载插件内部的 sendRequest
      @pluginWindow = document.getElementById('plugin-section').contentWindow
      @pluginWindow.Platform.prototype.sendRequest = (request) ->
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
        window.parent.sdk.onRequest({fn: fn, args: args, callback: callbackName})
        

      # hide scrollbar
      style = $('<link>')[0].cloneNode(true)
      style.href = "../../sdk/css/scrollbar.css"
      style.rel = 'stylesheet'
      style.type = 'text/css'
      style.onload = ->
        widthWithoutScrollbar = $('iframe').contents().find('html').width()
        $('#wrap').css({width: widthWithoutScrollbar+'px', 'padding-left': 300 - widthWithoutScrollbar + 'px'})
        $('#wrap').animate({opacity: 1})
      $('iframe').contents().find('head').append(style)
    $('#wrap').html object

  onRequest: (request) ->
    {fn, args, callback} = request
    console.log ["QSCMobile-Plugins-API-Request", fn, args]
    [part1, part2] = fn.split('.')
    fn = this[part1][part2]
    data = fn.call this, args
    console.log ["QSCMobile-Plugins-API-Request-Callback-Data", data.data, data.error]
    @pluginWindow[callback]?(data)

  #######################
  #
  # 函数具体实现
  # 
  #######################

  user:

    stuid: -> {data: "3000000000"}

    pwd: -> {data: "123456"}

  kvdb:

    get: (args) ->
      {key} = args
      msg = {}
      try
        msg.data = localStorage.getItem key
      catch e
        msg.error = e
      msg

    set: (args) ->
      {key, value} = args
      msg = {}
      try
        msg.data = localStorage.setItem key, value
      catch e
        msg.error = e
      msg

    remove: (args) ->
      {key} = args
      msg = {}
      try
        msg.data = localStorage.removeItem key
      catch e
        msg.error = e
      msg

    clear: (args) ->
      msg = {}
      try
        msg.data = localStorage.clear()
      catch e
        msg.error = e
      msg

$ ->
  $(document).ready ->
    window.sdk = new SDK
