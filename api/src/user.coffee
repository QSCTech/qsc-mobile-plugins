class User extends Platform

  ###
  学号

  @param {Function} success The callback that handles data when success
  @param {Function} error The callback that handles error
  ###
  stuid: (success, error) ->
    @sendRequest {fn: 'user.stuid', success: success, error: error}

  ###
  密码

  @private
  
  @param {Function} success The callback that handles data when success
  @param {Function} error The callback that handles error
  ###
  pwd: (success, error) ->
    @sendRequest {fn: 'user.pwd', success: success, error: error}
  
