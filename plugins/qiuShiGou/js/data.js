var Data, M;

M = new QSCMobile('qiuShiGou');

// setTimeout(function() {
//     for (var i = 0; i < 100; i++) {
//         M.kvdb.set(i, 'helloworld', function() {
//             console.log("success"+new Date().getTime());
//         });
//     }
// }, 1000);

Data = (function() {

    var _this;

    function Data() {
        _this = this;
        this.api = '//m.myqsc.com/qiu-shi-gou/process.php';
    }

    /**
     * 获取物品信息
     *
     * @param {Object} args 参数
     * @param {Function} callback function to callback when success
     * @param {Function} callback function to callback when fail
     */
    Data.prototype.get = function(args, success, error) {
        if(!args.method)
          args.method = 'query';
        $.ajax({url: this.api, data: args, success: success, error: error});
    };

    /**
     * 上传新的物品信息
     *
     * @param {Object} data 物品信息
     * @param {Function} callback function to callback when success
     * @param {Function} callback function to callback when fail
     */
    Data.prototype.upload = function(data, success, fail) {
        data.uuid = Math.uuid();
        data.method = "upload";
        this.get(data, success, fail);
    };

    return Data;
})();
