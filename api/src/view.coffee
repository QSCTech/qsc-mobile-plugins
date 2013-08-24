###
QSC Mobile View API

@example
  M.view.card('qiuShiGou', 'title', 'Here is some contents');

@mixin
###

class View extends Platform

  ###
  按照参数绘制 card
  
  @param {String} pluginID pluginID
  @param {String} title card title
  @param {String} content card content
  ###
  card: (pluginID, title, content) =>
    args = {pluginID: pluginID, title: title, content: content}
    @sendRequest {fn: 'view.card', args: args}
