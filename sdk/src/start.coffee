$ ->
  $(window).on 'hashchange', -> window.location.reload()
  [nil, pluginID, debug] = window.location.hash.split('#')
  if pluginID.length < 1
    window.location.hash = 'qiuShiGou'
  else
    debug = debug is 'debug'
    window.sdk = new SDK(pluginID, debug)
