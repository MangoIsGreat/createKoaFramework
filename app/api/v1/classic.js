const Router = require("koa-router")
const router = new Router()

router.post("/v1/:id/classic/latest", (ctx, next) => {
    const path = ctx.params
    const query = ctx.request.query
    const headers = ctx.request.header
    const body = ctx.request.body

    if (true) {
        const error = new Error("为什么退役")
        error.errorCode = 10001
        error.status = 400
        error.requestUrl = `${ctx.method} ${ctx.path}`

        throw error
    }

    ctx.body = {
        key: a
    }
})

module.exports = router