class QSCMobile
  constructor: (@pluginID) ->
    for api in ['KVDB', 'Config', 'View', 'User']
      @[api.toLowerCase()] = new window[api] @pluginID
