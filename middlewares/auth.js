const basicAuth = require("basic-auth")
const jwt = require("jsonwebtoken")

class Auth {
    constructor(level) {
        this.level = level || 1
        Auth.AUSE = 8
        Auth.ADMIN = 16
        Auth.SUPER_ADMIN = 24
    }

    get m() {
        return async(ctx, next) => {
            const tokenToken = basicAuth(ctx.req)

            let errMsg = "token不合法"
            let decode

            if (!tokenToken && !tokenToken.name) {
                throw new global.errs.Forbidden(errMsg)
            }

            try {
                decode = jwt.verify(tokenToken.name, global.config.security.sectetKey)
            } catch (error) {
                if (error.name == 'TokenExpiredError') {
                    errMsg = 'token已过期'
                }

                throw new global.errs.Forbidden(errMsg)
            }

            if (decode.scope <= this.level) {
                errMsg = '权限不足'
                throw new global.errs.Forbidden(errMsg)
            }

            ctx.auth = {
                uid: decode.uid,
                scope: decode.scope
            }

            await next()
        }
    }

    static verifyToken(token) {
        try {
            jwt.verify(token, global.config.security.sectetKey)
            return true
        } catch (error) {
            return false
        }
    }
}

module.exports = {
    Auth
}