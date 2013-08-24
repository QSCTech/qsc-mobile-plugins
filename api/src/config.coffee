###
QSCMobile Config API
###

class Config extends KVDB

  set: (key, value, success, error) =>
    key = "__config:#{key}"
    this.__super__.set key, value, success, error

  get: (key, success, error) =>
    key = "__config:#{key}"
    this.__super__.get key, success, error

  remove: (key, success, error) =>
    key = "__config:#{key}"
    this.__super__.remove key, success, error


