###
QSCMobile KVDB API

@example
  M.kvdb.set('key', 'value', onsuccess, onerror);
###


class KVDB extends QSCMobile
  
  ###
  写入记录

  @param {String} key key
  @param {*} value value
  @param {Function} success The callback that handles data when success
  @param {Function} error The callback that handles error
  ###
  set: (key, value, success, error) ->
    msg =
      fn: 'KVDB.set'
      args:
        key: key
        value: value
      success: success
      error: error
    @sendMessage msg

  ###
  取出记录

  @param {String} key key
  @param {Function} success The callback that handles data when success
  @param {Function} error The callback that handles error
  ###
  get: (key, success, error) ->
    msg =
      fn: 'KVDB.get'
      args:
        key: key
      success: success
      error: error
    @sendMessage msg
  
  ###
  删除记录

  @param {String} key - key
  @param {Function} success The callback that handles data when success
  @param {Function} error The callback that handles error
  ###
  remove: (key, success, error) ->
    msg =
      fn: 'KVDB.remove'
      args:
        key: key
      success: success
      error: error
    @sendMessage msg

  ###
  清空记录

  @param {Function} success The callback that handles data when success
  @param {Function} error The callback that handles error
  ###
  clear: (success, error) ->
    msg =
      fn: 'KVDB.clear'
      success: success
      error: error
    @sendMessage msg

