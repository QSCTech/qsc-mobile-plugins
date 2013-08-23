class SDK

  construtor: ->
    window.onhashchange = (event) =>
      @onMessage event.newURL

  onMessage: (msg) ->
    {id, fn, args} = JSON.parse(msg)
    [part1, part2] = fn.split('.')
    fn = this[part1][part2]
    fn.call this, {id: id, args: args}

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
      M.onMessage msg

    set: (args) ->
      {id, args} = args
      {key, value} = args
      msg = {id: id}
      try
        msg.data = localStorage.setItem key, value
      catch e
        msg.error = e
      M.onMessage msg

    remove: (args) ->
      {id, args} = args
      {key} = args
      msg = {id: id}
      try
        msg.data = localStorage.removeItem key
      catch e
        msg.error = e
      M.onMessage msg

    clear: (args) ->
      {id} = args
      msg = {id: id}
      try
        msg.data = localStorage.clear()
      catch e
        msg.error = e
      M.onMessage msg

sdk = new SDK
