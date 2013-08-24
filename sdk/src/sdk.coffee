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
  
  onPluginLoad: (e) ->
    console.log e

    doc = $('object').contents()
    $(doc).ready ->
      console.log $('object').contents()
      body = $('object').contents().find('body')
      console.log body
      body.css({overflow: 'hidden', height: '100%'})
      html.perfectScrollbar()

  loadPlugin: (pluginID) ->
    src = "../plugins/#{pluginID}/index.html"
    object = $('<object></object>')[0].cloneNode(true);
    object.height = 450
    object.width = 300
    object.data = src
    object.onload = (e) => @onPluginLoad(e)
    $('#wrap').html object

  onMessage: (url) ->
    prefix = 'data:text/qscmobile-msg;base64,'
    if url.indexOf(prefix) > -1
      url = url.replace('data:text\/qscmobile-msg;base64', '')
      @onMessage url
    {id, fn, args} = JSON.parse(msg)
    [part1, part2] = fn.split('.')
    fn = this[part1][part2]
    fn.call this, {id: id, args: args}

  sendMessage: (msg) ->

  user:

    stuid: -> "3000000000"

    pwd: -> "123456"

  kvdb:

    get: (args) ->
      {id, args} = args
      {key} = args
      msg = {id: id}
      try
        msg.data = localStorage.getItem key
      catch e
        msg.error = e
      @sendMessage msg

    set: (args) ->
      {id, args} = args
      {key, value} = args
      msg = {id: id}
      try
        msg.data = localStorage.setItem key, value
      catch e
        msg.error = e
      @sendMessage msg

    remove: (args) ->
      {id, args} = args
      {key} = args
      msg = {id: id}
      try
        msg.data = localStorage.removeItem key
      catch e
        msg.error = e
      @sendMessage msg

    clear: (args) ->
      {id} = args
      msg = {id: id}
      try
        msg.data = localStorage.clear()
      catch e
        msg.error = e
      @sendMessage msg

$ ->
  $(document).ready ->
    window.sdk = new SDK
    console.log sdk
