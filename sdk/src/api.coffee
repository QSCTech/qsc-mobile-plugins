class API

  ###
  View 函数具体实现
  ###

  view:

    card: (args) ->
      {pluginID, title, content} = args
      $("#card .title").html title
      $("#card .content").html content

  ###
  User 函数具体实现
  ###

  user:

    stuid: -> {data: "3000000000"}

    pwd: -> {data: "123456"}

  ###
  KVDB 函数具体实现
  ###

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

  
