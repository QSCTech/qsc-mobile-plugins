class SDK extends API

  ###
  @param {String} pluginID pluginID
  @param {Boolean} debug debug
  ###
  constructor: (@pluginID, @debug = on) ->
    console.log "Starting QSC Mobile Plugin SDK"
    @show()
    @background()

  ###
  在 iframe 沙盒 #background 中执行插件的 Background.js
  ###
  background: ->
    src = "background.html#"+@pluginID
    iframe = $('<iframe id="background" height="450" width="300" src="'+src+'"></iframe>')[0]
    $('body').append(iframe);

  ###
  显示 Card，并在 iframe 沙盒 #section 中运行插件的Section视图
  ###
  show: ->
    html = "<div class=\"card #{@pluginID}\">
    </div>"
    $('#cards').append(html)

    src = "../plugins/#{@pluginID}/index.html"

    iframe = $('<iframe id="section" height="450" width="300" src="'+src+'"></iframe>')[0]
    iframe.onload = =>
      href = document.getElementById('section').contentWindow.location.href
      console.log "Plugin Loaded: #{href}"
      # hide scrollbar
      style = $('<link href="../../sdk/css/scrollbar.css" rel="stylesheet" type="text/css">')[0]
      style.onload = =>
        width = $('#section').contents().find('html').width()
        scrollbarWidth = 300 - width
        $('#section-wrap').css({width: width, 'padding-left': scrollbarWidth})
        $('#card-wrap').css({width: width})
        $('#wrap').animate({opacity: 1})
      $('#section').contents().find('head').append(style)
    $('#section-wrap').html iframe


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
