###
QSCMobile View API
###

class View extends QSCMobile

  ###
  按照 data 绘制 card
  
  @param {String} pluginID pluginID
  @param {String} title card title
  @param {String} content card content
  ###
  drawCard: (pluginID, title, content) ->
    args = {pluginID: pluginID, title: title, content: content}
    @sendMessage {fn: 'draw.card', args: args}
    
  
