// Web实现
// Version 0.0.1
// Time-stamp: <2013-08-15 23:18:14 Zeno Zeng>
// 各平台只要实现与此文件保持一致即可

QSCMobile.implement.Web = {

    user: {
        /**
         * 返回当前用户的学号
         * 注意学号已经有10位，为防止溢出应为string型
         * @returns {String}
         */
        stuid: function() {
        },

        /**
         * 返回当前用户的密码
         * @returns {String}
         */
        pwd: function() {
        },

        /**
         * 返回当前用户的昵称
         * @returns {String}
         */
        id: function() {
        },

        /**
         * 返回当前用户的真实姓名
         * @returns {String}
         */
        name: function() {
        }
    },

    view: {
        /**
         * 重绘区域
         * @example 重绘 `hello world` 的section
         * QSCMobile.view.redraw('helloWorld', 'section');
         * @param {String} 插件id
         * @param {String} 重绘区域 section 或者 card
         */
        redraw: function(pluginId, area) {
        },

        /**
         * 弹出通知，（用于错误信息显示等）
         * @param {String} 通知信息
         */
        alert: function(msg) {
            return alert(msg);
        },

        /**
         * 弹出确认
         * @param {String} 通知信息
         * @return {Boolean} 返回 True or False
         */
        confirm: function(msg) {
            return confirm(msg);
        }
    },

    device: {
        /**
         * 手机震动
         * @param {Interger} 震动持续的微秒数，
         */
        vibrate: function(milliseconds) {
            if(window.navigator.vibrate)
              return window.navigator.vibrate(milliseconds);
        },

        /**
         * 当前是否连网
         * @return {Boolean}
         */
        online: function() {
            return window.navigator.onLine;
        },

        /**
         * 当前所处的位置
         * @example 获取当前位置
         * QSCMobile.device.position(function(coords) {
         *   var lat = coords.latitude;  // 纬度
	 *   var lng = coords.longitude; // 经度
         * }, function() {})
         * @param {Function} success 获取成功时执行，被传入position参数
         * @param {Function} error 获取失败时执行
         */
        position: function(success, error) {
            if (navigator.geolocation)
              return navigator.geolocation.getCurrentPosition(function(position) {
                  success(position.coords);
              }, error);
        }
    },

    /**
     * 提供类似localStorage的api
     * 后端由各平台自由实现，可以直接存成json、xml或是db文件
     */
    storage: {
        /**
         * 获取条目
         *
         * @param {String} key 记录存储的 key
         * @returns {String} key对应的value
         * @returns {Null} 如果没有相应记录
         */
        getItem: function(key) {
            return localStorage.getItem(key);
        },

        /**
         * 写入条目
         *
         * @param {String} key 记录的 key
         * @param {String} value 记录的 value
         */
        setItem: function(key, value) {
            return localStorage.setItem(key, value);
        },

        /**
         * 移除条目
         *
         * @param {String} key 记录的 key
         */
        removeItem: function(key) {
            return localStorage.removeItem(key);
        }
    },

    /**
     * Fetch the data of `url`, and callback(data)
     *
     * @param {String} url Target Url
     * @param {Function} callback function to callback
     */
    get: function(url, callback) {
        $.get(url, callback);
    },

    /**
     * Config
     */
    config: {
        /**
         * Get config of `key`
         *
         * @param {String} key key of config
         */
        get: function(key) {
        },

        /**
         * Set config of `key` to `value`
         *
         * @param {String} key key of config
         * @param {String} value value of config
         */
        set: function(key, value) {
        }
    }
};