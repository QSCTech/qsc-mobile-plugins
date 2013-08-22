var M, QSCMobile;

QSCMobile = (function() {

    /**
     * 当前的平台 {String} iOS || Android || Web
     */
    var platform = (function(ua) {
        if (/Android/.test(ua)) return 'Android';
        if (/(iPhone|iPod|iPad)/.test(ua)) return 'iOS';
        return 'Web';
    })(window.navigator.userAgent);

    var implement = {
        /**
         * 自动按照平台调用函数，匿名函数将会自动被赋上名字（为了保证java层和obj-c层的调用）
         *
         * @example 调用storage.getItem(key)
         * QSCMobile.implement.call('storage.getItem', [key]);
         *
         * @example 调用storage.setItem(key, value)
         * QSCMobile.implement.call('storage.setItem', [key, value]);
         *
         * @param {String} functionName 函数名
         * @param {Array} args 参数数组
         * @returns 调用函数的返回值
         */
        call: function(functionName, args) {


            if(platform != 'Web') { // 处理ios和android下的匿名函数，保证可以透过url方式调用

                /**
                 * 给匿名函数一个名字，并返回名字
                 *
                 * @param {Function} fn 匿名函数
                 * @returns {String} 生成的函数名
                 */
                var addNameForAnonymousFunction =  function(fn) {
                    var def = fn.toString(),
                        fnName = 'QSCMobileCallback'+(new Date()).getTime()+Math.random();
                    fnName = fnName.replace(/\./g, '');

                    // 函数类型： var adder = new Function("a", "b", "return a + b");
                    if(/^function anonymous/.test(def)) {
                        def = def.replace(/^function anonymous/, "function "+fnName);
                        window.eval(def);
                        return fnName;
                    }
                    // 函数类型： var hello = function() {console.log('hello')}
                    else if(/^function \(/.test(def)) {
                        def = def.replace(/^function \(/, 'function '+fnName+'(');
                        window.eval(def);
                        return fnName;
                    }
                }

                // 给所有匿名函数加上名字
                if(typeof args != "undefined") { // 保证传入了args这个参数
                    for (var i = 0; i < args.length; i++) {
                        if (typeof args[i] == "function") {
                            args[i] = window[addNameForAnonymousFunction(args[i])];
                        }
                    }
                }

            }

            // 调用函数
            var fnPath = functionName.split('.');
            if (platform == 'Web') {
                (function(implement) {
                    if(fnPath.length == 1) {
                        // 对 implement.example() 这种
                        implement[fnPath[0]].apply(this, args);
                    }
                    else if(fnPath.length == 2) {
                        // 对 implement.user.stuid() 这种
                        implement[fnPath[0]][fnPath[1]].apply(this, args);
                    }
                })(window.QSCMobile.implement[platform]);
            } else {
                // android & ios
                // 统一为：QSCMobileView.alert() 这种形式
                if (fnPath.length == 1) {
                    // 对QSCMobile.get() 这种，变为QSCMobileFunctions.get();
                    window['QSCMobileFunctions'][fnPath[0]].apply(this, args);
                }
                else if (fnPath.length == 2) {
                    // 对QSCMobile.view.alert() 这种，变为QSCMobileView.alert();
                    fnPath[0] = fnPath[0].substring(0,1).toUpperCase()+fnPath[0].substring(1); // 首字母大写
                    window['QSCMobile'+fnPath[0]][fnPath[1]].apply(this, args);
                }
            }
        }
    }

    /**
     * 提供类似localStorage的api
     * 后端由各平台自由实现，可以直接存成json、xml或是db文件
     */
    var storage = {
        /**
         * 获取条目
         *
         * @param {String} key 记录存储的 key
         * @returns {String} key对应的value
         * @returns {Null} 如果没有相应记录
         */
        getItem: function(key) {
            return implement.call('storage.getItem', [key]);
        },

        /**
         * 写入条目
         *
         * @param {String} key 记录的 key
         * @param {String} value 记录的 value
         */
        setItem: function(key, value) {
            return implement.call('storage.setItem', [key, value]);
        },

        /**
         * 获取所有的 Key
         *
         * @returns {Array} 所有的 key
         */
        getKeys: function() {
            return implement.call('storage.getKeys');
        },

        /**
         * 清除当前插件的storage
         */
        clear: function() {
            return implement.call('storage.clear');
        }
    };

    /**
     * Fetch the data of `url`, and callback(data)
     *
     * @param {String} url Target Url
     * @param {Object} data Args
     * @param {Function} callback function to callback
     * @param {Function} callback function to callback
     */
    var get = function(url, data, success, fail) {
        success('');
    };

    /**
     * Config
     */
    var config = {
        /**
         * Get config of `key`
         *
         * @param {String} key key of config
         */
        get: function(key) {
            return implement.call('config.get', [key]);
        },

        /**
         * Set config of `key` to `value`
         *
         * @param {String} key key of config
         * @param {String} value value of config
         */
        set: function(key, value) {
            return implement.call('config.set', [key, value]);
        }
    };

    return {
        platform: platform,
        storage: storage,
        implement: implement,
        get: get,
        config: config
    };
})();

M = QSCMobile;
