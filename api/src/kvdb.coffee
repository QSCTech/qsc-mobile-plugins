class KVDB extends Platform

  ###
  写入记录

  @param {String} key key
  @param {String | Object} value value
  @param {Function} success The callback that handles data when success
  @param {Function} error The callback that handles error
  ###
  set: (key, value, success, error) =>
    unless typeof value is 'string'
      value = JSON.stringify value
    msg =
      fn: 'kvdb.set'
      args:
        key: key
        value: value
      success: success
      error: error
    @sendRequest msg

  ###
  取出记录

  @note 若存入是 Object 或 JSON String 则取出时自动解析为 Object

  @param {String} key key
  @param {Function} success The callback that handles data when success
  @param {Function} error The callback that handles error
  ###
  get: (key, success, error) =>
    callback = (data) ->
      try
        data = JSON.parse data
        success?(data)
      catch e
        success?(data)
    msg =
      fn: 'kvdb.get'
      args:
        key: key
      success: callback
      error: error
    @sendRequest msg
  
  ###
  删除记录

  @param {String} key - key
  @param {Function} success The callback that handles data when success
  @param {Function} error The callback that handles error
  ###
  remove: (key, success, error) =>
    msg =
      fn: 'kvdb.remove'
      args:
        key: key
      success: success
      error: error
    @sendRequest msg

  ###
  清空记录

  @param {Function} success The callback that handles data when success
  @param {Function} error The callback that handles error
  ###
  clear: (success, error) =>
    msg =
      fn: 'kvdb.clear'
      success: success
      error: error
    @sendRequest msg

