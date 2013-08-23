###
QSCMobile User API
###

class User extends QSCMobile

    ###
    学号

    @param {Function} success The callback that handles data when success
    @param {Function} error The callback that handles error
    ###
    stuid: (success, error) -> @sendMessage {fn: 'user.stuid', success: success, error: error}

    ###
    密码

    @private
    
    @param {Function} success The callback that handles data when success
    @param {Function} error The callback that handles error
    ###
    pwd: (success, error) -> @sendMessage {fn: 'user.pwd', success: success, error: error}

    ###
    用户名

    @param {Function} success The callback that handles data when success
    @param {Function} error The callback that handles error
    ###
    id: (success, error) -> @sendMessage {fn: 'user.id', success: success, error: error}

    ###
    真实名字

    @private

    @param {Function} success The callback that handles data when success
    @param {Function} error The callback that handles error
    ###
    name: (success, error) -> @sendMessage {fn: 'user.name', success: success, error: error}
  
  
  
