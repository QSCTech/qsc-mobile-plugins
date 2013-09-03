class QSCMobile

  ###
  @param {String} pluginID pluginID
  
  @example
    var M = new QSCMobile('qiuShiGou');
  ###
  constructor: (@pluginID) ->
    for api in ['KVDB', 'View', 'User']
      @[api.toLowerCase()] = new window[api] @pluginID
