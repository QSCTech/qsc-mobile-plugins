class SDK extends API

  ###
  @param {String} pluginID pluginID
  @param {Boolean} debug debug
  ###
  constructor: (@pluginID, @debug = on) ->
    console.log "Starting QSC Mobile Plugin SDK"
    @background()
    @section()

  ###
  重载 iframe 沙盒 #iframeID 中的API

  @param {String} iframeID iframID
  ###
  overloadAPI: (iframeID) ->
    win = document.getElementById(iframeID).contentWindow

    # Add Watch Api (based on Eli Grey's object.watch polyfill)
    obj = win.Object
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
    
    # overload Platform API
    win.watch 'Platform', (prop, oldval, val) =>
      val.prototype.sendRequest = (request) =>
        {fn, args, success, error} = request
        errorFn = error
        random = (Math.random()+'').replace(new RegExp('0\.', ''), '')
        callbackName = "QSCMobile#{random}_#{(new Date().getTime())}"
        win[callbackName] = (data) ->
          {data, error} = data
          if error
            errorFn?(error)
          else
            success?(data)
        @onRequest win, {fn: fn, args: args, callback: callbackName}
      return val

  ###
  在 iframe 沙盒 #background 中执行插件的 Background.js
  ###
  background: ->
    src = "background.html#"+@pluginID
    iframe = $('<iframe id="background" height="450" width="300" src="'+src+'"></iframe>')[0]
    $('body').append(iframe);
    @overloadAPI 'background'

  ###
  显示 Card
  ###
  card: ->
    

  ###
  在 iframe 沙盒 #section 中运行插件的Section视图
  ###
  section: ->
    src = "../plugins/#{@pluginID}/index.html"
    iframe = $('<iframe id="section" height="450" width="300" src="'+src+'"></iframe>')[0]
    iframe.onload = ->
      # hide scrollbar
      style = $('<link href="../../sdk/css/scrollbar.css" rel="stylesheet" type="text/css">')[0]
      style.onload = ->
        width = $('#section').contents().find('html').width()
        scrollbarWidth = 300 - width
        $('#wrap').css({width: width, 'padding-left': scrollbarWidth})
        $('#wrap').animate({opacity: 1})
      $('#section').contents().find('head').append(style)
    $('#wrap').html iframe
    @overloadAPI 'section'

  ###
  Request 处理

  @param {Object} request 请求
  ###
  onRequest: (win, request) ->
    {fn, args, callback} = request
    console.log "\n\nQSCMobile-Plugins-API-Request-ID: #{callback}"
    json = JSON.stringify {fn: fn, args: args}, null, 4
    console.log "\nRequest: #{json}" if @debug
    [part1, part2] = fn.split('.')
    fn = this[part1][part2]
    data = fn.call this, args
    json = JSON.stringify {data: data.data, error: data.error}, null, 4
    console.log "\nResults: #{json}" if @debug
    win[callback]?(data)

