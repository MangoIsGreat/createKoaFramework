const util = require("util")
const axios = require("axios")
const { User } = require("../models/user")
const { Auth } = require("../../middlewares/auth")
const { generateToken } = require("../../core/util")

class WXManager {
    static async codeToToken(code) {
        const url = util.format(global.config.wx.loginUrl, global.config.wx.appId, global.config.wx.appSecret, code)
        const result = await axios.get(url)
        if (result.status !== 200) {
            throw new global.errs.AuthFailed('openid获取失败')
        }

        const errcode = result.data.errcode
        const errMsg = result.data.errMsg
        if (errcode) {
            throw new global.errs.AuthFailed('openid获取失败：' + errMsg)
        }

        let user = await User.getUserByOpenid(result.data.openid)

        if (!user) {
            user = await User.createUserByOpenid(result.data.openid)
        }

        return generateToken(user.id, Auth.AUSE)
    }
}

module.exports = {
    WXManager
}