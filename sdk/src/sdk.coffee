class SDK

  constructor: ->

    @debug = on

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
    iframe = $('<iframe id="plugin-section" height="450" width="300" src="'+src+'"></iframe>')[0]
    iframe.onload = =>
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
    $('#wrap').html iframe

    ################################
    # 
    # 重载插件内部API的 sendRequest
    #
    ################################

    @window = document.getElementById('plugin-section').contentWindow

    # Add Watch Api (based on Eli Grey's object.watch polyfill)

    obj = @window.Object
    unless obj.prototype.watch
      prop =
        enumerable: false
        configurable: true
        writable: false
        value: (prop, handle) ->
          oldval = @prop
          newval = oldval
          getter = -> newval
          setter = (val) ->
            oldval = newval
            newval = handle.call(this, prop, oldval, val)
          obj.defineProperty this, prop, {get: getter, set: setter, enumerable: true, configurable: true}
      obj.defineProperty obj.prototype, "watch", prop
    
    @window.watch 'Platform', (prop, oldval, val) =>
      val.prototype.sendRequest = (request) =>
        {fn, args, success, error} = request
        errorFn = error
        random = (Math.random()+'').replace(new RegExp('0\.', ''), '')
        callbackName = "QSCMobile#{random}_#{(new Date().getTime())}"
        @window[callbackName] = (data) ->
          {data, error} = data
          if error
            errorFn?(error)
          else
            success?(data)
        @onRequest {fn: fn, args: args, callback: callbackName}
      return val

  ################################
  # 
  # Request 处理
  #
  ################################


  onRequest: (request) ->
    {fn, args, callback} = request
    console.log "QSCMobile-Plugins-API-Request               ->   #{JSON.stringify([fn, args])}" if @debug
    [part1, part2] = fn.split('.')
    fn = this[part1][part2]
    data = fn.call this, args
    console.log "QSCMobile-Plugins-API-Request-Callback-Data ->   #{JSON.stringify([data.data, data.error])}" if @debug
    @window[callback]?(data)

  #######################
  #
  # 函数具体实现
  # 
  #######################

  view:

    card: (args) ->
      {pluginID, title, content} = args
      $("#cards .#{pluginID} .title").html title
      $("#cards .#{pluginID} .content").html content

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
