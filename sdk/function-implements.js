// 此文件是functions.js 的javascript 层具体实现

var QSCMobile = (function() {

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

    var user = {
        /**
         * 返回当前用户的学号
         * 注意学号已经有10位，为防止溢出应为string型
         * @returns {String}
         */
        stuid: function() {
            return implement.call('user.stuid');
        },

        /**
         * 返回当前用户的密码
         * @returns {String}
         */
        pwd: function() {
            return implement.call('user.pwd');
        },

        /**
         * 返回当前用户的昵称
         * @returns {String}
         */
        id: function() {
            return implement.call('user.id');
        },

        /**
         * 返回当前用户的真实姓名
         * @returns {String}
         */
        name: function() {
            return implement.call('user.name');
        }
    };

    var load = {
        /**
         * 向当前dom注入JS文件 <Webview Only>
         * @param {String} src
         */
        js: function(src, callback) {
            (function(d) {
                var script = d.createElement('script');
                script.src = src;
                script.onload = callback;
                d.head.appendChild(script);
            })(document);
        },

        /**
         * 向当前dom注入CSS文件 <Webview Only>
         * @param {String} src
         */
        css: function(src, callback) {
            (function(d) {
                var node = d.createElement('link');
                node.rel = 'stylesheet';
                node.type = 'text/css';
                node.href = src;
                node.onload = callback;
                d.head.appendChild(node);
            })(document);
        }
    };

    var view = {

        section: function(pluginId) {
            // 加载 section
            // 纯webview实现，平台层不用管
        },

        card: function(pluginId) {
            QSCMobile.msg.send({ pluginId: {
                card: "html"
            }});
        }
    };

    var device = {
        /**
         * 手机震动
         * @param {Interger} 震动持续的微秒数，
         */
        vibrate: function(milliseconds) {
            return implement.call('device.vibrate', [milliseconds]);
        },

        /**
         * 当前是否连网
         * @return {Boolean}
         */
        online: function() {
            return implement.call('device.online');
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
            return implement.call('device.position', [success, error]);
        }
    };

    /**
     * 提供类似localStorage的api
     * 后端由各平台自由实现，可以直接存成json、xml或是db文件
     */
    var storage = {
        /**
         * 获取条目
         *
         * @param {String} 记录存储的 key
         * @returns {String} key对应的value
         * @returns {Null} 如果没有相应记录
         */
        getItem: function(key) {
            return implement.call('storage.getItem', [key]);
        },

        /**
         * 写入条目
         *
         * @param {String} 记录的 key
         * @param {String} 记录的 value
         */
        setItem: function(key, value) {
            return implement.call('storage.setItem', [key, value]);
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
        $.ajax({
            
        });
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

    /**
     * Plugin
     */
    var plugin = {
        /**
         * Load plugin
         *
         * @param {String} pluginId pluginId
         * @param {Function} callback 插件文件被加载完后的callback（这时候初始化未必完成）
         */
        load: function(pluginId, callback) {
            if(QSCMobile.plugin[pluginId]) {
                if(callback)
                  callback();
                return; // already loaded
            } else {
                var src = 'plugins/'+pluginId+'/main.js';
                load.js(src, function() {
                    QSCMobile.plugin[pluginId].ready = function(callback) {
                        if(QSCMobile.plugin[pluginId].isReady) {
                            callback();
                        }
                        else {
                            if (!QSCMobile.plugin[pluginId].readyCallbacks)
                              QSCMobile.plugin[pluginId].readyCallbacks = [];
                            QSCMobile.plugin[pluginId].readyCallbacks.push(callback);
                        }
                    }
                    QSCMobile.plugin[pluginId].construtor(function() {
                        QSCMobile.plugin[pluginId].isReady = true;
                        var callbacks = QSCMobile.plugin[pluginId].readyCallbacks;
                        for(var i = 0; i < callbacks.length; i++) {
                            callbacks[i]();
                        }
                    });
                    if(callback)
                      callback();
                });
            }
        }
    };

    return {
        user: user,
        load: load,
        view: view,
        platform: platform,
        implement: implement,
        device: device,
        get: get,
        plugin: plugin
    };
})();
