const basicAuth = require("basic-auth")
const jwt = require("jsonwebtoken")

class Auth {
    constructor() {

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

            ctx.auth = {
                uid: decode.uid,
                scope: decode.scope
            }

            await next()
        }
    }
}

module.exports = {
    Auth
}