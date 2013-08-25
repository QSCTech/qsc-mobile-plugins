class User extends Platform

  ###
  Constructor

  @param {String} pluginID pluginID
  ###
  constructor: (@pluginID) ->


  ###
  学号

  @param {Function} success The callback that handles data when success
  @param {Function} error The callback that handles error

  @example
    var M = new QSCMobile('qiuShiGou');
    var success = function(stuid) {
      console.log(stuid);
    };
    var error = function(e) {
      console.log(e);
    };
    M.user.stuid(success, error);

  ###
  stuid: (success, error) ->
    @sendRequest {fn: 'user.stuid', success: success, error: error}

  ###
  密码

  @private
  
  @param {Function} success The callback that handles data when success
  @param {Function} error The callback that handles error

  @example
    var M = new QSCMobile('qiuShiGou');
    var success = function(pwd) {
      console.log(pwd);
    };
    var error = function(e) {
      console.log(e);
    };
    M.user.pwd(success, error);

  ###
  pwd: (success, error) ->
    @sendRequest {fn: 'user.pwd', success: success, error: error}
  
