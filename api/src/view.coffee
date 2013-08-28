###
QSC Mobile View API
###

class View extends Platform

  ###
  Constructor

  @param {String} pluginID pluginID
  ###
  constructor: (@pluginID) ->

  ###
  按照参数绘制 card

  @example
    M = new QSCMobile('qiuShiGou');
    M.view.card({title: '求失狗', content: '求失狗卡片正文内容\n这是内容第二行'});
  
  @param {Object} data
  @param {String} data.title card title
  @param {String} data.content card content
  ###
  card: (data) => @sendRequest {fn: 'view.card', args: data}
