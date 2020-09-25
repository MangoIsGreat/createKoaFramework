const Router = require("koa-router")
const router = new Router({
    prefix: "/v1/classic"
})

const { PositiveIntegerValidator } = require("../../validators/validator")
const { Auth } = require("./../../../middlewares/auth")

router.get("/latest", new Auth().m, (ctx, next) => {
    // const path = ctx.params
    // const query = ctx.request.query
    // const headers = ctx.request.header
    // const body = ctx.request.body

    // const v = new PositiveIntegerValidator().validate(ctx)
})

module.exports = router