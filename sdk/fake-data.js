QSCMobile.implement.Web.user = {
        /**
         * 返回当前用户的学号
         * 注意学号已经有10位，为防止溢出应为string型
         * @returns {String}
         */
        stuid: function() {
            return "3000000000";
        },

        /**
         * 返回当前用户的密码
         * @returns {String}
         */
        pwd: function() {
            return "123456";
        },

        /**
         * 返回当前用户的昵称
         * @returns {String}
         */
        id: function() {
            return "userid";
        },

        /**
         * 返回当前用户的真实姓名
         * @returns {String}
         */
        name: function() {
            return "真名字";
        }
}