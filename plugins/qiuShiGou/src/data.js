(function() {
  var Data;

  Data = (function() {
    function Data() {
      this.api = '//localhost/qiushigou/process.php';
    }

    /*
    获取物品信息
    
    @param {Object} args 参数
    @param {Function} callback function to callback when success
    @param {Function} callback function to callback when fail
    */


    Data.prototype.get = function(args, success, error) {
      args.method = 'query';
      return $.ajax({
        url: this.api,
        data: args,
        success: success,
        error: error
      });
    };

    /*
    上传新的物品信息
    
    @param {Object} data 物品信息
    @param {Function} callback function to callback when success
    @param {Function} callback function to callback when fail
    */


    Data.prototype.upload = function(data, success, error) {
      data.uuid = Math.uuid();
      data.method = 'upload';
      return $.ajax({
        url: this.api,
        data: data,
        success: success,
        error: error
      });
    };

    /*
    修改物品信息
    
    @param {Object} args 参数
    @param {Function} callback function to callback when success
    @param {Function} callback function to callback when fail
    */


    Data.prototype.modify = function(data, sucess, error) {
      data.method = 'modify';
      return $.ajax({
        url: this.api,
        data: data,
        success: success,
        error: error
      });
    };

    return Data;

  })();

}).call(this);
