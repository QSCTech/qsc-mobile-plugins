var tryOverloadSendRequest = function() {
    if(typeof Platform !== 'undefined') {
        Platform.prototype.sendRequest = function(request) {
            var args, callback, callbackName, error, errorFn, fn, prefix, random, success;
            fn = request.fn, args = request.args, success = request.success, error = request.error;
            errorFn = error;
            random = (Math.random() + '').replace(new RegExp('0\.', ''), '');
            callbackName = "QSCMobile" + random + "_" + (new Date().getTime());
            callback = function(data) {
                var _ref3;
                _ref3 = data, data = _ref3.data, error = _ref3.error;
                if (error) {
                    return typeof errorFn === "function" ? errorFn(error) : void 0;
                } else {
                    return typeof success === "function" ? success(data) : void 0;
                }
            };
            window[callbackName] = callback;
            request = {
                pluginID: this.pluginID,
                fn: fn,
                args: args,
                callback: callbackName
            };
            $(document, parent.window.document).trigger('QSCMobileData');
            alert(request.fn);
        }
    } else {
        setTimeout(tryOverloadSendRequest, 1);
    }
}
tryOverloadSendRequest();