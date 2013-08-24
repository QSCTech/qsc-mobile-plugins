###
QSCMobile Config API
###

class Config extends KVDB

  ###
  Constructor

  @param {String} pluginID pluginID
  ###
  constructor: (@pluginID) ->

  ###
  写入设置

  @param {String} key key
  @param {String | Object} value value
  @param {Function} success The callback that handles data when success
  @param {Function} error The callback that handles error
  ###
  set: (key, value, success, error) =>
    key = "__config:#{key}"
    this.__super__.set key, value, success, error

  ###
  取出设置

  @note 若存入是 Object 或 JSON String 则取出时自动解析为 Object

  @param {String} key key
  @param {Function} success The callback that handles data when success
  @param {Function} error The callback that handles error
  ###
  get: (key, success, error) =>
    key = "__config:#{key}"
    this.__super__.get key, success, error

  ###
  删除设置

  @param {String} key - key
  @param {Function} success The callback that handles data when success
  @param {Function} error The callback that handles error
  ###
  remove: (key, success, error) =>
    key = "__config:#{key}"
    this.__super__.remove key, success, error


