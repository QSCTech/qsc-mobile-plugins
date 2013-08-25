$ ->
  $(window).on 'hashchange', -> window.location.reload()
  pluginID = window.location.hash.replace(new RegExp('#', 'g'), '')
  if pluginID.length < 1
    window.location.hash = 'qiuShiGou'
  else
    sdk = new SDK(pluginID)

