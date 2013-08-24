var Data, M;

M = new QSCMobile('qiuShiGou');

Data = (function() {

    var _this;

    function Data() {
        _this = this;
        this.api = '//m.myqsc.com/qiuShiGou/';
        // 快速测试
        for(var i = 0; i < 100; i++) {
            M.kvdb.get(i);
        }
    }

    /**
     * 获取物品信息
     *
     * @param {Object} args 参数
     * @param {Function} callback function to callback when success
     * @param {Function} callback function to callback when fail
     */
    Data.prototype.get = function(args, success, error) {
        $.ajax({url: this.api, data: args, success: success, error: error});
    };

    /**
     * 获取关注的物品的 ID
     *
     * @return {Array} 关注的物品的 ID
     */
    Data.prototype.starred = function(callback) {
        var starred = M.kvdb.get('qiuShiGouStarred', function(data) {
            if(!starred) {
                starred = [];
            }
            if(callback)
              callback(starred);
        });
    };

    /**
     * 上传新的物品信息
     *
     * @param {Object} data 物品信息
     * @param {Function} callback function to callback when success
     * @param {Function} callback function to callback when fail
     */
    Data.prototype.upload = function(data, success, fail) {
        data.method = 'upload';
        data.uuid = Math.uuid();
        var successFn = function() {
            var uuid = data.uuid;
            _this.starred(function(starred) {
                starred.push(uuid);
                M.kvdb.set('qiuShiGouStarred', starred);
            });
        };
        this.get(data, successFn, fail);
    };

    return Data;
})();
