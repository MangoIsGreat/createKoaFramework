const { HttpException } = require("../core/http-exception")

const catchError = async(ctx, next) => {
    try {
        await next()
    } catch (error) {
        // 开发环境&不是HttpException：抛出异常
        const isDev = global.config.environment == 'dev'
        const isHttpException = error instanceof HttpException

        if (isDev && !isHttpException) {
            throw error
        }

        // 生产环境：返回异常信息
        if (isHttpException) {
            // 处理已知异常情况：
            ctx.body = {
                msg: error.msg,
                errorCode: error.errorCode,
                requestUrl: `${ctx.method} ${ctx.path}`
            }

            ctx.status = error.code
        } else {
            // 处理未知异常情况：
            ctx.body = {
                msg: "we made a mistake",
                errorCode: 999,
                requestUrl: `${ctx.method} ${ctx.path}`
            }

            ctx.status = 500
        }
    }
}

module.exports = catchError