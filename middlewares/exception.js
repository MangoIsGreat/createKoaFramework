const catchError = async(ctx, next) => {
    try {
        await next()
    } catch (error) {
        if (error.errorCode) {
            ctx.body = {
                msg: error.message,
                errorCode: error.errorCode,
                requestUrl: error.requestUrl
            }

            ctx.status = error.status
        }
    }
}

module.exports = catchError