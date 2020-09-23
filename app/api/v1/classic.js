const Router = require("koa-router")
const router = new Router()

router.post("/v1/:id/classic/latest", (ctx, next) => {
    const path = ctx.params
    const query = ctx.request.query
    const headers = ctx.request.header
    const body = ctx.request.body

    const a = 1
    a = 2

    ctx.body = {
        key: a
    }

    // throw new Error('API Exception')
})

module.exports = router