class Data

  constructor: -> @api = '//localhost/qiushigou/process.php'

  ###
  获取物品信息

  @param {Object} args 参数
  @param {Function} callback function to callback when success
  @param {Function} callback function to callback when fail
  ###
  get: (args, success, error) ->
    args.method = 'query'
    $.ajax {url: @api, data: args, success: success, error: error}

  ###
  上传新的物品信息
  
  @param {Object} data 物品信息
  @param {Function} callback function to callback when success
  @param {Function} callback function to callback when fail
  ###
  upload: (data, success, error) ->
    data.uuid = Math.uuid()
    data.method = 'upload'
    $.ajax {url: @api, data: data, success: success, error: error}
  
  ###
  修改物品信息

  @param {Object} args 参数
  @param {Function} callback function to callback when success
  @param {Function} callback function to callback when fail
  ###
  modify: (data, sucess, error) ->
    data.method = 'modify'
    $.ajax {url: @api, data: data, success: success, error: error}