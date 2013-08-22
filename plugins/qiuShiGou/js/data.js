var Data;

Data = (function() {

    var _this;

    function Data() {
        _this = this;
        this.api = '//m.myqsc.com/qiuShiGou/';
    }

    /**
     * 获取物品信息
     *
     * @param {Object} args 参数
     * @param {Function} callback function to callback when success
     * @param {Function} callback function to callback when fail
     */
    Data.prototype.get = function(args, success, fail) {
        M.get(this.api, args, success, fail);
    };

    /**
     * 获取关注的物品的 ID
     *
     * @return {Array} 关注的物品的 ID
     */
    Data.prototype.starred = function() {
        var starred = M.storage.getItem('qiuShiGouStarred');
        if(!starred) {
            starred = [];
        }
        return starred;
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
            var uuid = data.uuid,
                starred = _this.starred().push(uuid);
            M.storage.setItem('qiuShiGouStarred', starred);
        };
        this.get(data, successFn, fail);
    };

    return Data;
})();
